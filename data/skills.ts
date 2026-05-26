import { Skill } from "@/lib/types";

export const skills: Skill[] = [
  {
    slug: "react-optimistic-updates",
    name: "React Optimistic Updates",
    category: "Patterns",
    tagline: "Instant UI feedback for any CRUD operation — no loading spinners.",
    description:
      "A TanStack Query v5 pattern that updates the UI immediately on user action, rolls back automatically on error, and revalidates in the background. Eliminates the lag between user intent and visual response in every CRUD interface.",
    tags: ["React", "TanStack Query", "TypeScript", "UX"],
    installCmd:
      "curl -fsSL https://skills.vishalvoid.com/install react-optimistic-updates | bash",
    related: ["nextjs-product-stack", "zod-api-validation"],
    docs: [
      {
        title: "The problem",
        content:
          "Traditional CRUD flows create a loop: user acts → spinner appears → server responds → UI updates. Every step after the first is invisible latency. On a fast connection this is annoying; on a slow one it destroys the experience. Optimistic updates invert this: apply the change immediately, sync with the server in the background, and only surface errors if something actually goes wrong.",
      },
      {
        title: "Core hook — useMutation with rollback",
        content:
          "The three hooks that make optimistic updates safe: `onMutate` applies the change and saves a snapshot, `onError` restores from the snapshot if the server rejects it, `onSettled` always triggers a fresh revalidation so the cache stays accurate.",
        code: `// hooks/use-update-item.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateItem } from '@/lib/api'
import type { Item } from '@/lib/types'

export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: updateItem,

    onMutate: async (updated: Partial<Item> & { id: string }) => {
      // Cancel any in-flight refetches for this query
      await queryClient.cancelQueries({ queryKey: ['items'] })

      // Snapshot current state for rollback
      const previous = queryClient.getQueryData<Item[]>(['items'])

      // Optimistically apply the update
      queryClient.setQueryData<Item[]>(['items'], (old = []) =>
        old.map((item) =>
          item.id === updated.id ? { ...item, ...updated } : item
        )
      )

      return { previous }
    },

    onError: (_err, _vars, context) => {
      // Rollback to the snapshot on failure
      if (context?.previous) {
        queryClient.setQueryData(['items'], context.previous)
      }
    },

    onSettled: () => {
      // Always revalidate after mutation (success or failure)
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}`,
        language: "typescript",
        filename: "hooks/use-update-item.ts",
      },
      {
        title: "Applying it in a component",
        content:
          "The component has zero awareness of loading state — it just calls `mutate` and the UI responds instantly. Error handling lives in the mutation hook, not scattered across components.",
        code: `// components/item-row.tsx
'use client'

import { useUpdateItem } from '@/hooks/use-update-item'
import type { Item } from '@/lib/types'

export function ItemRow({ item }: { item: Item }) {
  const { mutate } = useUpdateItem()

  return (
    <div className="flex items-center gap-3 py-2">
      <input
        type="checkbox"
        checked={item.completed}
        onChange={(e) =>
          mutate({ id: item.id, completed: e.target.checked })
        }
      />
      <span
        className={item.completed ? 'line-through text-muted' : ''}
      >
        {item.title}
      </span>
    </div>
  )
}`,
        language: "tsx",
        filename: "components/item-row.tsx",
      },
      {
        title: "Optimistic deletes",
        content:
          "Deletes follow the same pattern but filter out the item rather than merging properties. The item disappears from the list instantly; if the server fails, it reappears.",
        code: `export function useDeleteItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => deleteItem(id),

    onMutate: async (id: string) => {
      await queryClient.cancelQueries({ queryKey: ['items'] })
      const previous = queryClient.getQueryData<Item[]>(['items'])

      queryClient.setQueryData<Item[]>(['items'], (old = []) =>
        old.filter((item) => item.id !== id)
      )

      return { previous }
    },

    onError: (_err, _id, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['items'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}`,
        language: "typescript",
        filename: "hooks/use-delete-item.ts",
      },
      {
        title: "Optimistic creates with temporary IDs",
        content:
          "For creates, generate a temporary client-side ID so the item can be placed in the list immediately. When the server responds with the real ID, `onSettled` revalidation replaces it automatically.",
        code: `export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createItem,

    onMutate: async (newItem: NewItem) => {
      await queryClient.cancelQueries({ queryKey: ['items'] })
      const previous = queryClient.getQueryData<Item[]>(['items'])

      // Use a temp ID — server will assign the real one
      const optimistic: Item = {
        ...newItem,
        id: \`temp-\${crypto.randomUUID()}\`,
        createdAt: new Date().toISOString(),
      }

      queryClient.setQueryData<Item[]>(['items'], (old = []) => [
        optimistic,
        ...old,
      ])

      return { previous }
    },

    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(['items'], context.previous)
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['items'] })
    },
  })
}`,
        language: "typescript",
        filename: "hooks/use-create-item.ts",
      },
      {
        title: "When to use — and when not to",
        content:
          "Use optimistic updates when: toggling boolean states (complete, archived, starred), inline text edits where you know the exact new value, drag-to-reorder, list item deletion. Avoid when: the server generates data you can't predict (computed fields, database triggers, external API calls during mutation), or when concurrent edits from other users make the snapshot unreliable.",
      },
      {
        title: "Common pitfalls",
        content:
          "1. Forgetting `cancelQueries` — without it, an in-flight refetch can overwrite your optimistic state mid-mutation. 2. Not returning `previous` from `onMutate` — TanStack Query passes `context` to `onError` from the return value of `onMutate`; if you don't return it, rollback is impossible. 3. Mutating the cache directly — always use `setQueryData` with an immutable update, never push/splice into the array.",
      },
    ],
  },
  {
    slug: "nextjs-product-stack",
    name: "Next.js Product Stack",
    category: "Architecture",
    tagline: "A strict 9-layer architecture for production full-stack apps.",
    description:
      "A battle-tested blueprint for building production Next.js applications with clear separation of concerns across 9 layers — from database schema to UI. Each layer has one job, communicates only with adjacent layers, and can be tested in isolation. Scales from MVP to enterprise without accruing architectural debt.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Architecture"],
    installCmd:
      "curl -fsSL https://skills.vishalvoid.com/install nextjs-product-stack | bash",
    related: ["react-optimistic-updates", "auth-session-pattern"],
    docs: [
      {
        title: "The 9 layers",
        content:
          "Each layer is a ring that isolates a concern. Inner layers (1–3) are pure business logic with no framework dependency. Outer layers (6–9) are framework-specific. This separation means you can swap your ORM, change your API style, or migrate UI frameworks without touching business logic.",
        code: `// The stack, from bottom to top:
//
// 1. DATABASE      — Prisma schema, migrations
// 2. REPOSITORY    — Raw DB queries, returns plain objects
// 3. SERVICE       — Business logic, calls repositories
// 4. SERVER ACTION — Form/mutation handler, calls services
// 5. API ROUTE     — REST/webhook endpoint, calls services
// 6. MIDDLEWARE    — Auth checks, redirects, headers
// 7. DATA HOOK     — Client-side TanStack Query fetches
// 8. COMPONENT     — State, event handlers, business UI
// 9. UI            — Presentational only, no logic`,
        language: "typescript",
        filename: "architecture.ts",
      },
      {
        title: "Folder structure",
        content:
          "Each layer lives in a predictable location. The rule: imports only flow downward — a service can import a repository, but a repository must never import a service.",
        code: `src/
├── lib/
│   ├── db.ts                    # Prisma client singleton
│   ├── repositories/
│   │   ├── user.repository.ts   # Layer 2
│   │   └── post.repository.ts
│   ├── services/
│   │   ├── user.service.ts      # Layer 3
│   │   └── post.service.ts
│   └── validations/
│       └── post.schema.ts       # Zod schemas (shared)
├── app/
│   ├── api/
│   │   └── posts/route.ts       # Layer 5 (REST)
│   ├── (dashboard)/
│   │   └── posts/
│   │       ├── page.tsx         # Layer 8/9
│   │       └── actions.ts       # Layer 4 (Server Actions)
│   └── middleware.ts            # Layer 6
└── components/
    ├── ui/                      # Layer 9 (pure presentational)
    └── features/                # Layer 8 (wired components)`,
        language: "bash",
        filename: "project structure",
      },
      {
        title: "Layer 2: Repository",
        content:
          "Repositories are the only layer that imports from Prisma. They accept plain parameters, run one query, and return a plain object. No business logic, no validation, no conditionals based on business rules — just raw data access.",
        code: `// lib/repositories/post.repository.ts
import { db } from '@/lib/db'

export async function findPostById(id: string) {
  return db.post.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      published: true,
      authorId: true,
      createdAt: true,
    },
  })
}

export async function findPublishedPosts(limit = 20, offset = 0) {
  return db.post.findMany({
    where: { published: true },
    orderBy: { createdAt: 'desc' },
    take: limit,
    skip: offset,
    select: { id: true, title: true, createdAt: true },
  })
}

export async function createPost(data: {
  title: string
  content: string
  authorId: string
}) {
  return db.post.create({ data })
}`,
        language: "typescript",
        filename: "lib/repositories/post.repository.ts",
      },
      {
        title: "Layer 3: Service",
        content:
          "Services contain all business logic. They orchestrate repositories, enforce rules, and throw typed errors. A service never touches `req`, `res`, or any framework concept.",
        code: `// lib/services/post.service.ts
import { findPostById, createPost } from '@/lib/repositories/post.repository'
import { findUserById } from '@/lib/repositories/user.repository'

export class PostNotFoundError extends Error {
  constructor(id: string) {
    super(\`Post \${id} not found\`)
    this.name = 'PostNotFoundError'
  }
}

export class UnauthorizedError extends Error {
  constructor() {
    super('You do not have permission to perform this action')
    this.name = 'UnauthorizedError'
  }
}

export async function getPost(id: string) {
  const post = await findPostById(id)
  if (!post) throw new PostNotFoundError(id)
  return post
}

export async function publishPost(postId: string, requestingUserId: string) {
  const post = await findPostById(postId)
  if (!post) throw new PostNotFoundError(postId)
  if (post.authorId !== requestingUserId) throw new UnauthorizedError()

  return updatePost(postId, { published: true })
}`,
        language: "typescript",
        filename: "lib/services/post.service.ts",
      },
      {
        title: "Layer 4: Server Action",
        content:
          "Server Actions are thin — they parse form data, call a service, and return a typed result. No business logic lives here. Errors from the service are caught and surfaced to the client as structured responses.",
        code: `// app/(dashboard)/posts/actions.ts
'use server'

import { auth } from '@/lib/auth'
import { publishPost, PostNotFoundError, UnauthorizedError } from '@/lib/services/post.service'

type ActionResult =
  | { success: true }
  | { success: false; error: string }

export async function publishPostAction(postId: string): Promise<ActionResult> {
  const session = await auth()
  if (!session) return { success: false, error: 'Not authenticated' }

  try {
    await publishPost(postId, session.user.id)
    return { success: true }
  } catch (err) {
    if (err instanceof PostNotFoundError) {
      return { success: false, error: 'Post not found' }
    }
    if (err instanceof UnauthorizedError) {
      return { success: false, error: 'Permission denied' }
    }
    return { success: false, error: 'Something went wrong' }
  }
}`,
        language: "typescript",
        filename: "app/(dashboard)/posts/actions.ts",
      },
      {
        title: "Why strict layers prevent the most common failure modes",
        content:
          "The #1 failure mode in Next.js apps is server actions that import Prisma directly, creating untestable spaghetti. The #2 failure is components fetching data directly with fetch(), coupling UI to network. The #3 failure is circular service imports. The 9-layer rule makes all three physically impossible — the folder structure enforces the constraint.",
      },
    ],
  },
  {
    slug: "grid-layout-system",
    name: "Grid Layout System",
    category: "Design",
    tagline:
      "Professional app layouts using CSS Grid — rails, panels, sidebars.",
    description:
      "A structured CSS Grid design system for building polished app shells with zero layout drift. Implements the exact layout patterns used in Linear, Vercel, and Resend — sidebar rails, content panels, detail drawers, and responsive breakpoints — as a composable, predictable system.",
    tags: ["CSS Grid", "Tailwind CSS", "Design System", "Layout"],
    installCmd:
      "curl -fsSL https://skills.vishalvoid.com/install grid-layout-system | bash",
    related: ["nextjs-product-stack"],
    docs: [
      {
        title: "The two primitives",
        content:
          "Every professional app shell is built from two CSS Grid primitives: the shell (full-viewport grid that divides space between navigation and content) and the content area (inner grid that composes panels, lists, and detail views). Everything else is composition of these two.",
      },
      {
        title: "The app shell",
        content:
          "A `48px` top bar spans the full width. Below it, the sidebar rail (`240px` fixed) and content area (`1fr`) divide the remaining space. The grid never overflows because nothing inside it uses `position: absolute` for layout.",
        code: `/* app-shell.css */
.app-shell {
  display: grid;
  grid-template-columns: 240px 1fr;
  grid-template-rows: 48px 1fr;
  height: 100dvh;        /* dvh: accounts for mobile browser chrome */
  overflow: hidden;
}

.app-shell__topbar {
  grid-column: 1 / -1;  /* spans full width */
  grid-row: 1;
  border-bottom: 1px solid var(--border);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.app-shell__sidebar {
  grid-column: 1;
  grid-row: 2;
  overflow-y: auto;
  border-right: 1px solid var(--border);
}

.app-shell__content {
  grid-column: 2;
  grid-row: 2;
  overflow-y: auto;      /* content scrolls, shell never does */
}`,
        language: "css",
        filename: "app-shell.css",
      },
      {
        title: "Tailwind CSS implementation",
        content:
          "The same shell in Tailwind — no custom CSS needed. Grid rows and columns are defined inline. The key insight: `h-dvh overflow-hidden` on the shell, `overflow-y-auto` on the scrollable regions.",
        code: `// components/AppShell.tsx
export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid h-dvh overflow-hidden"
         style={{ gridTemplateColumns: '240px 1fr', gridTemplateRows: '48px 1fr' }}>
      {children}
    </div>
  )
}

export function Topbar({ children }: { children: React.ReactNode }) {
  return (
    <header className="col-span-full row-start-1 flex items-center px-4
                       border-b border-[#1f1f1f]">
      {children}
    </header>
  )
}

export function Sidebar({ children }: { children: React.ReactNode }) {
  return (
    <aside className="row-start-2 col-start-1 overflow-y-auto
                      border-r border-[#1f1f1f]">
      {children}
    </aside>
  )
}

export function Content({ children }: { children: React.ReactNode }) {
  return (
    <main className="row-start-2 col-start-2 overflow-y-auto">
      {children}
    </main>
  )
}`,
        language: "tsx",
        filename: "components/AppShell.tsx",
      },
      {
        title: "Responsive sidebar collapse",
        content:
          "On mobile, the sidebar rail collapses to `0px` via a CSS variable. A `data-open` attribute toggles the sidebar into view as a fixed overlay. The layout grid handles the reflow automatically — the content expands to fill the full width.",
        code: `/* Mobile-first sidebar collapse */

.app-shell {
  --sidebar-w: 240px;
  grid-template-columns: var(--sidebar-w) 1fr;
}

@media (max-width: 768px) {
  .app-shell {
    --sidebar-w: 0px;
    grid-template-columns: var(--sidebar-w) 1fr;
  }

  .app-shell__sidebar {
    position: fixed;
    inset: 0 auto 0 0;
    width: 240px;
    z-index: 50;
    transform: translateX(-100%);
    transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1);
    background: var(--bg);
    border-right: 1px solid var(--border);
  }

  .app-shell__sidebar[data-open='true'] {
    transform: translateX(0);
    box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
  }
}`,
        language: "css",
        filename: "app-shell.css",
      },
      {
        title: "Detail panel (the Linear pattern)",
        content:
          "When a row is selected, a third column appears to the right. The grid adds a `380px` column via `data-panel`. No absolute positioning — the content area narrows automatically as the panel opens.",
        code: `/* Panel system */
.app-shell[data-panel] {
  grid-template-columns: 240px 1fr 380px;
}

.app-shell__panel {
  display: none;
  grid-row: 2;
  grid-column: 3;
  overflow-y: auto;
  border-left: 1px solid var(--border);
  animation: slideInRight 160ms ease;
}

.app-shell[data-panel] .app-shell__panel {
  display: block;
}

@keyframes slideInRight {
  from { opacity: 0; transform: translateX(8px); }
  to   { opacity: 1; transform: translateX(0); }
}

/* Collapse panel on mobile — stack vertically instead */
@media (max-width: 1024px) {
  .app-shell[data-panel] {
    grid-template-columns: 0px 1fr;
    grid-template-rows: 48px 1fr 1fr;
  }

  .app-shell[data-panel] .app-shell__panel {
    grid-column: 2;
    grid-row: 3;
    border-left: none;
    border-top: 1px solid var(--border);
  }
}`,
        language: "css",
        filename: "app-shell.css",
      },
      {
        title: "Content area grid",
        content:
          "Inside the content area, use another grid for list-detail or card compositions. This nested grid is independent — it responds to the content area's width, not the full viewport.",
        code: `/* Content area: list + detail side by side */
.content-grid {
  display: grid;
  grid-template-columns: 340px 1fr;
  height: 100%;
}

/* Collapse to single column on narrow viewports */
@media (max-width: 900px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .content-grid__detail {
    display: none;
  }

  .content-grid[data-selected] .content-grid__list {
    display: none;
  }

  .content-grid[data-selected] .content-grid__detail {
    display: block;
  }
}`,
        language: "css",
        filename: "content-grid.css",
      },
    ],
  },
  {
    slug: "zod-api-validation",
    name: "Zod API Validation",
    category: "Patterns",
    tagline: "End-to-end type safety from API schema to UI — one source of truth.",
    description:
      "Define your API request and response shapes once as Zod schemas. TypeScript types are inferred automatically, runtime validation happens for free, and your API, service layer, and frontend all share the same type contract with no drift.",
    tags: ["Zod", "TypeScript", "API", "Validation"],
    installCmd:
      "curl -fsSL https://skills.vishalvoid.com/install zod-api-validation | bash",
    related: ["nextjs-product-stack", "auth-session-pattern"],
    docs: [
      {
        title: "The problem with manual types",
        content:
          "Most teams define TypeScript types by hand and separately write runtime validation logic. These drift apart within weeks: the type says `string`, the validator allows `null`, and the UI crashes in production. Zod solves this by making the schema the single source of truth — types are derived from validation, not the other way around.",
      },
      {
        title: "Schema-first API design",
        content:
          "Define the schema once. Infer the request type, the response type, and the error structure from it. Every other layer imports from this file — nothing is duplicated.",
        code: `// lib/validations/post.schema.ts
import { z } from 'zod'

export const createPostSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200),
  content: z.string().min(10, 'Content must be at least 10 characters'),
  tags: z.array(z.string()).max(5).default([]),
  published: z.boolean().default(false),
})

export const updatePostSchema = createPostSchema.partial().extend({
  id: z.string().uuid(),
})

export const postResponseSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  content: z.string(),
  tags: z.array(z.string()),
  published: z.boolean(),
  authorId: z.string(),
  createdAt: z.string().datetime(),
})

// Inferred types — never written by hand
export type CreatePostInput = z.infer<typeof createPostSchema>
export type UpdatePostInput = z.infer<typeof updatePostSchema>
export type PostResponse = z.infer<typeof postResponseSchema>`,
        language: "typescript",
        filename: "lib/validations/post.schema.ts",
      },
      {
        title: "Validating API route inputs",
        content:
          "In the API route, parse the incoming body against the schema. If it fails, Zod gives you structured field-level errors at no extra cost. If it passes, the parsed value is fully typed — no `as` casts needed.",
        code: `// app/api/posts/route.ts
import { NextRequest } from 'next/server'
import { createPostSchema } from '@/lib/validations/post.schema'
import { createPost } from '@/lib/services/post.service'
import { auth } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await req.json()
  const result = createPostSchema.safeParse(body)

  if (!result.success) {
    return Response.json(
      {
        error: 'Validation failed',
        // Structured field errors — ready for form error display
        fields: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    )
  }

  // result.data is fully typed as CreatePostInput here
  const post = await createPost({ ...result.data, authorId: session.user.id })
  return Response.json(post, { status: 201 })
}`,
        language: "typescript",
        filename: "app/api/posts/route.ts",
      },
      {
        title: "Reusing schemas in Server Actions",
        content:
          "The same schema that validates your API route also validates your Server Action. One schema definition, two validation points — no drift possible.",
        code: `// app/(dashboard)/posts/actions.ts
'use server'

import { createPostSchema } from '@/lib/validations/post.schema'
import { createPost } from '@/lib/services/post.service'
import { auth } from '@/lib/auth'

export async function createPostAction(formData: FormData) {
  const session = await auth()
  if (!session) return { error: 'Not authenticated' }

  const raw = {
    title: formData.get('title'),
    content: formData.get('content'),
    published: formData.get('published') === 'on',
  }

  const result = createPostSchema.safeParse(raw)
  if (!result.success) {
    return { error: 'Invalid input', fields: result.error.flatten().fieldErrors }
  }

  const post = await createPost({ ...result.data, authorId: session.user.id })
  return { success: true, post }
}`,
        language: "typescript",
        filename: "app/(dashboard)/posts/actions.ts",
      },
      {
        title: "Type-safe fetch on the client",
        content:
          "On the client, parse API responses through the response schema. If the API changes its shape without updating the schema, parsing fails loudly in development instead of silently returning `undefined` fields in production.",
        code: `// lib/api/posts.ts
import { postResponseSchema, type PostResponse } from '@/lib/validations/post.schema'

export async function fetchPost(id: string): Promise<PostResponse> {
  const res = await fetch(\`/api/posts/\${id}\`)

  if (!res.ok) {
    throw new Error(\`Failed to fetch post \${id}: \${res.statusText}\`)
  }

  const json = await res.json()

  // Parse validates the response matches what we expect
  // Throws in dev if the API returns unexpected shape
  return postResponseSchema.parse(json)
}`,
        language: "typescript",
        filename: "lib/api/posts.ts",
      },
    ],
  },
  {
    slug: "auth-session-pattern",
    name: "Auth Session Pattern",
    category: "Architecture",
    tagline: "Stateful, database-backed sessions without JWTs.",
    description:
      "A cookie-based session architecture that stores session data in your database, not in a JWT. Sessions are revokable, auditable, and never expose sensitive data to the client. Integrates with Next.js middleware for zero-latency auth checks on every route.",
    tags: ["Auth", "Next.js", "Middleware", "Security", "TypeScript"],
    installCmd:
      "curl -fsSL https://skills.vishalvoid.com/install auth-session-pattern | bash",
    related: ["nextjs-product-stack", "zod-api-validation"],
    docs: [
      {
        title: "Why not JWTs",
        content:
          "JWTs are stateless — you cannot invalidate a specific token without a blocklist, which negates the statelessness benefit. A database-backed session is slightly slower (one extra DB read per request) but gives you: instant logout that actually works, per-session revocation (e.g. 'log out all devices'), full audit log of session activity, and no risk of leaking sensitive data in a decodable token.",
      },
      {
        title: "Database schema",
        content:
          "Two tables: `User` (your user record) and `Session` (one row per active login). The session stores a cryptographically secure token, the user it belongs to, and an expiry. The token in the cookie is just a lookup key — no data lives in the cookie itself.",
        code: `// prisma/schema.prisma
model User {
  id           String    @id @default(cuid())
  email        String    @unique
  passwordHash String
  name         String?
  createdAt    DateTime  @default(now())
  sessions     Session[]
}

model Session {
  id        String   @id @default(cuid())
  token     String   @unique       // stored in the cookie
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  expiresAt DateTime
  createdAt DateTime @default(now())
  userAgent String?                // for audit display
  ipAddress String?

  @@index([token])
  @@index([userId])
}`,
        language: "typescript",
        filename: "prisma/schema.prisma",
      },
      {
        title: "Creating a session",
        content:
          "On login, verify credentials, generate a secure random token, insert a session row, and set an `HttpOnly` cookie. The cookie carries only the token — nothing else.",
        code: `// lib/auth/session.ts
import { db } from '@/lib/db'
import { cookies } from 'next/headers'

const SESSION_COOKIE = 'sid'
const SESSION_DURATION_DAYS = 30

export async function createSession(userId: string, meta?: { userAgent?: string; ipAddress?: string }) {
  const token = crypto.randomUUID() + crypto.randomUUID() // 72-char opaque token

  const session = await db.session.create({
    data: {
      token,
      userId,
      expiresAt: new Date(Date.now() + SESSION_DURATION_DAYS * 86_400_000),
      userAgent: meta?.userAgent,
      ipAddress: meta?.ipAddress,
    },
  })

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    expires: session.expiresAt,
    path: '/',
  })

  return session
}`,
        language: "typescript",
        filename: "lib/auth/session.ts",
      },
      {
        title: "Reading the session",
        content:
          "The `auth()` function is called at the top of any server component, action, or route handler that needs the current user. It reads the cookie, looks up the session, and returns the user — or `null` if there's no valid session.",
        code: `// lib/auth/index.ts
import { db } from '@/lib/db'
import { cookies } from 'next/headers'
import { cache } from 'react'

export type Session = {
  user: { id: string; email: string; name: string | null }
  sessionId: string
}

// cache() memoizes per-request — safe to call auth() multiple times
export const auth = cache(async (): Promise<Session | null> => {
  const cookieStore = await cookies()
  const token = cookieStore.get('sid')?.value

  if (!token) return null

  const session = await db.session.findUnique({
    where: {
      token,
      expiresAt: { gt: new Date() },   // ignore expired sessions
    },
    select: {
      id: true,
      user: {
        select: { id: true, email: true, name: true },
      },
    },
  })

  if (!session) return null

  return { user: session.user, sessionId: session.id }
})`,
        language: "typescript",
        filename: "lib/auth/index.ts",
      },
      {
        title: "Middleware for route protection",
        content:
          "Next.js middleware runs on the edge before the page renders. Read the session token from the cookie and redirect unauthenticated requests to `/login`. Because this runs before the page component, there's no flash of unauthorized content.",
        code: `// middleware.ts
import { NextRequest, NextResponse } from 'next/server'

const PUBLIC_PATHS = ['/', '/login', '/register', '/api/auth']

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const isPublic = PUBLIC_PATHS.some((p) => pathname.startsWith(p))

  if (isPublic) return NextResponse.next()

  const token = req.cookies.get('sid')?.value

  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('redirect', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}`,
        language: "typescript",
        filename: "middleware.ts",
      },
      {
        title: "Session revocation",
        content:
          "Logout deletes the session row from the database — the token is immediately invalid everywhere, including other devices. For 'log out all devices', delete every session where `userId = currentUser.id`.",
        code: `// lib/auth/session.ts (continued)
export async function deleteSession(token: string) {
  await db.session.delete({ where: { token } }).catch(() => null)

  const cookieStore = await cookies()
  cookieStore.delete('sid')
}

export async function deleteAllSessions(userId: string) {
  await db.session.deleteMany({ where: { userId } })

  const cookieStore = await cookies()
  cookieStore.delete('sid')
}`,
        language: "typescript",
        filename: "lib/auth/session.ts",
      },
    ],
  },
  {
    slug: "official-skills-installer",
    name: "Official Skills Installer",
    category: "Patterns",
    tagline: "Scrape, structure, and register 250+ developer skills from officialskills.sh.",
    description: "A custom automation pattern to scrape, download, clean, and register developer skills from officialskills.sh. Automatically formats whenToUse entries using action gerunds and integrates them with Next.js static params.",
    tags: ["Automation", "Node.js", "Scraping", "TypeScript", "Next.js"],
    installCmd: "curl -fsSL https://skills.vishalvoid.com/install official-skills-installer | bash",
    docs: [
      {
        title: "Architecture & Integration",
        content: "To integrate over 250 skills across 35 different providers into this site, we built an automated pipeline. The pipeline first scrapes the master catalog on officialskills.sh, resolves GitHub source repositories, downloads raw markdown contents, structures them into TypeScript, rewrites the global array registry, and updates the sidebar filtering client state with matching brand SVG icons."
      },
      {
        title: "Core scrap & generation script",
        content: "This Node.js script downloads the metadata from officialskills.sh, resolves GitHub repositories, downloads the skills, and writes cleaned files to data/external/.",
        code: `// scratch/build-all-external-skills.js
const fs = require('fs');
const path = require('path');
const https = require('https');

// Custom logic for cleaning whenToUse (ensuring gerund verbs, min 5 items)
function cleanWhenToUse(items) {
  // ensure gerund action words...
}`,
        language: "javascript",
        filename: "scratch/build-all-external-skills.js"
      },
      {
        title: "Dynamic sidebar registration",
        content: "The Next.js dynamic routes use a single page layout under app/skills/anthropic/[slug] to serve all external skills by matching their slugs, while the Sidebar filter state allows users to search across category tags and provider brands.",
        code: `// components/SkillsClient.tsx
export default function SkillsClient({ skills }) {
  const [provider, setProvider] = useState("All");
  // filters all skills dynamically based on imported arrays
}`,
        language: "tsx",
        filename: "components/SkillsClient.tsx"
      }
    ]
  }
];

export function getSkillBySlug(slug: string): Skill | undefined {
  return skills.find((s) => s.slug === slug);
}

export function getRelatedSkills(skill: Skill): Skill[] {
  if (!skill.related?.length) return [];
  return skill.related
    .map((slug) => skills.find((s) => s.slug === slug))
    .filter(Boolean) as Skill[];
}
