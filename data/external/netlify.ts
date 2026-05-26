import type { ExternalSkill } from "../external-skills";

export const netlifySkills: ExternalSkill[] = [
  {
    "slug": "netlify-blobs",
    "name": "netlify-blobs",
    "tagline": "Key-value object storage for files and data",
    "description": "Key-value object storage for files and data",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-blobs",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify Blobs is zero-config object storage built into the Netlify platform. It works from functions, edge functions, and framework server routes without any provisioning. Supports CRUD operations, metadata, prefix-based listing, and both site-scoped and deploy-scoped stores.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-blobs\ndescription: Guide for using Netlify Blobs for file and asset storage — images, documents, uploads, exports, cached binary artifacts. Covers getStore(), CRUD operations, metadata, listing, deploy-scoped vs site-scoped stores, and local development. Do NOT use Blobs as a dynamic data store — use Netlify Database for that.\n---\n\n# Netlify Blobs\n\nNetlify Blobs is zero-config object storage for **files and assets**: images, documents, uploads, exports, cached binary artifacts. Available from any Netlify compute (functions, edge functions, framework server routes). No provisioning required.\n\n**Not for dynamic data.** If the project needs to store records, user data, application state, or anything queryable, use Netlify Database instead — see `netlify-database/SKILL.md`. Reach for Blobs when the thing you're storing is a file or an asset blob, not a record.\n\n```bash\nnpm install @netlify/blobs\n```\n\n## Getting a Store\n\n```typescript\nimport { getStore } from \"@netlify/blobs\";\n\nconst store = getStore({ name: \"my-store\" });\n\n// Use \"strong\" consistency when you need immediate reads after writes\nconst store = getStore({ name: \"my-store\", consistency: \"strong\" });\n```\n\n## CRUD Operations\n\nThese are the **only** store methods. Do not invent others.\n\n### Create / Update\n\n```typescript\n// String or binary data\nawait store.set(\"key\", \"value\");\nawait store.set(\"key\", fileBuffer);\n\n// With metadata\nawait store.set(\"key\", data, {\n  metadata: { contentType: \"image/png\", uploadedAt: new Date().toISOString() },\n});\n\n// JSON data\nawait store.setJSON(\"key\", { name: \"Example\", count: 42 });\n```\n\n### Read\n\n```typescript\n// Text (default)\nconst text = await store.get(\"key\");                    // string | null\n\n// Typed retrieval\nconst json = await store.get(\"key\", { type: \"json\" });  // object | null\nconst stream = await store.get(\"key\", { type: \"stream\" });\nconst blob = await store.get(\"key\", { type: \"blob\" });\nconst buffer = await store.get(\"key\", { type: \"arrayBuffer\" });\n\n// With metadata\nconst result = await store.getWithMetadata(\"key\");\n// { data: any, etag: string, metadata: object } | null\n\n// Metadata only (no data download)\nconst meta = await store.getMetadata(\"key\");\n// { etag: string, metadata: object } | null\n```\n\n### Delete\n\n```typescript\nawait store.delete(\"key\");\n```\n\n### List\n\n```typescript\nconst { blobs } = await store.list();\n// blobs: [{ etag: string, key: string }, ...]\n\n// Filter by prefix\nconst { blobs } = await store.list({ prefix: \"uploads/\" });\n```\n\n## Store Types\n\n- **Site-scoped** (`getStore()`): Persist across all deploys. Use for most cases.\n- **Deploy-scoped** (`getDeployStore()`): Tied to a specific deploy lifecycle.\n\n## Limits\n\n| Limit | Value |\n|---|---|\n| Max object size | 5 GB |\n| Store name max length | 64 bytes |\n| Key max length | 600 bytes |\n\n## Local Development\n\nLocal dev uses a sandboxed store (separate from production). For Vite-based projects, install `@netlify/vite-plugin` to enable local Blobs access. Otherwise, use `netlify dev`.\n\n**Common error**: \"The environment has not been configured to use Netlify Blobs\" — install `@netlify/vite-plugin` or run via `netlify dev`.\n"
  },
  {
    "slug": "netlify-edge-functions",
    "name": "netlify-edge-functions",
    "tagline": "Low-latency edge middleware and geolocation logic",
    "description": "Low-latency edge middleware and geolocation logic",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-edge-functions",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify Edge Functions run on a globally distributed Deno runtime, executing code at the network edge closest to each user. The skill covers the middleware pattern using context.next(), geolocation access, request/response manipulation, and when to use edge compute over standard serverless functions.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-edge-functions\ndescription: Guide for writing Netlify Edge Functions. Use when building middleware, geolocation-based logic, request/response manipulation, authentication checks, A/B testing, or any low-latency edge compute. Covers Deno runtime, context.next() middleware pattern, geolocation, and when to choose edge vs serverless.\n---\n\n# Netlify Edge Functions\n\nEdge functions run on Netlify's globally distributed edge network (Deno runtime), providing low-latency responses close to users.\n\n## Syntax\n\n```typescript\nimport type { Config, Context } from \"@netlify/edge-functions\";\n\nexport default async (req: Request, context: Context) => {\n  return new Response(\"Hello from the edge!\");\n};\n\nexport const config: Config = {\n  path: \"/hello\",\n};\n```\n\nPlace files in `netlify/edge-functions/`. Uses `.ts`, `.js`, `.tsx`, or `.jsx` extensions.\n\n## Config Object\n\n```typescript\nexport const config: Config = {\n  path: \"/api/*\",                    // URLPattern path(s)\n  excludedPath: \"/api/public/*\",     // Exclusions\n  method: [\"GET\", \"POST\"],           // HTTP methods\n  onError: \"bypass\",                 // \"fail\" (default), \"bypass\", or \"/error-page\"\n  cache: \"manual\",                   // Enable response caching\n};\n```\n\n## Middleware Pattern\n\nUse `context.next()` to invoke the next handler in the chain and optionally modify the response:\n\n```typescript\nexport default async (req: Request, context: Context) => {\n  // Before: modify request or short-circuit\n  if (!isAuthenticated(req)) {\n    return new Response(\"Unauthorized\", { status: 401 });\n  }\n\n  // Continue to origin/next function\n  const response = await context.next();\n\n  // After: modify response\n  response.headers.set(\"x-custom-header\", \"value\");\n  return response;\n};\n```\n\nReturn `undefined` to pass through without modification:\n\n```typescript\nexport default async (req: Request, context: Context) => {\n  if (!shouldHandle(req)) return; // continues to next handler\n  return new Response(\"Handled\");\n};\n```\n\n## Geolocation and IP\n\n```typescript\nexport default async (req: Request, context: Context) => {\n  const { city, country, subdivision, timezone } = context.geo;\n  const ip = context.ip;\n\n  if (country?.code === \"DE\") {\n    return Response.redirect(new URL(\"/de\", req.url));\n  }\n};\n```\n\nLocal dev with mocked geo: `netlify dev --geo=mock --country=US`\n\n## Environment Variables\n\nUse `Netlify.env` (not `process.env` or `Deno.env`):\n\n```typescript\nconst secret = Netlify.env.get(\"API_SECRET\");\n```\n\n## Module Support\n\n- **Node.js builtins**: `import { randomBytes } from \"node:crypto\";`\n- **npm packages**: Install via npm and import by name\n- **Deno modules**: URL imports (e.g., `import X from \"https://esm.sh/package\"`)\n\nFor URL imports, use an import map:\n\n```json\n// import_map.json\n{ \"imports\": { \"html-rewriter\": \"https://ghuc.cc/worker-tools/html-rewriter/index.ts\" } }\n```\n\n```toml\n# netlify.toml\n[functions]\n  deno_import_map = \"./import_map.json\"\n```\n\n## When to Use Edge vs Serverless\n\n| Use Edge Functions for | Use Serverless Functions for |\n|---|---|\n| Low-latency responses | Long-running operations (up to 15 min) |\n| Request/response manipulation | Complex Node.js dependencies |\n| Geolocation-based logic | Database-heavy operations |\n| Auth checks and redirects | Background/scheduled tasks |\n| A/B testing, personalization | Tasks needing > 512 MB memory |\n\n## Limits\n\n| Resource | Limit |\n|---|---|\n| CPU time | 50 ms per request |\n| Memory | 512 MB per deployed set |\n| Response header timeout | 40 seconds |\n| Code size | 20 MB compressed |\n"
  },
  {
    "slug": "netlify-functions",
    "name": "netlify-functions",
    "tagline": "Build serverless API endpoints and background tasks",
    "description": "Build serverless API endpoints and background tasks",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-functions",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify Functions lets you write serverless functions that run on Netlify's infrastructure. It covers the modern default export syntax, TypeScript support, path and method routing, background functions for long-running tasks, scheduled functions via cron, and streaming responses.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-functions\ndescription: Guide for writing Netlify serverless functions. Use when creating API endpoints, background processing, scheduled tasks, or any server-side logic using Netlify Functions. Covers modern syntax (default export + Config), TypeScript, path routing, background functions, scheduled functions, streaming, and method routing.\n---\n\n# Netlify Functions\n\n## Modern Syntax\n\nAlways use the modern default export + Config pattern. Never use the legacy `exports.handler` or named `handler` export.\n\n```typescript\nimport type { Context, Config } from \"@netlify/functions\";\n\nexport default async (req: Request, context: Context) => {\n  return new Response(\"Hello, world!\");\n};\n\nexport const config: Config = {\n  path: \"/api/hello\",\n};\n```\n\nThe handler receives a standard Web API `Request` and returns a `Response`. The second argument is a Netlify `Context` object.\n\n## File Structure\n\nPlace functions in `netlify/functions/`:\n\n```\nnetlify/functions/\n  _shared/           # Non-function shared code (underscore prefix)\n    auth.ts\n    db.ts\n  items.ts           # -> /.netlify/functions/items (or custom path via config)\n  users/index.ts     # -> /.netlify/functions/users\n```\n\nUse `.ts` or `.mts` extensions. If both `.ts` and `.js` exist with the same name, the `.js` file takes precedence.\n\n## Path Routing\n\nDefine custom paths via the `config` export:\n\n```typescript\nexport const config: Config = {\n  path: \"/api/items\",                    // Static path\n  // path: \"/api/items/:id\",            // Path parameter\n  // path: [\"/api/items\", \"/api/items/:id\"], // Multiple paths\n  // excludedPath: \"/api/items/special\", // Excluded paths\n  // preferStatic: true,                // Don't override static files\n};\n```\n\nWithout a `path` config, functions are available at `/.netlify/functions/{name}`. Setting a `path` makes the function available **only** at that path.\n\nAccess path parameters via `context.params`:\n\n```typescript\n// config: { path: \"/api/items/:id\" }\nexport default async (req: Request, context: Context) => {\n  const { id } = context.params;\n  // ...\n};\n```\n\n## Method Routing\n\n```typescript\nexport default async (req: Request, context: Context) => {\n  switch (req.method) {\n    case \"GET\":    return handleGet(context.params.id);\n    case \"POST\":   return handlePost(await req.json());\n    case \"DELETE\": return handleDelete(context.params.id);\n    default:       return new Response(\"Method not allowed\", { status: 405 });\n  }\n};\n\nexport const config: Config = {\n  path: \"/api/items/:id\",\n  method: [\"GET\", \"POST\", \"DELETE\"],\n};\n```\n\n## Background Functions\n\nFor long-running tasks (up to 15 minutes). The client receives an immediate `202` response; return values are ignored.\n\nName the file with a `-background` suffix:\n\n```\nnetlify/functions/process-background.ts\n```\n\nStore results externally (Netlify Blobs, database) for later retrieval.\n\n## Scheduled Functions\n\nRun on a cron schedule (UTC timezone):\n\n```typescript\nexport default async (req: Request) => {\n  const { next_run } = await req.json();\n  console.log(\"Next invocation at:\", next_run);\n};\n\nexport const config: Config = {\n  schedule: \"@hourly\", // or cron: \"0 * * * *\"\n};\n```\n\nShortcuts: `@yearly`, `@monthly`, `@weekly`, `@daily`, `@hourly`. Scheduled functions have a **30-second timeout** and only run on published deploys.\n\n## Streaming Responses\n\nReturn a `ReadableStream` body for streamed responses (up to 20 MB):\n\n```typescript\nexport default async (req: Request) => {\n  const stream = new ReadableStream({ /* ... */ });\n  return new Response(stream, {\n    headers: { \"Content-Type\": \"text/event-stream\" },\n  });\n};\n```\n\n## Context Object\n\n| Property | Description |\n|---|---|\n| `context.params` | Path parameters from config |\n| `context.geo` | `{ city, country: {code, name}, latitude, longitude, subdivision, timezone, postalCode }` |\n| `context.ip` | Client IP address |\n| `context.cookies` | `.get()`, `.set()`, `.delete()` |\n| `context.deploy` | `{ context, id, published }` |\n| `context.site` | `{ id, name, url }` |\n| `context.account.id` | Team account ID |\n| `context.requestId` | Unique request ID |\n| `context.waitUntil(promise)` | Extend execution after response is sent |\n\n## Environment Variables\n\nUse `Netlify.env` (not `process.env`) inside functions:\n\n```typescript\nconst apiKey = Netlify.env.get(\"API_KEY\");\n```\n\n## Resource Limits\n\n| Resource | Limit |\n|---|---|\n| Synchronous timeout | 60 seconds |\n| Background timeout | 15 minutes |\n| Scheduled timeout | 30 seconds |\n| Memory | 1024 MB |\n| Buffered payload | 6 MB |\n| Streamed payload | 20 MB |\n\n## Framework Considerations\n\nFrameworks with server-side capabilities (Astro, Next.js, Nuxt, SvelteKit, TanStack Start) typically generate their own serverless functions via adapters. You usually do not write raw Netlify Functions in these projects — the framework adapter handles server-side rendering and API routes. Write Netlify Functions directly when:\n\n- Using a client-side-only framework (Vite + React SPA, vanilla JS)\n- Adding background or scheduled tasks to any project\n- Building standalone API endpoints outside the framework's routing\n\nSee the **netlify-frameworks** skill for adapter setup.\n"
  },
  {
    "slug": "netlify-config",
    "name": "netlify-config",
    "tagline": "Reference for netlify.toml site configuration",
    "description": "Reference for netlify.toml site configuration",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-config",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers the complete netlify.toml configuration syntax for defining build settings, redirects, headers, deploy contexts, environment variables, functions, and edge functions. The file sits at the repository root and controls how Netlify builds and serves your site.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-config\ndescription: Reference for netlify.toml configuration. Use when configuring build settings, redirects, rewrites, headers, deploy contexts, environment variables, or any site-level configuration. Covers the complete netlify.toml syntax including redirects with splats/conditions, headers, deploy contexts, functions config, and edge functions config.\n---\n\n# Netlify Configuration (netlify.toml)\n\nPlace `netlify.toml` at the repository root (or at the base directory for monorepos).\n\n## Build Settings\n\n```toml\n[build]\n  base = \"project/\"          # Base directory (default: root)\n  command = \"npm run build\"  # Build command\n  publish = \"dist/\"          # Output directory\n```\n\n## Redirects\n\n```toml\n# Basic redirect\n[[redirects]]\nfrom = \"/old\"\nto = \"/new\"\nstatus = 301              # 301 (default), 302, 200 (rewrite), 404\n\n# SPA catch-all\n[[redirects]]\nfrom = \"/*\"\nto = \"/index.html\"\nstatus = 200\n\n# Splat (wildcard)\n[[redirects]]\nfrom = \"/blog/*\"\nto = \"/news/:splat\"\n\n# Path parameters\n[[redirects]]\nfrom = \"/users/:id\"\nto = \"/api/users/:id\"\nstatus = 200\n\n# Force (override existing files)\n[[redirects]]\nfrom = \"/app/*\"\nto = \"/index.html\"\nstatus = 200\nforce = true\n\n# Proxy to external service\n[[redirects]]\nfrom = \"/api/*\"\nto = \"https://api.example.com/:splat\"\nstatus = 200\n[redirects.headers]\n  X-Custom = \"value\"\n\n# Country/language conditions\n[[redirects]]\nfrom = \"/*\"\nto = \"/fr/:splat\"\nstatus = 200\nconditions = { Country = [\"FR\"], Language = [\"fr\"] }\n```\n\n**Rule order matters** — Netlify processes the first matching rule. Place specific rules before general ones.\n\n## Headers\n\n```toml\n[[headers]]\nfor = \"/*\"\n[headers.values]\n  X-Frame-Options = \"DENY\"\n  X-Content-Type-Options = \"nosniff\"\n\n[[headers]]\nfor = \"/assets/*\"\n[headers.values]\n  Cache-Control = \"public, max-age=31536000, immutable\"\n```\n\nHeaders apply only to files served from Netlify's CDN (not to function or edge function responses — set those in code).\n\n## Deploy Contexts\n\nOverride settings per deploy context:\n\n```toml\n[context.production]\ncommand = \"npm run build\"\nenvironment = { NODE_ENV = \"production\" }\n\n[context.deploy-preview]\ncommand = \"npm run build:preview\"\n\n[context.branch-deploy]\ncommand = \"npm run build:staging\"\n\n[context.dev]\nenvironment = { NODE_ENV = \"development\" }\n\n# Specific branch\n[context.\"staging\"]\ncommand = \"npm run build:staging\"\n```\n\n## Environment Variables\n\n```toml\n[build.environment]\nNODE_VERSION = \"20\"\n\n[context.production.environment]\nAPI_URL = \"https://api.prod.com\"\n\n[context.deploy-preview.environment]\nAPI_URL = \"https://api.staging.com\"\n```\n\n**Do not put secrets in netlify.toml** (it's committed to source control). Use the Netlify UI or CLI for sensitive values. See the **netlify-cli-and-deploy** skill for CLI environment variable management.\n\n## Functions Configuration\n\n```toml\n[functions]\ndirectory = \"netlify/functions\"   # Default\nnode_bundler = \"esbuild\"\n\n# Scheduled function\n[functions.\"cleanup\"]\nschedule = \"@daily\"\n```\n\n## Edge Functions Configuration\n\n```toml\n[[edge_functions]]\npath = \"/admin\"\nfunction = \"auth\"\n\n# Import map for Deno URL imports\n[functions]\ndeno_import_map = \"./import_map.json\"\n```\n\n## Dev Server\n\n```toml\n[dev]\ncommand = \"npm start\"       # Dev server command\nport = 8888                 # Netlify Dev port\ntargetPort = 3000           # Your app's dev server port\nframework = \"#auto\"         # \"#auto\", \"#static\", \"#custom\"\n```\n\n## Plugins\n\n```toml\n[[plugins]]\npackage = \"@netlify/plugin-lighthouse\"\n[plugins.inputs]\n  audits = [\"performance\", \"accessibility\"]\n```\n\n## Image CDN\n\n```toml\n[images]\nremote_images = [\"https://example\\\\.com/.*\"]\n```\n\nSee the **netlify-image-cdn** skill for full Image CDN usage.\n"
  },
  {
    "slug": "netlify-db",
    "name": "netlify-db",
    "tagline": "Managed Postgres with deploy preview branching",
    "description": "Managed Postgres with deploy preview branching",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-db",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify DB provisions a managed Neon Postgres database for Netlify projects without requiring a separate Neon account. It supports raw SQL via @netlify/neon, Drizzle ORM integration, and schema migrations. Each deploy preview branch gets its own isolated database branch.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-database\ndescription: Guide for using Netlify Database — the GA managed Postgres product built into Netlify. Use when a project needs any kind of dynamic, structured, or relational data. Covers provisioning via @netlify/database, Drizzle ORM (@beta) setup, migrations, preview branching, and safe production data handling. Blobs is only for file/asset storage — any dynamic data belongs in the database.\n---\n\n# Netlify Database\n\n**Netlify Database** is the managed Postgres product built into the Netlify platform. It is **GA** and is the default choice for any dynamic data in a Netlify project.\n\nInstall `@netlify/database` and Netlify auto-provisions a Postgres database for the site at deploy time. Each deploy preview gets its own isolated branch forked from production data. No Neon account, connection-string wiring, or claim flow — the database is a first-class Netlify primitive.\n\n## Database vs Blobs\n\nUse **Netlify Database** for anything dynamic:\n\n- Any user-generated or app-generated records (posts, comments, orders, sessions, audit logs)\n- Structured data that will grow, be queried, or be joined\n- Key-value-style data read or written by application code at runtime\n\nUse **Netlify Blobs** only for **file and asset storage**: images, documents, exports, uploads, cached binary artifacts. Do not use Blobs as a dynamic data store — reach for Database instead. See `netlify-blobs/SKILL.md`.\n\n## CRITICAL: Install Drizzle from the `@beta` dist-tag\n\nThe Netlify Database adapter for Drizzle ORM currently only exists on the `beta` release line of `drizzle-orm`. Install **both** `drizzle-orm` and `drizzle-kit` from the `@beta` dist-tag:\n\n```bash\nnpm install drizzle-orm@beta\nnpm install -D drizzle-kit@beta\n```\n\nThe default `latest` versions do not include the `drizzle-orm/netlify-db` adapter and will fail. If `drizzle-kit generate` errors about being outdated, or the `drizzle-orm/netlify-db` import fails to resolve, the install is missing `@beta`.\n\nThe `@beta` tag only affects the installed version — imports are written as `drizzle-orm`, `drizzle-orm/pg-core`, and `drizzle-orm/netlify-db` without modification.\n\n## CRITICAL: Use the Netlify CLI for database operations\n\nThe CLI ships a complete database surface under `netlify database` (alias: `netlify db`) that replaces hand-rolled scripts and direct API/UI work. Reach for these commands first before writing custom tooling. **Requires Netlify CLI 26.0.0+** — if a `netlify database` subcommand isn't recognized, run `npm install -g netlify-cli@latest`.\n\nFull reference is in [Netlify CLI commands](#netlify-cli-commands-for-netlify-database) below.\n\n## CRITICAL: Never apply migrations to a Netlify-hosted database\n\nThe only database you ever apply migrations to yourself is the **local development DB**. For any Netlify-hosted database — production or a deploy preview branch — **Netlify applies migrations automatically during the deploy**. Your job is to create migration files and commit them. The deploy does the rest.\n\nThis means:\n\n- Use `netlify database migrations apply` for the local DB. Do NOT run `drizzle-kit migrate` against `NETLIFY_DB_URL` in any context.\n- Do NOT run `drizzle-kit push` at all. Generate a migration and let the deploy apply it.\n- Do NOT run raw DDL (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`) via `netlify database connect`, `psql`, or any other direct connection. Schema changes go through migration files; out-of-band DDL drifts the migration history from the actual schema.\n- Do NOT export `NETLIFY_DB_URL` from a preview or production context and run a client against it. Migrations drift the moment anything touches the schema out-of-band.\n\nThe one documented exception is a **one-time data import** during a provider switch — see `references/migration-from-extension.md`. Outside that specific flow, the rule is absolute: schema changes go through migration files, migration files get applied by the deploy.\n\n## Not the legacy \"Netlify DB\" extension\n\nThe older **Netlify DB** extension (Beta) is **deprecated**. It is a separate product and must not be confused with Netlify Database. Do not recommend or install it for new projects.\n\n| | Netlify Database (GA, recommended) | Netlify DB extension (deprecated Beta) |\n|---|---|---|\n| Package | `@netlify/database` | `@netlify/neon` |\n| Env var | `NETLIFY_DB_URL` | `NETLIFY_DATABASE_URL` |\n| Setup | `netlify database init` or install the package — auto-provisioned at deploy | Historically `netlify db init` on older CLI versions, with a claim into the user's Neon account; that flow is no longer reachable from the current CLI |\n| Status | GA | Deprecated; new creation blocked as of April 2026 |\n\nIf an existing project is already using the `@netlify/neon` extension, keep it working and encourage the user to switch. See `references/legacy-extension.md` for recognition and coexistence, and `references/migration-from-extension.md` for the full switching process (also covers switching from other external Postgres providers).\n\n## Provisioning\n\nThe fastest path is `netlify database init` — an interactive setup that installs `@netlify/database`, lets the user pick Drizzle or raw SQL, writes `drizzle.config.ts` if needed, scaffolds a starter migration, applies it locally, and runs a sample query end-to-end:\n\n```bash\nnetlify database init           # interactive\nnetlify database init --yes     # accept defaults — for CI/agents\n```\n\nIf you'd rather wire things up by hand, install the package directly:\n\n```bash\nnpm install @netlify/database\n```\n\nEither way, presence of `@netlify/database` in the dependency tree triggers provisioning on the next deploy. A database can also be created manually from the Netlify UI before first deploy.\n\n## Drizzle ORM (recommended path)\n\nDrizzle is the recommended way to work with Netlify Database. Prefer Drizzle over writing raw SQL or hand-editing migration files — manual migrations are an edge case (see `references/migrations.md`).\n\n### Install\n\n```bash\nnpm install @netlify/database drizzle-orm@beta\nnpm install -D drizzle-kit@beta\n```\n\n### Schema file\n\nCreate `db/schema.ts`. Define all tables here using Drizzle's schema builder.\n\n```typescript\n// db/schema.ts\nimport { boolean, pgTable, serial, text, timestamp, varchar } from \"drizzle-orm/pg-core\";\n\nexport const items = pgTable(\"items\", {\n  id: serial().primaryKey(),\n  title: varchar({ length: 255 }).notNull(),\n  description: text(),\n  isActive: boolean(\"is_active\").notNull().default(true),\n  createdAt: timestamp(\"created_at\").defaultNow(),\n  updatedAt: timestamp(\"updated_at\").defaultNow(),\n});\n\nexport type Item = typeof items.$inferSelect;\nexport type NewItem = typeof items.$inferInsert;\n```\n\nUse snake_case strings for column names (`\"is_active\"`, `\"created_at\"`) to match Postgres conventions. Drizzle variable names can be camelCase.\n\n### Drizzle client\n\nCreate `db/index.ts`. The adapter on `drizzle-orm/netlify-db` picks the right driver for the runtime automatically.\n\n```typescript\n// db/index.ts\nimport { drizzle } from \"drizzle-orm/netlify-db\";\nimport * as schema from \"./schema\";\n\nexport const db = drizzle({ schema });\n```\n\nThe connection is configured automatically — no connection string needed. If your project uses native ESM with `.js` extensions on relative imports (`from \"./schema.js\"`), keep that style consistent here.\n\n### Drizzle Kit config\n\nCreate `drizzle.config.ts` at the project root. Set `out` to `netlify/database/migrations` — that's the directory the deploy applies migrations from:\n\n```typescript\n// drizzle.config.ts\nimport { defineConfig } from \"drizzle-kit\";\n\nexport default defineConfig({\n  dialect: \"postgresql\",\n  schema: \"./db/schema.ts\",\n  out: \"netlify/database/migrations\",\n});\n```\n\n### Package scripts\n\n```json\n{\n  \"scripts\": {\n    \"db:generate\": \"drizzle-kit generate\",\n    \"db:migrate\": \"netlify database migrations apply\"\n  }\n}\n```\n\n- `db:generate` writes a new migration file under `netlify/database/migrations/` from the current schema.\n- `db:migrate` applies pending migrations to the **local development database only**, via the CLI. Hosted migrations (preview branches, production) are applied by the deploy — never by this script.\n\n### Schema-change workflow\n\n1. Edit `db/schema.ts`.\n2. `npm run db:generate` — writes a new file into `netlify/database/migrations/`.\n3. Review the SQL.\n4. `npm run db:migrate` — applies it to the local development DB for testing.\n5. Commit the schema change and migration file together and push. The deploy applies the migration to the preview branch, then to production on publish.\n\n### Query patterns\n\n```typescript\nimport { db } from \"./db\";\nimport { items } from \"./db/schema\";\nimport { eq, desc } from \"drizzle-orm\";\n\n// Select all\nconst all = await db.select().from(items);\n\n// Select with condition\nconst [one] = await db.select().from(items).where(eq(items.id, id)).limit(1);\n\n// Ordering and limit\nconst recent = await db.select().from(items).orderBy(desc(items.createdAt)).limit(10);\n\n// Insert\nconst [created] = await db.insert(items).values({ title: \"New\" }).returning();\n\n// Update\nconst [updated] = await db.update(items).set({ title: \"Updated\" }).where(eq(items.id, id)).returning();\n\n// Delete\nawait db.delete(items).where(eq(items.id, id));\n```\n\nFull migration workflow, expand-and-contract for breaking schema changes, and production DML migrations are in `references/migrations.md`.\n\n## Native driver (when Drizzle isn't a fit)\n\nWhen a project wants raw SQL, uses a different query builder (Kysely, etc.), or has a library that needs a `pg.Pool`, use the native driver exposed by `@netlify/database`.\n\n```bash\nnpm install @netlify/database\n```\n\n```typescript\nimport { getDatabase } from \"@netlify/database\";\n\nconst db = getDatabase();\n\n// Tagged template — parameters are safely bound, not interpolated\nconst users = await db.sql`SELECT * FROM users WHERE active = ${true}`;\n\n// Insert with RETURNING\nconst [user] = await db.sql`\n  INSERT INTO users (name, email)\n  VALUES (${name}, ${email})\n  RETURNING *\n`;\n\n// Bulk insert\nconst rows = db.sql.values([\n  [\"Ada\", \"ada@example.com\"],\n  [\"Bob\", \"bob@example.com\"],\n]);\nawait db.sql`INSERT INTO users (name, email) VALUES ${rows}`;\n```\n\nTransactions go through `db.pool` so `BEGIN`, the queries, and `COMMIT`/`ROLLBACK` all run on the same connection:\n\n```typescript\nimport { getDatabase } from \"@netlify/database\";\n\nconst db = getDatabase();\nconst client = await db.pool.connect();\ntry {\n  await client.query(\"BEGIN\");\n  await client.query(\"INSERT INTO users (name, email) VALUES ($1, $2)\", [name, email]);\n  await client.query(\"INSERT INTO posts (author_id, title) VALUES ($1, $2)\", [id, title]);\n  await client.query(\"COMMIT\");\n} catch (e) {\n  await client.query(\"ROLLBACK\");\n  throw e;\n} finally {\n  client.release();\n}\n```\n\nFor third-party tools that need a raw connection string, import `getConnectionString` from `@netlify/database` — but prefer `getDatabase()` for application code.\n\n### Manual migrations\n\nWith the native driver, scaffold migration files via the CLI:\n\n```bash\nnetlify database migrations new -d \"create users table\"\n```\n\nThis creates `netlify/database/migrations/<prefix>_<slug>/migration.sql` and prompts for the numbering scheme if it can't be detected from existing files. Open the file and write the SQL. The CLI auto-detects an existing scheme; for new projects it'll ask — choose `timestamp` unless you have a reason not to.\n\nYou can also write the file by hand if you prefer. Two layouts are supported:\n\n- **Flat:** `netlify/database/migrations/<prefix>_<slug>.sql`\n- **Subdirectory:** `netlify/database/migrations/<prefix>_<slug>/migration.sql` (what `migrations new` produces)\n\nIn both, `<prefix>` is digits (timestamp like `20260417143022` or sequential like `0001`) and `<slug>` is lowercase letters, numbers, hyphens, or underscores. Files apply in lexicographic order. See `references/migrations.md`.\n\nOnce a migration has been applied to any database, never modify it — roll forward with a new migration instead.\n\n## Connection — don't reach for the env var\n\n`NETLIFY_DB_URL` is set automatically across builds, functions, edge functions, and local dev. Use the `getDatabase()` / `getConnectionString()` helpers above rather than reading it directly — only reach for the raw env var for third-party tools that demand a bare string.\n\n`NETLIFY_DB_URL` is intentionally different from the legacy extension's `NETLIFY_DATABASE_URL`. The two coexist so a project mid-migration doesn't break. Don't rename between them.\n\n## Preview branching\n\nEach deploy preview runs against its own database branch forked from production data. Schema and data changes in a preview do not affect production until the branch is merged and published. This means:\n\n- Migrations run against the preview branch first — failures fail the preview, not production.\n- Ad-hoc edits in a preview (via the Netlify UI data browser or a direct client) do **not** propagate to production. Always express production changes as migrations.\n\n## Production data changes — write a DML migration\n\nWhen a user asks for data changes that should land in production (seed data, backfills, one-off cleanups, CSV imports), **do not connect to the production database and run queries**. Generate a DML migration in `netlify/database/migrations/` (SQL `INSERT`/`UPDATE`/`DELETE`, or a Drizzle-generated equivalent). Tell the user you created a data migration and that merging to production will apply it. Let them verify in the preview branch first.\n\nIf the request is ambiguous (\"update this record\"), confirm that the user wants a production migration rather than a preview-only edit. See `references/migrations.md`.\n\n## Netlify CLI commands for Netlify Database\n\nThe CLI ships a complete database surface under `netlify database` (alias: `netlify db`). Requires CLI 26.0.0+. Most commands accept `--json` for machine-readable output — useful when scripting or reading results from an agent.\n\n### `netlify database init`\n\nInteractive bootstrap: installs `@netlify/database` (and Drizzle if chosen), writes `drizzle.config.ts`, scaffolds and applies a starter migration, and runs a sample query. Use `--yes` for non-interactive mode.\n\n### `netlify database status`\n\nReports whether the database is enabled, whether `@netlify/database` is installed, the connection string for the active branch, and the applied/pending/missing/out-of-order migrations. **Defaults to the local development database** — pass `--branch <name>` to target a remote preview or production branch.\n\n```bash\nnetlify database status                          # local\nnetlify database status --branch my-feature      # remote branch\nnetlify database status --json\nnetlify database status --show-credentials       # include username/password in connection string\n```\n\n### `netlify database connect`\n\nConnects to the database. Defaults to an interactive REPL — for agent and script use, always pass `--query` for one-shot execution:\n\n```bash\n# List tables\nnetlify database connect --query \"SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'\"\n\n# Inspect columns\nnetlify database connect --query \"SELECT column_name, data_type, is_nullable FROM information_schema.columns WHERE table_name = 'items'\"\n\n# JSON output\nnetlify database connect --query \"SELECT * FROM items LIMIT 10\" --json\n\n# Get connection details only (no query)\nnetlify database connect --json\n```\n\n**Never run DDL (`CREATE`, `ALTER`, `DROP`, `TRUNCATE`) through `netlify database connect`, `psql`, or any other direct connection.** Schema changes go through migration files — out-of-band DDL drifts the migration history from the actual schema.\n\n### `netlify database migrations new`\n\nScaffolds a new migration file as `netlify/database/migrations/<prefix>_<slug>/migration.sql`. Auto-detects the numbering scheme from existing files; prompts when undetermined.\n\n```bash\nnetlify database migrations new -d \"add users table\"\nnetlify database migrations new -d \"add users table\" --scheme timestamp\n```\n\n### `netlify database migrations apply`\n\nApplies pending migrations to the **local development database**. The CLI does **not** apply migrations to the local DB automatically when `netlify dev` starts — you run this command yourself when you're ready. Hosted databases (preview branches, production) are handled by the deploy.\n\n```bash\nnetlify database migrations apply\nnetlify database migrations apply --to <name>   # apply up to a specific migration\n```\n\n### `netlify database migrations pull`\n\nDownloads migration files from a remote branch (defaults to `production`) and overwrites local files. Useful when local migration history has drifted from production — for example, after another contributor shipped a migration you don't have locally.\n\n```bash\nnetlify database migrations pull                  # from production\nnetlify database migrations pull --branch staging # from a specific branch\nnetlify database migrations pull --branch         # from your current local git branch\nnetlify database migrations pull --force          # skip the overwrite confirmation\n```\n\n### `netlify database migrations reset`\n\nDeletes local migration files that have **not yet been applied** to the target database. Applied migrations and their data are left alone — the command can't undo something already applied.\n\nTypical use: you generated a migration, realized it was wrong, and want to start over. Run `reset`, update `db/schema.ts`, then `npm run db:generate` produces a fresh migration.\n\n```bash\nnetlify database migrations reset                  # against local dev DB\nnetlify database migrations reset --branch <name>  # against a remote branch\n```\n\n### `netlify database reset`\n\nWipes the local development database — drops all schemas and tables. Only affects the local DB; never touches preview branches or production. Use this when you want to replay all migrations from scratch.\n\n```bash\nnetlify database reset\n```\n\n## Iterating on migrations\n\nWhen a migration you generated needs to change, what you do depends on whether it's been applied anywhere yet:\n\n- **Already applied** to any database (local dev DB, a preview branch, or production) → treat as immutable. Roll forward with a new migration that applies the correction.\n- **Only on disk** (not yet applied anywhere) → don't edit the SQL or snapshot files by hand. Run `netlify database migrations reset`, update `db/schema.ts`, then re-run `npm run db:generate`. Hand-editing desyncs Drizzle Kit's internal state and tends to produce broken migrations on the next generate.\n\n## Local development\n\n`netlify dev` runs the project against a local Postgres-compatible database — no remote connection, no risk of touching production. Use `netlify database migrations apply` to apply pending migrations locally, `netlify database connect` to query, and `netlify database reset` to wipe and replay. See `references/local-dev.md`.\n\n## Common mistakes\n\n1. **Forgetting the `@beta` dist-tag.** `drizzle-orm` and `drizzle-kit` must be installed as `@beta`. The `latest` releases lack the `drizzle-orm/netlify-db` adapter.\n2. **Wrong migration output directory.** Drizzle Kit defaults to `drizzle/`. Set `out: \"netlify/database/migrations\"` in `drizzle.config.ts` �� migrations outside that directory are not applied by the deploy.\n3. **Writing raw `CREATE TABLE` when using Drizzle.** The schema file is the source of truth. Define tables in `db/schema.ts` and generate migrations.\n4. **Running `drizzle-kit migrate` or `push` against a hosted DB.** Never. The deploy applies migrations. For local, use `netlify database migrations apply` instead.\n5. **Using `netlify database connect` to change schema.** Schema changes go through migration files — never DDL through `connect` or any direct connection.\n6. **Misunderstanding `netlify database migrations reset`.** It only deletes unapplied files. It cannot undo an applied migration — for that, roll forward with a new migration.\n7. **Assuming `netlify dev` applies migrations automatically.** It doesn't — only the deploy does. Run `netlify database migrations apply` locally yourself.\n"
  },
  {
    "slug": "netlify-image-cdn",
    "name": "netlify-image-cdn",
    "tagline": "Optimize and transform images via CDN",
    "description": "Optimize and transform images via CDN",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-image-cdn",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify Image CDN is a built-in image transformation endpoint available on every Netlify site. It resizes, crops, converts formats, and adjusts quality on the fly via the `/.netlify/images` URL. No third-party service or configuration is needed for images already in your project.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-image-cdn\ndescription: Guide for using Netlify Image CDN for image optimization and transformation. Use when serving optimized images, creating responsive image markup, setting up user-uploaded image pipelines, or configuring image transformations. Covers the /.netlify/images endpoint, query parameters, remote image allowlisting, clean URL rewrites, and composing uploads with Functions + Blobs.\n---\n\n# Netlify Image CDN\n\nEvery Netlify site has a built-in `/.netlify/images` endpoint for on-the-fly image transformation. No configuration required for local images.\n\n## Basic Usage\n\n```html\n<img src=\"/.netlify/images?url=/photo.jpg&w=800&h=600&fit=cover&q=80\" />\n```\n\n## Query Parameters\n\n| Param | Description | Values |\n|---|---|---|\n| `url` | Source image path (required) | Relative path or absolute URL |\n| `w` | Width in pixels | Any positive integer |\n| `h` | Height in pixels | Any positive integer |\n| `fit` | Resize behavior | `contain` (default), `cover`, `fill` |\n| `position` | Crop alignment (with `cover`) | `center` (default), `top`, `bottom`, `left`, `right` |\n| `fm` | Output format | `avif`, `webp`, `jpg`, `png`, `gif`, `blurhash` |\n| `q` | Quality (lossy formats) | 1-100 (default: 75) |\n\nWhen `fm` is omitted, Netlify auto-negotiates the best format based on browser support (preferring `webp`, then `avif`).\n\n## Remote Image Allowlisting\n\nExternal images must be explicitly allowed in `netlify.toml`:\n\n```toml\n[images]\nremote_images = [\"https://example\\\\.com/.*\", \"https://cdn\\\\.images\\\\.com/.*\"]\n```\n\nValues are regex patterns.\n\n## Clean URL Rewrites\n\nCreate user-friendly image URLs with redirects:\n\n```toml\n# Basic optimization\n[[redirects]]\nfrom = \"/img/*\"\nto = \"/.netlify/images?url=/:splat\"\nstatus = 200\n\n# Preset: thumbnail\n[[redirects]]\nfrom = \"/img/thumb/:key\"\nto = \"/.netlify/images?url=/uploads/:key&w=150&h=150&fit=cover\"\nstatus = 200\n\n# Preset: hero\n[[redirects]]\nfrom = \"/img/hero/:key\"\nto = \"/.netlify/images?url=/uploads/:key&w=1200&h=675&fit=cover\"\nstatus = 200\n```\n\n## Caching\n\n- Transformed images are cached at the CDN edge automatically\n- Cache invalidates on new deploys\n- Set cache headers on source images to control caching:\n\n```toml\n[[headers]]\nfor = \"/uploads/*\"\n[headers.values]\nCache-Control = \"public, max-age=31536000, immutable\"\n```\n\n## User-Uploaded Images\n\nCombine **Netlify Functions** (upload handler) + **Netlify Blobs** (storage) + **Image CDN** (serving/transforming) to build a complete user-uploaded image pipeline. See [references/user-uploads.md](references/user-uploads.md) for the full pattern.\n"
  },
  {
    "slug": "netlify-frameworks",
    "name": "netlify-frameworks",
    "tagline": "Deploy web frameworks with SSR support",
    "description": "Deploy web frameworks with SSR support",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-frameworks",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers how to deploy web frameworks on Netlify, including Vite/React, Astro, TanStack Start, Next.js, Nuxt, SvelteKit, and Remix. For frameworks with SSR or API routes, it explains how adapters translate server-side code into Netlify Functions and Edge Functions automatically. Also covers environment variable prefixes, SPA redirect config, and custom 404 handling.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-frameworks\ndescription: Guide for deploying web frameworks on Netlify. Use when setting up a framework project (Vite/React, Astro, TanStack Start, Next.js, Nuxt, SvelteKit, Remix) for Netlify deployment, configuring adapters or plugins, or troubleshooting framework-specific Netlify integration. Covers what Netlify needs from each framework and how adapters handle server-side rendering.\n---\n\n# Frameworks on Netlify\n\nNetlify supports any framework that produces static output. For frameworks with server-side capabilities (SSR, API routes, middleware), an adapter or plugin translates the framework's server-side code into Netlify Functions and Edge Functions automatically.\n\n## How It Works\n\nDuring build, the framework adapter writes files to `.netlify/v1/` — functions, edge functions, redirects, and configuration. Netlify reads these to deploy the site. You do not need to write Netlify Functions manually when using a framework adapter for server-side features.\n\n## Detecting Your Framework\n\nCheck these files to determine the framework:\n\n| File | Framework |\n|---|---|\n| `astro.config.*` | Astro |\n| `next.config.*` | Next.js |\n| `nuxt.config.*` | Nuxt |\n| `vite.config.*` + `react-router` | Vite + React (SPA or Remix) |\n| `app.config.*` + `@tanstack/react-start` | TanStack Start |\n| `svelte.config.*` | SvelteKit |\n\n## Framework Reference Guides\n\nEach framework has specific adapter/plugin requirements and local dev patterns:\n\n- **Vite + React (SPA or with server routes)**: See [references/vite.md](references/vite.md)\n- **Astro**: See [references/astro.md](references/astro.md)\n- **TanStack Start**: See [references/tanstack.md](references/tanstack.md)\n- **Next.js**: See [references/nextjs.md](references/nextjs.md)\n\n## General Patterns\n\n### Client-Side Routing (SPA)\n\nFor single-page apps with client-side routing, add a catch-all redirect:\n\n```toml\n# netlify.toml\n[[redirects]]\nfrom = \"/*\"\nto = \"/index.html\"\nstatus = 200\n```\n\n### Custom 404 Pages\n\n- **Static sites**: Create a `404.html` in your publish directory. Netlify serves it automatically for unmatched routes.\n- **SSR frameworks**: Handle 404s in the framework's routing (the adapter maps this to Netlify's function routing).\n\n### Environment Variables in Frameworks\n\nEach framework exposes environment variables to client-side code differently:\n\n| Framework | Client prefix | Access pattern |\n|---|---|---|\n| Vite / React | `VITE_` | `import.meta.env.VITE_VAR` |\n| Astro | `PUBLIC_` | `import.meta.env.PUBLIC_VAR` |\n| Next.js | `NEXT_PUBLIC_` | `process.env.NEXT_PUBLIC_VAR` |\n| Nuxt | `NUXT_PUBLIC_` | `useRuntimeConfig().public.var` |\n\nServer-side code in all frameworks can access variables via `process.env.VAR` or `Netlify.env.get(\"VAR\")`.\n"
  },
  {
    "slug": "netlify-caching",
    "name": "netlify-caching",
    "tagline": "Configure CDN caching and cache purging",
    "description": "Configure CDN caching and cache purging",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-caching",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Controls how Netlify's CDN caches responses from functions, edge functions, and static assets. Covers Cache-Control header configuration, stale-while-revalidate patterns, durable cache for serverless functions, cache tag assignment, and on-demand purge via the Netlify Functions API.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-caching\ndescription: Guide for controlling caching on Netlify's CDN. Use when configuring cache headers, setting up stale-while-revalidate, implementing on-demand cache purge, or understanding Netlify's CDN caching behavior. Covers Cache-Control, Netlify-CDN-Cache-Control, cache tags, durable cache, and framework-specific caching patterns.\n---\n\n# Caching on Netlify\n\n## Default Behavior\n\n**Static assets** are cached automatically:\n- CDN: cached for 1 year, invalidated on every deploy\n- Browser: always revalidates (`max-age=0, must-revalidate`)\n- No configuration needed\n\n**Dynamic responses** (functions, edge functions, proxied) are **not cached by default**. Add cache headers explicitly.\n\n## Cache-Control Headers\n\nThree headers control caching, from most to least specific:\n\n| Header | Who sees it | Use case |\n|---|---|---|\n| `Netlify-CDN-Cache-Control` | Netlify CDN only (stripped before browser) | CDN-only caching |\n| `CDN-Cache-Control` | All CDN caches (stripped before browser) | Multi-CDN setups |\n| `Cache-Control` | Browser and all caches | General caching |\n\n### Common Patterns\n\n```typescript\n// Cache at CDN for 1 hour, browser always revalidates\nreturn new Response(body, {\n  headers: {\n    \"Netlify-CDN-Cache-Control\": \"public, s-maxage=3600, must-revalidate\",\n    \"Cache-Control\": \"public, max-age=0, must-revalidate\",\n  },\n});\n\n// Stale-while-revalidate (serve stale for 2 min while refreshing)\nreturn new Response(body, {\n  headers: {\n    \"Netlify-CDN-Cache-Control\": \"public, max-age=60, stale-while-revalidate=120\",\n  },\n});\n\n// Durable cache (shared across edge nodes, serverless functions only)\nreturn new Response(body, {\n  headers: {\n    \"Netlify-CDN-Cache-Control\": \"public, durable, max-age=60, stale-while-revalidate=120\",\n  },\n});\n```\n\n### Immutable Assets\n\nFor fingerprinted files (hash in filename):\n\n```toml\n# netlify.toml\n[[headers]]\nfor = \"/assets/*\"\n[headers.values]\nCache-Control = \"public, max-age=31536000, immutable\"\n```\n\n## Cache Tags and On-Demand Purge\n\nTag responses for selective cache invalidation:\n\n```typescript\nreturn new Response(body, {\n  headers: {\n    \"Netlify-Cache-ID\": \"product,listing\",\n    \"Netlify-CDN-Cache-Control\": \"public, s-maxage=86400\",\n  },\n});\n```\n\nPurge by tag:\n\n```typescript\nimport { purgeCache } from \"@netlify/functions\";\n\nexport default async () => {\n  await purgeCache({ tags: [\"product\"] });\n  return new Response(\"Purged\", { status: 202 });\n};\n```\n\nPurge entire site:\n\n```typescript\nawait purgeCache();\n```\n\nResponses with `Netlify-Cache-ID` are **excluded from automatic deploy-based invalidation** — they must be purged explicitly.\n\n## Cache Key Variation\n\nCustomize what creates separate cache entries:\n\n```typescript\nreturn new Response(body, {\n  headers: {\n    \"Netlify-Vary\": \"cookie=ab_test|is_logged_in\",\n    // Other options: query=param1|param2, header=X-Custom, country=us|de, language=en|fr\n  },\n});\n```\n\n## Framework-Specific Caching\n\n### Next.js\nISR uses Netlify's durable cache automatically (runtime 5.5.0+). `revalidatePath` and `revalidateTag` trigger cache purge.\n\n### Astro / Remix\nFull control over cache headers in server routes. Set `Netlify-CDN-Cache-Control` in responses for CDN caching.\n\n### Nuxt\nDefault Nitro preset handles caching. ISR-style patterns use `routeRules` with `swr` or `isr` options.\n\n### Vite SPA\nStatic assets are cached by default. API responses from Netlify Functions need explicit cache headers.\n\n## Debugging\n\nCheck the `Cache-Status` response header:\n- `HIT` — served from cache\n- `MISS` — generated fresh\n- `REVALIDATED` — stale content was revalidated\n\n## Constraints\n\n- Basic auth disables caching for the entire site\n- Durable cache is serverless functions only (not edge functions)\n- Same URL must return identical `Netlify-Vary` headers across responses\n- Deploy invalidation is scoped to deploy context (production vs preview)\n"
  },
  {
    "slug": "netlify-forms",
    "name": "netlify-forms",
    "tagline": "HTML form handling with spam filtering",
    "description": "HTML form handling with spam filtering",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-forms",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify Forms collects HTML form submissions without any server-side code. Add a `data-netlify=\"true\"` attribute to a form and Netlify handles storage, spam filtering, notifications, and API access to submissions. Works with static HTML and JavaScript frameworks via a static skeleton file.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-forms\ndescription: Guide for using Netlify Forms for HTML form handling. Use when adding contact forms, feedback forms, file upload forms, or any form that should be collected by Netlify. Covers the data-netlify attribute, spam filtering, AJAX submissions, file uploads, notifications, and the submissions API.\n---\n\n# Netlify Forms\n\nNetlify Forms collects HTML form submissions without server-side code. Form detection must be enabled in the Netlify UI (Forms section).\n\n## Basic Setup\n\nAdd `data-netlify=\"true\"` and a unique `name` to the form:\n\n```html\n<form name=\"contact\" method=\"POST\" data-netlify=\"true\">\n  <label>Name: <input type=\"text\" name=\"name\" /></label>\n  <label>Email: <input type=\"email\" name=\"email\" /></label>\n  <label>Message: <textarea name=\"message\"></textarea></label>\n  <button type=\"submit\">Send</button>\n</form>\n```\n\nNetlify's build system detects the form and injects a hidden `form-name` input automatically. For a custom success page, add `action=\"/thank-you\"` to the form tag. Use paths without `.html` extension — Netlify serves `thank-you.html` at `/thank-you` by default, and the `.html` path returns 404.\n\n## JavaScript-Rendered Forms (React, Vue, SSR Frameworks)\n\nFor forms rendered by JavaScript frameworks (React, Vue, TanStack Start, Next.js, SvelteKit, Remix, Nuxt), Netlify's build parser cannot detect the form in static HTML. You MUST create a static HTML skeleton file for build-time form detection:\n\nCreate a static HTML file in `public/` (e.g. `public/__forms.html`) containing a hidden copy of each form:\n\n```html\n<!DOCTYPE html>\n<html>\n  <body>\n    <form name=\"contact\" data-netlify=\"true\" netlify-honeypot=\"bot-field\" hidden>\n      <input type=\"hidden\" name=\"form-name\" value=\"contact\" />\n      <input type=\"text\" name=\"name\" />\n      <input type=\"email\" name=\"email\" />\n      <textarea name=\"message\"></textarea>\n      <input name=\"bot-field\" />\n    </form>\n  </body>\n</html>\n```\n\n**Rules:**\n- The form `name` must exactly match the `form-name` value used in your component's fetch call\n- Include every field your component submits — Netlify validates field names against the registered form\n- Without this file, Netlify cannot detect the form and submissions will silently fail\n\nYour component must also include a hidden `form-name` input:\n\n```jsx\n<form name=\"contact\" method=\"POST\" data-netlify=\"true\">\n  <input type=\"hidden\" name=\"form-name\" value=\"contact\" />\n  {/* ... fields ... */}\n</form>\n```\n\n## AJAX Submissions\n\n### Vanilla JavaScript\n\n```javascript\nconst form = document.querySelector(\"form\");\nform.addEventListener(\"submit\", async (e) => {\n  e.preventDefault();\n  const formData = new FormData(form);\n  await fetch(\"/\", {\n    method: \"POST\",\n    headers: { \"Content-Type\": \"application/x-www-form-urlencoded\" },\n    body: new URLSearchParams(formData).toString(),\n  });\n});\n```\n\n> **SSR frameworks (TanStack Start, Next.js, SvelteKit, Remix, Nuxt):** The `fetch` URL must target the static skeleton\n> file path (e.g. `\"/__forms.html\"`), **not** `\"/\"`. In SSR apps, `fetch(\"/\")` is intercepted by the SSR catch-all\n> function and never reaches Netlify's form processing middleware. See the React example and troubleshooting section below.\n\n### React Example\n\n```tsx\nfunction ContactForm() {\n  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {\n    e.preventDefault();\n    const formData = new FormData(e.currentTarget);\n    // For SSR apps, use the skeleton file path instead of \"/\" (e.g. \"/__forms.html\")\n    const response = await fetch(\"/__forms.html\", {\n      method: \"POST\",\n      headers: { \"Content-Type\": \"application/x-www-form-urlencoded\" },\n      body: new URLSearchParams(formData as any).toString(),\n    });\n    if (response.ok) {\n      // Show success feedback\n    }\n  };\n\n  return (\n    <form name=\"contact\" method=\"POST\" data-netlify=\"true\" onSubmit={handleSubmit}>\n      <input type=\"hidden\" name=\"form-name\" value=\"contact\" />\n      <input type=\"text\" name=\"name\" placeholder=\"Name\" />\n      <input type=\"email\" name=\"email\" placeholder=\"Email\" />\n      <textarea name=\"message\" placeholder=\"Message\" />\n      <button type=\"submit\">Send</button>\n    </form>\n  );\n}\n```\n\n> **SSR troubleshooting:** If form submissions appear to succeed (200 response) but nothing shows in the Netlify Forms\n> UI, the POST is likely being intercepted by the SSR function. Ensure `fetch` targets the skeleton file path (e.g.\n> `\"/__forms.html\"`), not `\"/\"`. The skeleton file path routes through the CDN origin where Netlify's form handler runs.\n\n## Spam Filtering\n\nNetlify uses Akismet automatically. Add a honeypot field for extra protection:\n\n```html\n<form name=\"contact\" method=\"POST\" netlify-honeypot=\"bot-field\" data-netlify=\"true\">\n  <p style=\"display:none\">\n    <label>Don't fill this out: <input name=\"bot-field\" /></label>\n  </p>\n  <!-- visible fields -->\n</form>\n```\n\nFor reCAPTCHA, add `data-netlify-recaptcha=\"true\"` to the form and include `<div data-netlify-recaptcha=\"true\"></div>` where the widget should appear.\n\n## File Uploads\n\n```html\n<form name=\"upload\" enctype=\"multipart/form-data\" data-netlify=\"true\">\n  <input type=\"text\" name=\"name\" />\n  <input type=\"file\" name=\"attachment\" />\n  <button type=\"submit\">Upload</button>\n</form>\n```\n\nFor AJAX file uploads, use `FormData` directly — do **not** set `Content-Type` (the browser sets it with the correct boundary):\n\n```javascript\nawait fetch(\"/\", { method: \"POST\", body: new FormData(form) });\n```\n\n**Limits:** 8 MB max request size, 30-second timeout, one file per input field.\n\n## Notifications\n\nConfigure in the Netlify UI under **Project configuration > Notifications**:\n\n- **Email**: Auto-sends on submission. Add `<input type=\"hidden\" name=\"subject\" value=\"Contact form\" />` for custom subject lines.\n- **Slack**: Via Netlify App for Slack.\n- **Webhooks**: Trigger external services on submission.\n\n## Submissions API\n\nAccess submissions programmatically:\n\n```\nGET /api/v1/forms/{form_id}/submissions\nAuthorization: Bearer <PERSONAL_ACCESS_TOKEN>\n```\n\nKey endpoints:\n\n| Action | Method | Path |\n|---|---|---|\n| List forms | GET | `/api/v1/sites/{site_id}/forms` |\n| Get submissions | GET | `/api/v1/forms/{form_id}/submissions` |\n| Get spam | GET | `/api/v1/forms/{form_id}/submissions?state=spam` |\n| Delete submission | DELETE | `/api/v1/submissions/{id}` |\n"
  },
  {
    "slug": "netlify-cli-and-deploy",
    "name": "netlify-cli-and-deploy",
    "tagline": "CLI setup, local dev, and deployment workflows",
    "description": "CLI setup, local dev, and deployment workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-cli-and-deploy",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers the Netlify CLI for site setup, deployment, and local development. Handles both Git-based continuous deployment and manual deploy workflows, plus environment variable management across deploy contexts.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-cli-and-deploy\ndescription: Guide for using the Netlify CLI and deploying sites. Use when installing the CLI, linking sites, deploying (Git-based or manual), managing environment variables, or running local development. Covers netlify dev, netlify deploy, Git vs non-Git workflows, and environment variable management.\n---\n\n# Netlify CLI and Deployment\n\n## Installation\n\n```bash\nnpm install -g netlify-cli    # Global (for local dev)\nnpm install netlify-cli -D    # Local (for CI)\n```\n\nRequires Node.js 18.14.0+.\n\n## Authentication\n\n```bash\nnetlify login       # Opens browser for OAuth\nnetlify status      # Check auth + linked site status\n```\n\nFor CI, set `NETLIFY_AUTH_TOKEN` environment variable instead.\n\n## Linking a Site\n\nCheck if already linked with `netlify status`. If not:\n\n```bash\n# Interactive\nnetlify link\n\n# By Git remote (if using Git)\nnetlify link --git-remote-url https://github.com/org/repo\n\n# Create new site\nnetlify init           # With Git CI/CD setup\nnetlify init --manual  # Without Git CI/CD\n```\n\nSite ID is stored in `.netlify/state.json`. Add `.netlify` to `.gitignore`.\n\n## Deploying\n\n### Git-Based Deploys (Continuous Deployment)\n\nSet up with `netlify init`. Automatic deploys trigger on push/PR:\n- Push to production branch → production deploy\n- Open PR → deploy preview with unique URL\n- Push to other branches → branch deploy\n\nBuild runs on Netlify's servers. Configure build settings in `netlify.toml`.\n\n### Manual / Local Deploys (No Git Required)\n\nBuild locally, then upload:\n\n```bash\nnetlify deploy          # Draft deploy (preview URL)\nnetlify deploy --prod   # Production deploy\nnetlify deploy --dir=dist  # Specify output directory\n```\n\nThis works without Git — useful for prototypes, local-only projects, or CI pipelines.\n\n## Local Development\n\n### Option 1: netlify dev\n\n```bash\nnetlify dev\n```\n\nWraps your framework's dev server and provides:\n- Environment variable injection\n- Functions and edge functions\n- Redirects and headers processing\n\n### Option 2: Netlify Vite Plugin (Vite-based projects)\n\nFor projects using Vite (React SPA, TanStack Start, SvelteKit, Remix), the Vite plugin provides Netlify platform primitives directly in the framework's dev server:\n\n```bash\nnpm install @netlify/vite-plugin\n```\n\n```typescript\n// vite.config.ts\nimport netlify from \"@netlify/vite-plugin\";\nexport default defineConfig({ plugins: [netlify()] });\n```\n\nThen run your normal dev command (`npm run dev`) — no `netlify dev` wrapper needed. This gives you access to Blobs, DB, Functions, and environment variables during development.\n\nSee the **netlify-frameworks** skill for framework-specific local dev guidance.\n\n## Environment Variables\n\n### CLI Management\n\n```bash\n# Set\nnetlify env:set API_KEY \"value\"\nnetlify env:set API_KEY \"value\" --secret              # Hidden from logs\nnetlify env:set API_KEY \"value\" --context production   # Context-specific\n\n# Get\nnetlify env:get API_KEY\n\n# List\nnetlify env:list\nnetlify env:list --plain > .env                        # Export to file\n\n# Import from file\nnetlify env:import .env\n\n# Delete\nnetlify env:unset API_KEY\n```\n\n### Context Scoping\n\nVariables can be scoped to deploy contexts:\n\n```bash\nnetlify env:set API_URL \"https://api.prod.com\" --context production\nnetlify env:set API_URL \"https://api.staging.com\" --context deploy-preview\nnetlify env:set DEBUG \"true\" --context branch:feature-x\n```\n\n### Accessing in Code\n\n- **Server-side (Functions)**: Use `Netlify.env.get(\"VAR\")` (preferred) or `process.env.VAR`\n- **Client-side (Vite)**: Only `VITE_`-prefixed vars via `import.meta.env.VITE_VAR`\n- **Client-side (Astro)**: Only `PUBLIC_`-prefixed vars via `import.meta.env.PUBLIC_VAR`\n\n**Never use `VITE_` or `PUBLIC_` prefix for secrets** — these are exposed to the browser.\n\n## Useful Commands\n\n| Command | Description |\n|---|---|\n| `netlify status` | Auth and site link status |\n| `netlify dev` | Start local dev server |\n| `netlify build` | Run build locally (mimics Netlify environment) |\n| `netlify deploy` | Draft deploy |\n| `netlify deploy --prod` | Production deploy |\n| `netlify dev:exec <cmd>` | Run command with Netlify environment loaded |\n| `netlify env:list` | List environment variables |\n| `netlify clone org/repo` | Clone, link, and set up in one step |\n"
  },
  {
    "slug": "netlify-ai-gateway",
    "name": "netlify-ai-gateway",
    "tagline": "Access AI models via unified gateway endpoint",
    "description": "Access AI models via unified gateway endpoint",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-ai-gateway",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Netlify AI Gateway is a proxy layer that routes requests to AI models from OpenAI, Anthropic, and Google through Netlify's infrastructure. You use standard provider SDKs but point them at Netlify's gateway URL instead of the provider's API directly. Netlify handles authentication and rate limiting, so no provider API keys are needed.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-ai-gateway\ndescription: Reference for Netlify AI Gateway — the managed proxy that routes calls to OpenAI, Anthropic, and Google Gemini SDKs without provider API keys. Use this skill any time the user wants to add AI on a Netlify site (chat, completion, reasoning, image generation, image-to-image edit/stylize), choose or change a model, wire up the OpenAI / Anthropic / @google/genai SDK, decide which provider to use for an image-gen feature (it's Gemini-only on the gateway), or debug \"model not found\" / \"API key missing\" against the gateway. Required reading before pinning a model — the gateway exposes a curated subset, not every provider model.\n---\n\n# Netlify AI Gateway\n\n> **IMPORTANT:** Only use models listed in the \"Available Models\" section below. AI Gateway does not support every model a provider offers. Using an unsupported model returns an HTTP error from the gateway.\n\n> **First-deploy requirement:** The AI Gateway only activates after a site has had at least one production deploy. Local dev (`netlify dev`, `@netlify/vite-plugin`) will NOT have gateway access on a brand-new project until you deploy to production once.\n\nNetlify AI Gateway provides access to AI models from multiple providers without managing API keys directly. It is available on all Netlify sites.\n\n## How It Works\n\nThe AI Gateway acts as a proxy — you use standard provider SDKs but point them at Netlify's gateway URL. Netlify auto-injects both the base URL and a placeholder API key for each provider, then authenticates upstream on your behalf.\n\n## Setup\n\n1. Enable AI on your site in the Netlify UI\n2. Deploy to production at least once — the gateway does not activate until then\n3. Install the provider SDK you want to use\n\nDon't set your own `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GEMINI_API_KEY`. Doing so disables Netlify's auto-injection and routes calls directly to the provider, bypassing the gateway.\n\n## Using OpenAI SDK\n\n```bash\nnpm install openai\n```\n\n```typescript\nimport OpenAI from \"openai\";\n\nconst openai = new OpenAI();\n// `OPENAI_API_KEY` and `OPENAI_BASE_URL` are auto-injected; the SDK\n// reads both from the environment, so no constructor args are needed.\n\nconst completion = await openai.chat.completions.create({\n  model: \"gpt-4o-mini\",\n  messages: [{ role: \"user\", content: \"Hello!\" }],\n});\n```\n\n## Using Anthropic SDK\n\n```bash\nnpm install @anthropic-ai/sdk\n```\n\n```typescript\nimport Anthropic from \"@anthropic-ai/sdk\";\n\nconst client = new Anthropic({\n  baseURL: Netlify.env.get(\"ANTHROPIC_BASE_URL\"),\n});\n// `ANTHROPIC_API_KEY` is auto-injected — no `apiKey` arg needed.\n\nconst message = await client.messages.create({\n  model: \"claude-sonnet-4-5-20250929\",\n  max_tokens: 1024,\n  messages: [{ role: \"user\", content: \"Hello!\" }],\n});\n```\n\n## Using Google Gemini SDK\n\nUse `@google/genai` (the unified Google GenAI SDK). The older `@google/generative-ai` package does not pick up the gateway env vars.\n\n```bash\nnpm install @google/genai\n```\n\n```typescript\nimport { GoogleGenAI } from \"@google/genai\";\n\nconst ai = new GoogleGenAI({});\n// `GEMINI_API_KEY` and `GOOGLE_GEMINI_BASE_URL` are auto-injected.\n\nconst response = await ai.models.generateContent({\n  model: \"gemini-2.5-flash\",\n  contents: \"Hello!\",\n});\n\nconst text = response.text;\n```\n\n## In a Netlify Function\n\n```typescript\nimport type { Config, Context } from \"@netlify/functions\";\nimport OpenAI from \"openai\";\n\nexport default async (req: Request, context: Context) => {\n  const { prompt } = await req.json();\n  const openai = new OpenAI();\n\n  const completion = await openai.chat.completions.create({\n    model: \"gpt-4o-mini\",\n    messages: [{ role: \"user\", content: prompt }],\n  });\n\n  return Response.json({\n    response: completion.choices[0].message.content,\n  });\n};\n\nexport const config: Config = {\n  path: \"/api/ai\",\n  method: \"POST\",\n};\n```\n\n## Image Generation\n\nImage generation on the gateway is supported through **Gemini image models** (e.g., `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gemini-3.1-flash-image-preview`). OpenAI's image models (`gpt-image-1`, `dall-e-*`) are **not** routed through the gateway.\n\nBoth text-to-image and image-to-image use the same `generateContent` method as chat — only the model and response shape differ. The image is returned as base64 `inlineData` on a content part, not as a URL.\n\n### Text-to-image\n\n```typescript\nimport { GoogleGenAI } from \"@google/genai\";\n\nconst ai = new GoogleGenAI({});\n\nconst response = await ai.models.generateContent({\n  model: \"gemini-3.1-flash-image-preview\",\n  contents: \"A watercolor portrait of a corgi wearing a beret\",\n});\n\nconst imagePart = response.candidates[0].content.parts.find(\n  (p) => p.inlineData,\n);\nconst base64 = imagePart.inlineData.data;\nconst mimeType = imagePart.inlineData.mimeType; // e.g. \"image/png\"\nconst bytes = Buffer.from(base64, \"base64\");\n```\n\n### Image-to-image (edit / stylize an input image)\n\nPass the source image as an additional content part with `inlineData`:\n\n```typescript\nconst sourceBase64 = sourceBuffer.toString(\"base64\");\n\nconst response = await ai.models.generateContent({\n  model: \"gemini-3.1-flash-image-preview\",\n  contents: [\n    { text: \"Restyle this photo as a Picasso-era cubist portrait\" },\n    { inlineData: { mimeType: \"image/png\", data: sourceBase64 } },\n  ],\n});\n```\n\nThe response shape is the same — pull `base64` and `mimeType` off the first part with `inlineData`. Most callers persist the bytes to Netlify Blobs (see `netlify-blobs/SKILL.md`) and serve a URL back to the client rather than returning multi-MB base64 in the function response.\n\n## Environment Variables\n\nAll of these are injected automatically by Netlify when AI is enabled. Setting your own value for any of the per-provider vars disables gateway routing.\n\n| Variable | Provider | Purpose |\n|---|---|---|\n| `OPENAI_BASE_URL` | OpenAI | Gateway endpoint |\n| `OPENAI_API_KEY` | OpenAI | Placeholder; satisfies the SDK's \"key required\" check |\n| `ANTHROPIC_BASE_URL` | Anthropic | Gateway endpoint |\n| `ANTHROPIC_API_KEY` | Anthropic | Placeholder; satisfies the SDK's \"key required\" check |\n| `GOOGLE_GEMINI_BASE_URL` | Google Gemini | Gateway endpoint |\n| `GEMINI_API_KEY` | Google Gemini | Placeholder; satisfies the SDK's \"key required\" check |\n| `NETLIFY_AI_GATEWAY_BASE_URL` | (universal) | Provider-agnostic gateway endpoint |\n| `NETLIFY_AI_GATEWAY_KEY` | (universal) | Provider-agnostic gateway key |\n\nThe real upstream API keys live on Netlify's side. The per-provider `*_API_KEY` vars are placeholders so the SDKs construct successfully; the gateway authenticates server-side.\n\n## Local Development\n\nWith `@netlify/vite-plugin` or `netlify dev`, gateway environment variables are injected automatically into the local process — but only after the site has had at least one production deploy. A brand-new local-only project will see \"API key missing\" or \"model not found\" errors until you deploy.\n\n## Errors & Troubleshooting\n\n- **Unsupported model:** the gateway returns an HTTP error. Check the \"Available Models\" list below — the gateway exposes a curated subset, not every model the provider offers.\n- **`OPENAI_API_KEY missing` (or equivalent) at runtime:** AI Features are disabled on the site, or the project has not had a production deploy yet.\n- **Calls succeed but skip the gateway / aren't tracked:** check you haven't set your own `*_API_KEY`. Any user-set provider key shadows Netlify's auto-injection and routes directly to the provider.\n- **Limits:** 200k-token context window. Batch inference, custom request headers, and OpenAI priority processing are not supported. Anthropic prompt caching is limited to the 5-minute ephemeral cache; Gemini explicit caching is not supported.\n\n## Available Models\n\n_Verified 2026-04-30 against the live AI Gateway providers list. The user-facing reference is https://docs.netlify.com/build/ai-gateway/overview/ — re-check before pinning a new model._\n\n### Anthropic (chat)\n- `claude-haiku-4-5`, `claude-haiku-4-5-20251001`\n- `claude-sonnet-4-0`, `claude-sonnet-4-20250514`, `claude-sonnet-4-5`, `claude-sonnet-4-5-20250929`, `claude-sonnet-4-6`\n- `claude-opus-4-1-20250805`, `claude-opus-4-20250514`, `claude-opus-4-5`, `claude-opus-4-5-20251101`, `claude-opus-4-6`, `claude-opus-4-7`\n\n### OpenAI (chat / reasoning / Codex)\n- gpt-4 family: `gpt-4o`, `gpt-4o-mini`, `gpt-4.1`, `gpt-4.1-mini`, `gpt-4.1-nano`\n- gpt-5: `gpt-5`, `gpt-5-mini`, `gpt-5-nano`, `gpt-5-pro`, `gpt-5-codex`; dated: `gpt-5-2025-08-07`, `gpt-5-mini-2025-08-07`\n- gpt-5.1: `gpt-5.1`, `gpt-5.1-codex`, `gpt-5.1-codex-max`, `gpt-5.1-codex-mini`; dated: `gpt-5.1-2025-11-13`\n- gpt-5.2: `gpt-5.2`, `gpt-5.2-codex`, `gpt-5.2-pro`; dated: `gpt-5.2-2025-12-11`, `gpt-5.2-pro-2025-12-11`\n- gpt-5.3: `gpt-5.3-chat-latest`, `gpt-5.3-codex` (no unversioned `gpt-5.3`)\n- gpt-5.4: `gpt-5.4`, `gpt-5.4-mini`, `gpt-5.4-nano`, `gpt-5.4-pro`; dated: `gpt-5.4-2026-03-05`, `gpt-5.4-mini-2026-03-17`, `gpt-5.4-nano-2026-03-17`, `gpt-5.4-pro-2026-03-05`\n- gpt-5.5: `gpt-5.5`, `gpt-5.5-pro`; dated: `gpt-5.5-2026-04-23`, `gpt-5.5-pro-2026-04-23`\n- Reasoning (o-series): `o3`, `o3-mini`, `o4-mini`\n\n### Google Gemini (chat + image)\n- Chat: `gemini-2.0-flash`, `gemini-2.0-flash-lite`, `gemini-2.5-flash`, `gemini-2.5-flash-lite`, `gemini-2.5-pro`, `gemini-3-flash-preview`, `gemini-3.1-flash-lite-preview`, `gemini-3.1-pro-preview`, `gemini-3.1-pro-preview-customtools`, `gemini-flash-latest`, `gemini-flash-lite-latest`\n- Image: `gemini-2.5-flash-image`, `gemini-3-pro-image-preview`, `gemini-3.1-flash-image-preview`\n"
  },
  {
    "slug": "netlify-deploy",
    "name": "netlify-deploy",
    "tagline": "Automated deployment workflow for Netlify sites",
    "description": "Automated deployment workflow for Netlify sites",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/context-and-tools/tree/main/skills/netlify-deploy",
    "tags": [
      "netlify",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Deploys web projects to Netlify using the Netlify CLI. Handles authentication, site linking, and both preview and production deploys. Works with static sites and framework-based projects by detecting build config from netlify.toml or package.json.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: netlify-deploy\ndescription: Deploy web projects to Netlify using the Netlify CLI (`npx netlify`). Use when the user asks to deploy, host, publish, or link a site/repo on Netlify, including preview and production deploys.\n---\n\n# Netlify Deployment Skill\n\nDeploy web projects to Netlify using the Netlify CLI with intelligent detection of project configuration and deployment context.\n\n## Overview\n\nThis skill automates Netlify deployments by:\n- Verifying Netlify CLI authentication\n- Detecting project configuration and framework\n- Linking to existing sites or creating new ones\n- Deploying to production or preview environments\n\n## Prerequisites\n\n- **Netlify CLI**: Installed via npx (no global install required)\n- **Authentication**: Netlify account with active login session\n- **Project**: Valid web project in current directory\n- **Network access**: Deployment requires outbound network calls. If sandboxing blocks these, the agent may need to request elevated permissions or prompt the user.\n- **Timeouts**: Deployments can take a few minutes. Use appropriate timeout values for CLI commands.\n\n## Authentication Pattern\n\nThe skill uses the **pre-authenticated Netlify CLI** approach:\n\n1. Check authentication status with `npx netlify status`\n2. If not authenticated, guide user through `npx netlify login`\n3. Fail gracefully if authentication cannot be established\n\nAuthentication uses either:\n- **Browser-based OAuth** (primary): `netlify login` opens browser for authentication\n- **API Key** (alternative): Set `NETLIFY_AUTH_TOKEN` environment variable\n\n## Workflow\n\n### 1. Verify Netlify CLI Authentication\n\nCheck if the user is logged into Netlify:\n\n```bash\nnpx netlify status\n```\n\n**Expected output patterns**:\n- ✅ Authenticated: Shows logged-in user email and site link status\n- ❌ Not authenticated: \"Not logged into any site\" or authentication error\n\n**If not authenticated**, guide the user:\n\n```bash\nnpx netlify login\n```\n\nThis opens a browser window for OAuth authentication. Wait for user to complete login, then verify with `netlify status` again.\n\n**Alternative: API Key authentication**\n\nIf browser authentication isn't available, users can set:\n\n```bash\nexport NETLIFY_AUTH_TOKEN=your_token_here\n```\n\nTokens can be generated at: https://app.netlify.com/user/applications#personal-access-tokens\n\n### 2. Detect Site Link Status\n\nFrom `netlify status` output, determine:\n- **Linked**: Site already connected to Netlify (shows site name/URL)\n- **Not linked**: Need to link or create site\n\n### 3. Link to Existing Site or Create New\n\n**If already linked** → Skip to step 4\n\n**If not linked**, attempt to link by Git remote:\n\n```bash\n# Check if project is Git-based\ngit remote show origin\n\n# If Git-based, extract remote URL\n# Format: https://github.com/username/repo or git@github.com:username/repo.git\n\n# Try to link by Git remote\nnpx netlify link --git-remote-url <REMOTE_URL>\n```\n\n**If link fails** (site doesn't exist on Netlify):\n\n```bash\n# Create new site interactively\nnpx netlify init\n```\n\nThis guides user through:\n1. Choosing team/account\n2. Setting site name\n3. Configuring build settings\n4. Creating netlify.toml if needed\n\n### 4. Verify Dependencies\n\nBefore deploying, ensure project dependencies are installed:\n\n```bash\n# For npm projects\nnpm install\n\n# For other package managers, detect and use appropriate command\n# yarn install, pnpm install, etc.\n```\n\n### 5. Deploy to Netlify\n\nChoose deployment type based on context:\n\n**Preview/Draft Deploy** (default for existing sites):\n\n```bash\nnpx netlify deploy\n```\n\nThis creates a deploy preview with a unique URL for testing.\n\n**Production Deploy** (for new sites or explicit production deployments):\n\n```bash\nnpx netlify deploy --prod\n```\n\nThis deploys to the live production URL.\n\n**Deployment process**:\n1. CLI detects build settings (from netlify.toml or prompts user)\n2. Builds the project locally\n3. Uploads built assets to Netlify\n4. Returns deployment URL\n\n### 6. Report Results\n\nAfter deployment, report to user:\n- **Deploy URL**: Unique URL for this deployment\n- **Site URL**: Production URL (if production deploy)\n- **Deploy logs**: Link to Netlify dashboard for logs\n- **Next steps**: Suggest `netlify open` to view site or dashboard\n\n## Handling netlify.toml\n\nIf a `netlify.toml` file exists, the CLI uses it automatically. If not, the CLI will prompt for:\n- **Build command**: e.g., `npm run build`, `next build`\n- **Publish directory**: e.g., `dist`, `build`, `.next`\n\nCommon framework defaults:\n- **Next.js**: build command `npm run build`, publish `.next`\n- **React (Vite)**: build command `npm run build`, publish `dist`\n- **Static HTML**: no build command, publish current directory\n\nThe skill should detect framework from `package.json` if possible and suggest appropriate settings.\n\n## Example Full Workflow\n\n```bash\n# 1. Check authentication\nnpx netlify status\n\n# If not authenticated:\nnpx netlify login\n\n# 2. Link site (if needed)\n# Try Git-based linking first\ngit remote show origin\nnpx netlify link --git-remote-url https://github.com/user/repo\n\n# If no site exists, create new one:\nnpx netlify init\n\n# 3. Install dependencies\nnpm install\n\n# 4. Deploy (preview for testing)\nnpx netlify deploy\n\n# 5. Deploy to production (when ready)\nnpx netlify deploy --prod\n```\n\n## Error Handling\n\nCommon issues and solutions:\n\n**\"Not logged in\"**\n→ Run `npx netlify login`\n\n**\"No site linked\"**\n→ Run `npx netlify link` or `npx netlify init`\n\n**\"Build failed\"**\n→ Check build command and publish directory in netlify.toml or CLI prompts\n→ Verify dependencies are installed\n→ Review build logs for specific errors\n\n**\"Publish directory not found\"**\n→ Verify build command ran successfully\n→ Check publish directory path is correct\n\n## Environment Variables\n\nFor secrets and configuration:\n\n1. Never commit secrets to Git\n2. Set in Netlify dashboard: Site Settings → Environment Variables\n3. Access in builds via `process.env.VARIABLE_NAME`\n\n## Tips\n\n- Use `netlify deploy` (no `--prod`) first to test before production\n- Run `netlify open` to view site in Netlify dashboard\n- Run `netlify logs` to view function logs (if using Netlify Functions)\n- Use `netlify dev` for local development with Netlify Functions\n\n## Reference\n\n- Netlify CLI Docs: https://docs.netlify.com/cli/get-started/\n- netlify.toml Reference: https://docs.netlify.com/configure-builds/file-based-configuration/\n\n## References\n\n- [CLI commands](references/cli-commands.md)\n- [Deployment patterns](references/deployment-patterns.md)\n- [netlify.toml guide](references/netlify-toml.md)\n"
  },
  {
    "slug": "netlify-functions",
    "name": "netlify-functions",
    "tagline": "Build serverless API endpoints and background tasks",
    "description": "Build serverless API endpoints and background tasks",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-functions",
    "tags": [
      "Netlify",
      "API"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Build serverless API endpoints and background tasks",
    "whenToUse": [
      "Integrating netlify functions into your development workflow.",
      "Following best practices for build serverless api endpoints and background tasks.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-functions\ndescription: Build serverless API endpoints and background tasks\n---\n\nBuild serverless API endpoints and background tasks"
  },
  {
    "slug": "netlify-edge-functions",
    "name": "netlify-edge-functions",
    "tagline": "Low-latency edge middleware and geolocation logic",
    "description": "Low-latency edge middleware and geolocation logic",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-edge-functions",
    "tags": [
      "Netlify",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Low-latency edge middleware and geolocation logic",
    "whenToUse": [
      "Integrating netlify edge functions into your development workflow.",
      "Following best practices for low-latency edge middleware and geolocation logic.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-edge-functions\ndescription: Low-latency edge middleware and geolocation logic\n---\n\nLow-latency edge middleware and geolocation logic"
  },
  {
    "slug": "netlify-blobs",
    "name": "netlify-blobs",
    "tagline": "Key-value object storage for files and data",
    "description": "Key-value object storage for files and data",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-blobs",
    "tags": [
      "Netlify",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Key-value object storage for files and data",
    "whenToUse": [
      "Integrating netlify blobs into your development workflow.",
      "Following best practices for key-value object storage for files and data.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-blobs\ndescription: Key-value object storage for files and data\n---\n\nKey-value object storage for files and data"
  },
  {
    "slug": "netlify-db",
    "name": "netlify-db",
    "tagline": "Managed Postgres with deploy preview branching",
    "description": "Managed Postgres with deploy preview branching",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-db",
    "tags": [
      "Netlify",
      "PostgreSQL",
      "Deploy"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Managed Postgres with deploy preview branching",
    "whenToUse": [
      "Integrating netlify db into your development workflow.",
      "Following best practices for managed postgres with deploy preview branching.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-db\ndescription: Managed Postgres with deploy preview branching\n---\n\nManaged Postgres with deploy preview branching"
  },
  {
    "slug": "netlify-image-cdn",
    "name": "netlify-image-cdn",
    "tagline": "Optimize and transform images via CDN",
    "description": "Optimize and transform images via CDN",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-image-cdn",
    "tags": [
      "Netlify",
      "Image"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Optimize and transform images via CDN",
    "whenToUse": [
      "Integrating netlify image cdn into your development workflow.",
      "Following best practices for optimize and transform images via cdn.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-image-cdn\ndescription: Optimize and transform images via CDN\n---\n\nOptimize and transform images via CDN"
  },
  {
    "slug": "netlify-forms",
    "name": "netlify-forms",
    "tagline": "HTML form handling with spam filtering",
    "description": "HTML form handling with spam filtering",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-forms",
    "tags": [
      "Netlify",
      "ML"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "HTML form handling with spam filtering",
    "whenToUse": [
      "Integrating netlify forms into your development workflow.",
      "Following best practices for html form handling with spam filtering.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-forms\ndescription: HTML form handling with spam filtering\n---\n\nHTML form handling with spam filtering"
  },
  {
    "slug": "netlify-frameworks",
    "name": "netlify-frameworks",
    "tagline": "Deploy web frameworks with SSR support",
    "description": "Deploy web frameworks with SSR support",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-frameworks",
    "tags": [
      "Netlify",
      "Web",
      "Deploy"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Deploy web frameworks with SSR support",
    "whenToUse": [
      "Integrating netlify frameworks into your development workflow.",
      "Following best practices for deploy web frameworks with ssr support.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-frameworks\ndescription: Deploy web frameworks with SSR support\n---\n\nDeploy web frameworks with SSR support"
  },
  {
    "slug": "netlify-caching",
    "name": "netlify-caching",
    "tagline": "Configure CDN caching and cache purging",
    "description": "Configure CDN caching and cache purging",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-caching",
    "tags": [
      "Netlify",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Configure CDN caching and cache purging",
    "whenToUse": [
      "Integrating netlify caching into your development workflow.",
      "Following best practices for configure cdn caching and cache purging.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-caching\ndescription: Configure CDN caching and cache purging\n---\n\nConfigure CDN caching and cache purging"
  },
  {
    "slug": "netlify-config",
    "name": "netlify-config",
    "tagline": "Reference for netlify.toml site configuration",
    "description": "Reference for netlify.toml site configuration",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-config",
    "tags": [
      "Netlify",
      "ML"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Reference for netlify.toml site configuration",
    "whenToUse": [
      "Integrating netlify config into your development workflow.",
      "Following best practices for reference for netlify.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-config\ndescription: Reference for netlify.toml site configuration\n---\n\nReference for netlify.toml site configuration"
  },
  {
    "slug": "netlify-cli-and-deploy",
    "name": "netlify-cli-and-deploy",
    "tagline": "CLI setup, local dev, and deployment workflows",
    "description": "CLI setup, local dev, and deployment workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-cli-and-deploy",
    "tags": [
      "Netlify",
      "CLI",
      "Deploy"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "CLI setup, local dev, and deployment workflows",
    "whenToUse": [
      "Integrating netlify cli and deploy into your development workflow.",
      "Following best practices for cli setup, local dev, and deployment workflows.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-cli-and-deploy\ndescription: CLI setup, local dev, and deployment workflows\n---\n\nCLI setup, local dev, and deployment workflows"
  },
  {
    "slug": "netlify-deploy",
    "name": "netlify-deploy",
    "tagline": "Automated deployment workflow for Netlify sites",
    "description": "Automated deployment workflow for Netlify sites",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-deploy",
    "tags": [
      "Netlify",
      "Deploy"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Automated deployment workflow for Netlify sites",
    "whenToUse": [
      "Integrating netlify deploy into your development workflow.",
      "Following best practices for automated deployment workflow for netlify sites.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-deploy\ndescription: Automated deployment workflow for Netlify sites\n---\n\nAutomated deployment workflow for Netlify sites"
  },
  {
    "slug": "netlify-ai-gateway",
    "name": "netlify-ai-gateway",
    "tagline": "Access AI models via unified gateway endpoint",
    "description": "Access AI models via unified gateway endpoint",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/netlify/skills/tree/main/skills/netlify-ai-gateway",
    "tags": [
      "Netlify",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Access AI models via unified gateway endpoint",
    "whenToUse": [
      "Integrating netlify ai gateway into your development workflow.",
      "Following best practices for access ai models via unified gateway endpoint.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: netlify-ai-gateway\ndescription: Access AI models via unified gateway endpoint\n---\n\nAccess AI models via unified gateway endpoint"
  }
];
