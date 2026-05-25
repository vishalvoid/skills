---
name: zod-api-validation
description: Schema-first API validation using Zod — define the shape once, get TypeScript types and runtime validation for free. Apply to any Next.js API route, Server Action, or form handler that receives external input. Prevents the entire class of "undefined is not an object" runtime errors caused by trusting incoming data. The schema IS the contract; everything else is derived from it.
---

# Zod API Validation

**Technique:** Schema-First, Type-Derived

Define the schema once. TypeScript types, runtime validation, and error messages all come from it. Never write a type and a validator separately.

## The Problem

```typescript
// Without Zod — trusts caller completely
export async function POST(req: Request) {
  const body = await req.json();
  // body is `any` — no guarantees
  await db.user.create({ data: body }); // mass assignment vulnerability
}
```

```typescript
// With Zod — rejects bad input at the boundary
export async function POST(req: Request) {
  const body = CreateUserSchema.parse(await req.json()); // throws if invalid
  await db.user.create({ data: body }); // body is fully typed
}
```

## Core Pattern — Schema-First Design

```typescript
// lib/schemas/user.schema.ts
import { z } from "zod";

// 1. Define schema — the single source of truth
export const CreateUserSchema = z.object({
  email: z.string().email("Must be a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(1).max(100).trim(),
  role: z.enum(["user", "admin"]).default("user"),
});

// 2. Derive TypeScript type — no duplication
export type CreateUserInput = z.infer<typeof CreateUserSchema>;

// Partial variant for PATCH endpoints
export const UpdateUserSchema = CreateUserSchema.partial().omit({ password: true });
export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

// Response schema — validate what you send back too
export const UserResponseSchema = z.object({
  id: z.string().cuid(),
  email: z.string().email(),
  name: z.string(),
  role: z.enum(["user", "admin"]),
  createdAt: z.string().datetime(),
});
export type UserResponse = z.infer<typeof UserResponseSchema>;
```

## Validating API Routes

```typescript
// app/api/users/route.ts
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CreateUserSchema } from "@/lib/schemas/user.schema";
import { userService } from "@/services/user.service";

function validationError(error: z.ZodError) {
  return NextResponse.json(
    {
      error: "Validation failed",
      issues: error.errors.map((e) => ({
        field: e.path.join("."),
        message: e.message,
      })),
    },
    { status: 400 }
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = CreateUserSchema.safeParse(body);
  if (!parsed.success) return validationError(parsed.error);

  // parsed.data is fully typed as CreateUserInput
  const user = await userService.create(parsed.data);
  return NextResponse.json(user, { status: 201 });
}
```

## Reusing Schemas in Server Actions

The same schema validates both the API route and the Server Action — the contract is shared.

```typescript
// actions/user.actions.ts
"use server";

import { CreateUserSchema } from "@/lib/schemas/user.schema";
import { userService } from "@/services/user.service";

type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; fields?: Record<string, string> };

export async function createUser(
  formData: FormData
): Promise<ActionResult<{ id: string }>> {
  const raw = {
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
  };

  const parsed = CreateUserSchema.safeParse(raw);
  if (!parsed.success) {
    // Return per-field errors for form display
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.errors) {
      const field = issue.path[0]?.toString();
      if (field) fields[field] = issue.message;
    }
    return { success: false, error: "Validation failed", fields };
  }

  try {
    const user = await userService.create(parsed.data);
    return { success: true, data: { id: user.id } };
  } catch (err) {
    return { success: false, error: "Failed to create user" };
  }
}
```

## Type-Safe Fetch Client

```typescript
// lib/api.ts
import { z } from "zod";
import { UserResponseSchema } from "@/lib/schemas/user.schema";

async function apiFetch<T>(
  schema: z.ZodSchema<T>,
  input: RequestInfo,
  init?: RequestInit
): Promise<T> {
  const res = await fetch(input, init);
  if (!res.ok) {
    const error = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(error.error ?? `HTTP ${res.status}`);
  }
  const data = await res.json();
  return schema.parse(data); // validates response shape too
}

// Usage — response is fully typed as UserResponse
export const api = {
  users: {
    create: (input: unknown) =>
      apiFetch(UserResponseSchema, "/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      }),

    getById: (id: string) =>
      apiFetch(UserResponseSchema, `/api/users/${id}`),
  },
};
```

## Environment Variables Validation

Validate env vars at startup — fail fast before any request is served.

```typescript
// lib/env.ts
import { z } from "zod";

const EnvSchema = z.object({
  DATABASE_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),
  NEXTAUTH_URL: z.string().url(),
  STRIPE_SECRET_KEY: z.string().startsWith("sk_"),
  RESEND_API_KEY: z.string().startsWith("re_"),
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
});

// This runs at module load time — bad env = crash at startup, not at runtime
export const env = EnvSchema.parse(process.env);

// Usage:
// import { env } from "@/lib/env";
// const stripe = new Stripe(env.STRIPE_SECRET_KEY);
```

## Common Schema Patterns

```typescript
import { z } from "zod";

// Pagination query params
export const PaginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
  sort: z.enum(["asc", "desc"]).default("desc"),
});

// ID parameter
export const IdParamSchema = z.object({
  id: z.string().cuid("Invalid ID format"),
});

// File upload
export const FileUploadSchema = z.object({
  file: z
    .instanceof(File)
    .refine((f) => f.size < 5 * 1024 * 1024, "File must be under 5MB")
    .refine(
      (f) => ["image/jpeg", "image/png", "image/webp"].includes(f.type),
      "Only JPEG, PNG, and WebP are supported"
    ),
});

// Price — avoid floating point errors
export const PriceSchema = z.object({
  amount: z.number().int().positive(), // store as cents
  currency: z.string().length(3).toUpperCase(),
});

// Webhook payload with secret validation
export const WebhookSchema = z.object({
  event: z.string(),
  payload: z.record(z.unknown()),
  timestamp: z.number().int(),
});
```

## Validating URL Search Params

```typescript
// app/api/items/route.ts
import { PaginationSchema } from "@/lib/schemas/common.schema";

export async function GET(req: NextRequest) {
  const params = Object.fromEntries(req.nextUrl.searchParams);
  const parsed = PaginationSchema.safeParse(params);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query params" }, { status: 400 });
  }

  const { page, limit, sort } = parsed.data; // fully typed
  const items = await itemService.findMany({ page, limit, sort });
  return NextResponse.json(items);
}
```

## Implementation Checklist

- [ ] All schemas live in `lib/schemas/` — never inline schemas in route handlers
- [ ] Use `z.infer<typeof Schema>` for all TypeScript types — never write type + schema separately
- [ ] Use `.safeParse()` in route handlers (no uncaught throws), `.parse()` in internal utilities (fail fast)
- [ ] Environment variables validated with Zod in `lib/env.ts` — imported everywhere
- [ ] `z.coerce.number()` for query params (all URL params are strings)
- [ ] Return per-field error messages from Server Actions for form display
- [ ] Validate API *responses* too with `apiFetch` — catches backend contract changes immediately

## Common Mistakes

1. **Using `.parse()` in route handlers** — throws a `ZodError` which becomes a 500 if uncaught. Use `.safeParse()` at API boundaries.

2. **Defining types separately from schemas** — `type CreateUser = { email: string; ... }` alongside a Zod schema is duplication. Delete the manual type; use `z.infer`.

3. **Not validating env vars** — `process.env.DATABASE_URL!` with a non-null assertion is a lie. Validate at startup.

4. **`z.object({}).passthrough()`** — allows unknown keys, enabling mass assignment. Default is `strip` (removes unknown keys). Use `strict()` if you want to reject unknown keys explicitly.

5. **Inlining schemas in components** — schemas defined inside components are recreated on every render. Define once at module level and export.

## When to Apply

- Every API route that receives a request body
- Every Server Action that processes form data or user input
- Environment variable loading (`lib/env.ts`)
- Response validation in fetch wrappers
- Any function that crosses a system boundary (API, file upload, webhook)

## When NOT to Apply

- Internal function calls where TypeScript already guarantees the shape
- Static configuration objects with known types at compile time
- Simple prop passing between components — TypeScript interfaces are sufficient
