---
name: auth-session-pattern
description: Database-backed session authentication for Next.js — no JWTs, no third-party auth provider required. Sessions are opaque tokens stored in a database table, readable server-side via a signed HttpOnly cookie. Supports instant revocation, concurrent session listing, and role-based access. Apply when you need full control over auth without the complexity of OAuth flows or the security tradeoffs of stateless JWTs.
---

# Auth Session Pattern

**Technique:** Opaque Token, Database-Backed, Instantly Revocable

Store a random token in a cookie. Store the session data in the database. On every request, look up the token. This is how most web auth worked for 20 years — it's still the right approach for most apps.

## Why Not JWTs

| | JWTs | Database Sessions |
|---|---|---|
| Revocation | ❌ Can't — valid until expiry | ✅ Delete row instantly |
| Concurrent sessions | ❌ Can't list or limit | ✅ List, limit, revoke individually |
| Payload size | ❌ Cookie grows with claims | ✅ Cookie is just a token ID |
| Server load | ✅ No DB lookup needed | Minimal — one indexed query |
| Secret rotation | ❌ All tokens invalid | ✅ No impact |
| Role changes take effect | ❌ After expiry | ✅ Immediately |

Use JWTs when you need *stateless* auth across multiple independent services (microservices with no shared DB). For a monolithic Next.js app, use sessions.

## Database Schema

```sql
-- Prisma schema
model User {
  id        String    @id @default(cuid())
  email     String    @unique
  password  String
  name      String
  role      Role      @default(USER)
  createdAt DateTime  @default(now())
  sessions  Session[]
}

model Session {
  id        String   @id @default(cuid())
  token     String   @unique @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  userAgent String?  // for session listing UI
  ipAddress String?  // for security audit

  @@index([token])           // critical — every request queries by token
  @@index([userId])          // for listing user's sessions
  @@index([expiresAt])       // for cleanup job
}

enum Role {
  USER
  ADMIN
}
```

## Session Utilities

```typescript
// lib/session.ts
import { cookies } from "next/headers";
import { db } from "@/db";
import { cache } from "react";

const SESSION_COOKIE = "session_token";
const SESSION_DURATION_DAYS = 30;

export interface SessionUser {
  id: string;
  email: string;
  name: string;
  role: "USER" | "ADMIN";
}

export interface Session {
  id: string;
  userId: string;
  user: SessionUser;
  expiresAt: Date;
}

// Create a new session after login
export async function createSession(
  userId: string,
  opts?: { userAgent?: string; ipAddress?: string }
): Promise<string> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  const session = await db.session.create({
    data: {
      userId,
      expiresAt,
      userAgent: opts?.userAgent,
      ipAddress: opts?.ipAddress,
    },
  });

  // Set HttpOnly, Secure, SameSite cookie
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });

  return session.token;
}

// Read session — cached per request (React cache)
export const getSession = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return null;

  const session = await db.session.findUnique({
    where: { token },
    include: {
      user: {
        select: { id: true, email: true, name: true, role: true },
      },
    },
  });

  if (!session) return null;
  if (session.expiresAt < new Date()) {
    // Expired — clean up
    await db.session.delete({ where: { id: session.id } });
    return null;
  }

  return session as Session;
});

// Destroy current session (logout)
export async function destroySession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await db.session.deleteMany({ where: { token } });
  }

  cookieStore.delete(SESSION_COOKIE);
}

// Destroy all sessions for a user (force logout everywhere)
export async function destroyAllSessions(userId: string): Promise<void> {
  await db.session.deleteMany({ where: { userId } });
}

// Extend session on activity (sliding window)
export async function extendSession(sessionId: string): Promise<void> {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);
  await db.session.update({ where: { id: sessionId }, data: { expiresAt } });
}
```

## Login Server Action

```typescript
// actions/auth.actions.ts
"use server";

import { z } from "zod";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { createSession } from "@/lib/session";
import { userService } from "@/services/user.service";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

type LoginResult = { error: string } | never;

export async function login(formData: FormData): Promise<LoginResult> {
  const parsed = LoginSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: "Invalid email or password" };

  try {
    const user = await userService.authenticate(
      parsed.data.email,
      parsed.data.password
    );

    const headerStore = await headers();
    await createSession(user.id, {
      userAgent: headerStore.get("user-agent") ?? undefined,
      ipAddress: headerStore.get("x-forwarded-for") ?? undefined,
    });
  } catch {
    return { error: "Invalid email or password" };
  }

  redirect("/dashboard");
}

export async function logout(): Promise<void> {
  await destroySession();
  redirect("/login");
}
```

## Middleware Auth Guard

```typescript
// middleware.ts
import { NextRequest, NextResponse } from "next/server";

const PROTECTED_PATHS = ["/dashboard", "/settings", "/api/"];
const AUTH_PATHS = ["/login", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session_token")?.value;
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPath = AUTH_PATHS.some((p) => pathname.startsWith(p));

  if (isProtected && !token) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  if (isAuthPath && token) {
    const url = req.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)"],
};
```

**Note:** Middleware only checks for the *presence* of a cookie, not its validity (no DB access in middleware — it runs on the edge). The actual session validation happens in `getSession()` within Server Components and Server Actions.

## Using Sessions in Server Components

```tsx
// app/dashboard/page.tsx
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  // session.user is fully typed
  return <h1>Welcome, {session.user.name}</h1>;
}
```

```tsx
// app/dashboard/settings/page.tsx — role check
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const session = await getSession();
  if (!session) redirect("/login");
  if (session.user.role !== "ADMIN") redirect("/dashboard");

  return <AdminPanel />;
}
```

## Session Listing (Security UI)

```typescript
// app/settings/sessions/page.tsx
import { getSession } from "@/lib/session";
import { db } from "@/db";
import { redirect } from "next/navigation";

export default async function SessionsPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  const sessions = await db.session.findMany({
    where: { userId: session.userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <ul>
      {sessions.map((s) => (
        <li key={s.id}>
          <span>{s.userAgent ?? "Unknown device"}</span>
          <span>{s.ipAddress}</span>
          <span>{s.createdAt.toLocaleDateString()}</span>
          {s.id === session.id && <span>(current)</span>}
          <form action={revokeSession.bind(null, s.id)}>
            <button type="submit">Revoke</button>
          </form>
        </li>
      ))}
    </ul>
  );
}
```

```typescript
// actions/auth.actions.ts (add to existing)
export async function revokeSession(sessionId: string): Promise<void> {
  const session = await getSession();
  if (!session) return;

  // Only allow revoking your own sessions
  await db.session.deleteMany({
    where: { id: sessionId, userId: session.userId },
  });

  revalidatePath("/settings/sessions");
}
```

## Session Cleanup Cron Job

Expired sessions accumulate. Run this as a cron job or scheduled function:

```typescript
// app/api/cron/cleanup-sessions/route.ts
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  const deleted = await db.session.deleteMany({
    where: { expiresAt: { lt: new Date() } },
  });

  return Response.json({ deleted: deleted.count });
}
```

On Vercel, add to `vercel.json`:
```json
{
  "crons": [{ "path": "/api/cron/cleanup-sessions", "schedule": "0 2 * * *" }]
}
```

## Implementation Checklist

- [ ] `@@index([token])` on Session table — without this, every request does a full table scan
- [ ] Cookie is `httpOnly: true`, `secure: true` in production, `sameSite: "lax"`
- [ ] `getSession()` wrapped in `cache()` — called once per request, not per component
- [ ] Middleware checks cookie *presence* only; actual DB validation in `getSession()`
- [ ] `onDelete: Cascade` on Session → User relation — deleting a user deletes all their sessions
- [ ] Sessions include `userAgent` and `ipAddress` for security UI
- [ ] Separate expired session cleanup job — don't rely on on-demand cleanup

## Common Mistakes

1. **Validating the session in middleware** — middleware runs on the edge (no Prisma, no DB). Only check cookie presence in middleware; validate in Server Components/Actions.

2. **Not indexing the token column** — every page request queries `session` by `token`. Without an index on a large table, this is a full table scan on every page load.

3. **Using `response.cookies.set()` instead of `cookies()` from `next/headers`** — in Next.js App Router, always use the `cookies()` helper from `next/headers` inside Server Actions and Route Handlers.

4. **Forgetting `cache()` on `getSession`** — without `cache()`, every Server Component that calls `getSession()` makes a separate DB round-trip per request.

5. **Storing sensitive data in the session DB row** — only store what you need for every request (userId, role). Fetch the rest on demand.

## When to Apply

- Any app with user accounts that needs full control over sessions
- Products where instant account suspension is a requirement
- Apps with security-sensitive operations (banking, SaaS admin, B2B)
- When you want to avoid NextAuth complexity for simple email/password flows

## When NOT to Apply

- Microservices with no shared database (use JWTs for cross-service auth)
- Apps already using NextAuth or Clerk (don't reinvent what's working)
- Apps that need federated identity (SSO, SAML) out of the box
- Static sites with no server-side runtime
