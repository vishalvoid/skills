---
name: nextjs-product-stack
description: A strict 9-layer architecture for production Next.js full-stack applications. Enforces separation of concerns from database schema through to UI components. Apply when building any product that needs to scale beyond a prototype — the folder structure, naming conventions, and layer boundaries are all defined. Each layer has exactly one responsibility and only talks to the layer directly below it.
---

# Next.js Product Stack

**Technique:** Strict Layer Isolation, One-Direction Dependency Flow

Each layer in the stack has exactly one job. UI never touches the database. Server Actions never write SQL. Services never know about HTTP. Breaking this costs you a refactor later — follow it from day one.

## The 9 Layers

```
┌─────────────────────────────────────┐
│  9. UI Components  (app/**)         │ — renders, no logic
│  8. Hooks          (hooks/**)       │ — client state, mutations
│  7. Server Actions (actions/**)     │ — server entry point from client
│  6. API Routes     (app/api/**)     │ — external HTTP consumers
│  5. Middleware     (middleware.ts)  │ — auth, redirects, rate limits
│  4. Services       (services/**)   │ — business logic, rules
│  3. Repository     (repository/**) │ — all database access
│  2. Database       (db/**)         │ — Prisma client, schema
│  1. Schema         (prisma/**)     │ — source of truth for data shape
└─────────────────────────────────────┘
```

**Dependency rule:** Each layer may only import from the layer directly below it. Layer 9 → 8 → 7 → 4 → 3 → 2. API routes (6) also import from services (4). Never skip layers.

## Folder Structure

```
├── prisma/
│   └── schema.prisma          # Layer 1: single source of truth
├── db/
│   └── index.ts               # Layer 2: Prisma client singleton
├── repository/
│   ├── user.repository.ts     # Layer 3: all DB queries for users
│   └── post.repository.ts
├── services/
│   ├── user.service.ts        # Layer 4: business rules
│   └── post.service.ts
├── actions/
│   ├── user.actions.ts        # Layer 7: server actions
│   └── post.actions.ts
├── hooks/
│   ├── useUser.ts             # Layer 8: client data hooks
│   └── usePost.ts
├── middleware.ts              # Layer 5: auth guard
└── app/
    ├── api/
    │   └── users/route.ts     # Layer 6: REST API
    └── dashboard/
        └── page.tsx           # Layer 9: UI
```

## Layer 2 — Database Client

```typescript
// db/index.ts
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
```

## Layer 3 — Repository

Repository methods are pure database operations. No business logic. No auth checks. Input validation happens in services.

```typescript
// repository/user.repository.ts
import { db } from "@/db";
import type { Prisma, User } from "@prisma/client";

export const userRepository = {
  findById: (id: string): Promise<User | null> =>
    db.user.findUnique({ where: { id } }),

  findByEmail: (email: string): Promise<User | null> =>
    db.user.findUnique({ where: { email } }),

  findMany: (args?: Prisma.UserFindManyArgs): Promise<User[]> =>
    db.user.findMany(args),

  create: (data: Prisma.UserCreateInput): Promise<User> =>
    db.user.create({ data }),

  update: (id: string, data: Prisma.UserUpdateInput): Promise<User> =>
    db.user.update({ where: { id }, data }),

  delete: (id: string): Promise<User> =>
    db.user.delete({ where: { id } }),

  count: (where?: Prisma.UserWhereInput): Promise<number> =>
    db.user.count({ where }),
};
```

## Layer 4 — Service

Services own all business logic: authorization, validation, derived data, cross-entity operations. They receive plain inputs, not `Request` objects.

```typescript
// services/user.service.ts
import { userRepository } from "@/repository/user.repository";
import { hashPassword, verifyPassword } from "@/lib/crypto";
import { sendWelcomeEmail } from "@/lib/email";

export class UserNotFoundError extends Error {
  constructor(id: string) {
    super(`User not found: ${id}`);
    this.name = "UserNotFoundError";
  }
}

export class EmailTakenError extends Error {
  constructor() {
    super("Email is already registered");
    this.name = "EmailTakenError";
  }
}

export const userService = {
  async getById(id: string) {
    const user = await userRepository.findById(id);
    if (!user) throw new UserNotFoundError(id);
    return user;
  },

  async register(email: string, password: string, name: string) {
    const existing = await userRepository.findByEmail(email);
    if (existing) throw new EmailTakenError();

    const hashedPassword = await hashPassword(password);
    const user = await userRepository.create({ email, password: hashedPassword, name });

    // Side effects belong in the service layer
    await sendWelcomeEmail(user.email, user.name);

    return user;
  },

  async authenticate(email: string, password: string) {
    const user = await userRepository.findByEmail(email);
    if (!user) throw new UserNotFoundError(email);

    const valid = await verifyPassword(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    return user;
  },

  async updateProfile(id: string, patch: { name?: string; bio?: string }) {
    await userRepository.findById(id).then((u) => {
      if (!u) throw new UserNotFoundError(id);
    });
    return userRepository.update(id, patch);
  },
};
```

## Layer 7 — Server Actions

Server Actions are the client → server bridge. They validate input with Zod, call services, and return typed results. Never put business logic here.

```typescript
// actions/user.actions.ts
"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { userService, EmailTakenError } from "@/services/user.service";
import { getSession } from "@/lib/session";

const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  name: z.string().min(1).max(100),
});

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function registerUser(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const parsed = RegisterSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    const user = await userService.register(
      parsed.data.email,
      parsed.data.password,
      parsed.data.name
    );
    return { success: true, data: { id: user.id } };
  } catch (err) {
    if (err instanceof EmailTakenError) {
      return { success: false, error: err.message };
    }
    return { success: false, error: "Registration failed. Please try again." };
  }
}

export async function updateProfile(
  formData: FormData
): Promise<ActionResult<void>> {
  const session = await getSession();
  if (!session) return { success: false, error: "Not authenticated" };

  const patch = {
    name: formData.get("name") as string | undefined,
    bio: formData.get("bio") as string | undefined,
  };

  try {
    await userService.updateProfile(session.userId, patch);
    revalidatePath("/dashboard/profile");
    return { success: true, data: undefined };
  } catch {
    return { success: false, error: "Update failed" };
  }
}
```

## Layer 6 — API Routes

API routes are for external consumers (mobile apps, webhooks, third-party integrations). They share the same service layer as server actions.

```typescript
// app/api/users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { userService, UserNotFoundError } from "@/services/user.service";
import { validateApiKey } from "@/lib/auth";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const apiKey = request.headers.get("x-api-key");
  if (!validateApiKey(apiKey)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const user = await userService.getById(id);
    // Never return password hash from API
    const { password: _, ...safeUser } = user;
    return NextResponse.json(safeUser);
  } catch (err) {
    if (err instanceof UserNotFoundError) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
```

## Layer 8 — Hooks

Client-side hooks call server actions and manage local state. They never import from services or repositories.

```typescript
// hooks/useUpdateProfile.ts
"use client";

import { useTransition } from "react";
import { updateProfile } from "@/actions/user.actions";
import { useRouter } from "next/navigation";

export function useUpdateProfile() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const update = (formData: FormData) => {
    startTransition(async () => {
      const result = await updateProfile(formData);
      if (result.success) {
        router.refresh();
      } else {
        console.error(result.error);
      }
    });
  };

  return { update, isPending };
}
```

## Layer 9 — UI Components

Components render. They do not fetch, they do not validate, they do not contain business logic. Data comes from server components (RSC) or hooks.

```tsx
// app/dashboard/profile/page.tsx
import { getSession } from "@/lib/session";
import { userService } from "@/services/user.service";
import { ProfileForm } from "./ProfileForm";
import { redirect } from "next/navigation";

// Server Component — fetches directly from service, no API call needed
export default async function ProfilePage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const user = await userService.getById(session.userId);

  return (
    <div>
      <h1>Profile</h1>
      <ProfileForm user={user} />
    </div>
  );
}
```

```tsx
// app/dashboard/profile/ProfileForm.tsx
"use client";

import { useUpdateProfile } from "@/hooks/useUpdateProfile";

export function ProfileForm({ user }: { user: { name: string; bio?: string } }) {
  const { update, isPending } = useUpdateProfile();

  return (
    <form action={update}>
      <input name="name" defaultValue={user.name} />
      <textarea name="bio" defaultValue={user.bio} />
      <button type="submit" disabled={isPending}>
        {isPending ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
```

## Implementation Checklist

- [ ] Prisma client is a singleton (via `globalThis` guard)
- [ ] Repositories export plain objects with typed methods, not classes
- [ ] Services throw typed error classes (`UserNotFoundError`, not generic `Error`)
- [ ] Server Actions return `{ success: true, data } | { success: false, error }` — never throw to the client
- [ ] API routes extract auth from headers, not session cookies (for external consumers)
- [ ] UI components are RSC by default; only add `"use client"` for interactivity
- [ ] Hooks only import from `actions/**`, never from `services/**` or `repository/**`
- [ ] `revalidatePath` called in actions after mutations that affect cached pages

## Common Mistakes

1. **Calling Prisma directly in a Server Action** — bypasses the repository layer, making queries impossible to mock or replace.

2. **Throwing raw errors from Server Actions** — unhandled throws show "An error occurred" to users with no recovery path. Always catch and return `{ success: false, error }`.

3. **Fetching in Client Components** — use RSC (Server Component) as the data-fetching layer, pass data as props to Client Components.

4. **Putting auth logic in repositories** — repositories are data-access only. Auth belongs in services or middleware.

5. **One giant service file** — split by domain entity. `user.service.ts`, `post.service.ts`, `billing.service.ts` — each focused on one concept.

## When to Apply

- Any Next.js project expected to grow beyond a prototype
- Teams of 2+ where clear ownership boundaries matter
- Projects with both web UI and a public API
- Apps with complex business rules (billing, permissions, workflows)

## When NOT to Apply

- Weekend hacks or throwaway prototypes
- Simple CRUD apps with no business logic (go direct Prisma in server actions)
- Projects where the team doesn't have TypeScript discipline to maintain the layers
