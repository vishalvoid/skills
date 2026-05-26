import type { ExternalSkill } from "../external-skills";

export const vercelLabsSkills: ExternalSkill[] = [
  {
    "slug": "web-design-guidelines",
    "name": "web-design-guidelines",
    "tagline": "Web design guidelines and standards",
    "description": "Web design guidelines and standards",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/web-design-guidelines",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Fetches the latest web interface guidelines from the Vercel Labs repository and checks your UI code against them. Reports violations in a terse file:line format covering accessibility, UX patterns, and design best practices.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: web-design-guidelines\ndescription: Review UI code for Web Interface Guidelines compliance. Use when asked to \"review my UI\", \"check accessibility\", \"audit design\", \"review UX\", or \"check my site against best practices\".\nmetadata:\n  author: vercel\n  version: \"1.0.0\"\n  argument-hint: <file-or-pattern>\n---\n\n# Web Interface Guidelines\n\nReview files for compliance with Web Interface Guidelines.\n\n## How It Works\n\n1. Fetch the latest guidelines from the source URL below\n2. Read the specified files (or prompt user for files/pattern)\n3. Check against all rules in the fetched guidelines\n4. Output findings in the terse `file:line` format\n\n## Guidelines Source\n\nFetch fresh guidelines before each review:\n\n```\nhttps://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md\n```\n\nUse WebFetch to retrieve the latest rules. The fetched content contains all the rules and output format instructions.\n\n## Usage\n\nWhen a user provides a file or pattern argument:\n1. Fetch guidelines from the source URL above\n2. Read the specified files\n3. Apply all rules from the fetched guidelines\n4. Output findings using the format specified in the guidelines\n\nIf no files specified, ask the user which files to review.\n"
  },
  {
    "slug": "composition-patterns",
    "name": "composition-patterns",
    "tagline": "React component composition and reusable patterns",
    "description": "React component composition and reusable patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/composition-patterns",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A set of React composition rules for structuring components without boolean prop proliferation. Covers compound components, context providers, state lifting, and React 19 API changes. Designed to keep component APIs clean as codebases grow.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: vercel-composition-patterns\ndescription:\n  React composition patterns that scale. Use when refactoring components with\n  boolean prop proliferation, building flexible component libraries, or\n  designing reusable APIs. Triggers on tasks involving compound components,\n  render props, context providers, or component architecture. Includes React 19\n  API changes.\nlicense: MIT\nmetadata:\n  author: vercel\n  version: '1.0.0'\n---\n\n# React Composition Patterns\n\nComposition patterns for building flexible, maintainable React components. Avoid\nboolean prop proliferation by using compound components, lifting state, and\ncomposing internals. These patterns make codebases easier for both humans and AI\nagents to work with as they scale.\n\n## When to Apply\n\nReference these guidelines when:\n\n- Refactoring components with many boolean props\n- Building reusable component libraries\n- Designing flexible component APIs\n- Reviewing component architecture\n- Working with compound components or context providers\n\n## Rule Categories by Priority\n\n| Priority | Category                | Impact | Prefix          |\n| -------- | ----------------------- | ------ | --------------- |\n| 1        | Component Architecture  | HIGH   | `architecture-` |\n| 2        | State Management        | MEDIUM | `state-`        |\n| 3        | Implementation Patterns | MEDIUM | `patterns-`     |\n| 4        | React 19 APIs           | MEDIUM | `react19-`      |\n\n## Quick Reference\n\n### 1. Component Architecture (HIGH)\n\n- `architecture-avoid-boolean-props` - Don't add boolean props to customize\n  behavior; use composition\n- `architecture-compound-components` - Structure complex components with shared\n  context\n\n### 2. State Management (MEDIUM)\n\n- `state-decouple-implementation` - Provider is the only place that knows how\n  state is managed\n- `state-context-interface` - Define generic interface with state, actions, meta\n  for dependency injection\n- `state-lift-state` - Move state into provider components for sibling access\n\n### 3. Implementation Patterns (MEDIUM)\n\n- `patterns-explicit-variants` - Create explicit variant components instead of\n  boolean modes\n- `patterns-children-over-render-props` - Use children for composition instead\n  of renderX props\n\n### 4. React 19 APIs (MEDIUM)\n\n> **⚠️ React 19+ only.** Skip this section if using React 18 or earlier.\n\n- `react19-no-forwardref` - Don't use `forwardRef`; use `use()` instead of `useContext()`\n\n## How to Use\n\nRead individual rule files for detailed explanations and code examples:\n\n```\nrules/architecture-avoid-boolean-props.md\nrules/state-context-interface.md\n```\n\nEach rule file contains:\n\n- Brief explanation of why it matters\n- Incorrect code example with explanation\n- Correct code example with explanation\n- Additional context and references\n\n## Full Compiled Document\n\nFor the complete guide with all rules expanded: `AGENTS.md`\n"
  },
  {
    "slug": "next-cache-components",
    "name": "next-cache-components",
    "tagline": "Caching strategies and cache-aware components in Next.js",
    "description": "Caching strategies and cache-aware components in Next.js",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/next-cache-components",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Next.js 16 Cache Components enable Partial Prerendering (PPR) by mixing static, cached, and dynamic content in a single route. The `use cache` directive replaces `unstable_cache` and lets you cache async functions, components, or entire pages with configurable lifetimes and tag-based invalidation.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: next-cache-components\ndescription: Next.js 16 Cache Components - PPR, use cache directive, cacheLife, cacheTag, updateTag\n---\n\n# Cache Components (Next.js 16+)\n\nCache Components enable Partial Prerendering (PPR) - mix static, cached, and dynamic content in a single route.\n\n## Enable Cache Components\n\n```ts\n// next.config.ts\nimport type { NextConfig } from 'next'\n\nconst nextConfig: NextConfig = {\n  cacheComponents: true,\n}\n\nexport default nextConfig\n```\n\nThis replaces the old `experimental.ppr` flag.\n\n---\n\n## Three Content Types\n\nWith Cache Components enabled, content falls into three categories:\n\n### 1. Static (Auto-Prerendered)\n\nSynchronous code, imports, pure computations - prerendered at build time:\n\n```tsx\nexport default function Page() {\n  return (\n    <header>\n      <h1>Our Blog</h1>  {/* Static - instant */}\n      <nav>...</nav>\n    </header>\n  )\n}\n```\n\n### 2. Cached (`use cache`)\n\nAsync data that doesn't need fresh fetches every request:\n\n```tsx\nasync function BlogPosts() {\n  'use cache'\n  cacheLife('hours')\n\n  const posts = await db.posts.findMany()\n  return <PostList posts={posts} />\n}\n```\n\n### 3. Dynamic (Suspense)\n\nRuntime data that must be fresh - wrap in Suspense:\n\n```tsx\nimport { Suspense } from 'react'\n\nexport default function Page() {\n  return (\n    <>\n      <BlogPosts />  {/* Cached */}\n\n      <Suspense fallback={<p>Loading...</p>}>\n        <UserPreferences />  {/* Dynamic - streams in */}\n      </Suspense>\n    </>\n  )\n}\n\nasync function UserPreferences() {\n  const theme = (await cookies()).get('theme')?.value\n  return <p>Theme: {theme}</p>\n}\n```\n\n---\n\n## `use cache` Directive\n\n### File Level\n\n```tsx\n'use cache'\n\nexport default async function Page() {\n  // Entire page is cached\n  const data = await fetchData()\n  return <div>{data}</div>\n}\n```\n\n### Component Level\n\n```tsx\nexport async function CachedComponent() {\n  'use cache'\n  const data = await fetchData()\n  return <div>{data}</div>\n}\n```\n\n### Function Level\n\n```tsx\nexport async function getData() {\n  'use cache'\n  return db.query('SELECT * FROM posts')\n}\n```\n\n---\n\n## Cache Profiles\n\n### Built-in Profiles\n\n```tsx\n'use cache'                    // Default: 5m stale, 15m revalidate\n```\n\n```tsx\n'use cache: remote'           // Platform-provided cache (Redis, KV)\n```\n\n```tsx\n'use cache: private'          // For compliance, allows runtime APIs\n```\n\n### `cacheLife()` - Custom Lifetime\n\n```tsx\nimport { cacheLife } from 'next/cache'\n\nasync function getData() {\n  'use cache'\n  cacheLife('hours')  // Built-in profile\n  return fetch('/api/data')\n}\n```\n\nBuilt-in profiles: `'default'`, `'minutes'`, `'hours'`, `'days'`, `'weeks'`, `'max'`\n\n### Inline Configuration\n\n```tsx\nasync function getData() {\n  'use cache'\n  cacheLife({\n    stale: 3600,      // 1 hour - serve stale while revalidating\n    revalidate: 7200, // 2 hours - background revalidation interval\n    expire: 86400,    // 1 day - hard expiration\n  })\n  return fetch('/api/data')\n}\n```\n\n---\n\n## Cache Invalidation\n\n### `cacheTag()` - Tag Cached Content\n\n```tsx\nimport { cacheTag } from 'next/cache'\n\nasync function getProducts() {\n  'use cache'\n  cacheTag('products')\n  return db.products.findMany()\n}\n\nasync function getProduct(id: string) {\n  'use cache'\n  cacheTag('products', `product-${id}`)\n  return db.products.findUnique({ where: { id } })\n}\n```\n\n### `updateTag()` - Immediate Invalidation\n\nUse when you need the cache refreshed within the same request:\n\n```tsx\n'use server'\n\nimport { updateTag } from 'next/cache'\n\nexport async function updateProduct(id: string, data: FormData) {\n  await db.products.update({ where: { id }, data })\n  updateTag(`product-${id}`)  // Immediate - same request sees fresh data\n}\n```\n\n### `revalidateTag()` - Background Revalidation\n\nUse for stale-while-revalidate behavior:\n\n```tsx\n'use server'\n\nimport { revalidateTag } from 'next/cache'\n\nexport async function createPost(data: FormData) {\n  await db.posts.create({ data })\n  revalidateTag('posts')  // Background - next request sees fresh data\n}\n```\n\n---\n\n## Runtime Data Constraint\n\n**Cannot** access `cookies()`, `headers()`, or `searchParams` inside `use cache`.\n\n### Solution: Pass as Arguments\n\n```tsx\n// Wrong - runtime API inside use cache\nasync function CachedProfile() {\n  'use cache'\n  const session = (await cookies()).get('session')?.value  // Error!\n  return <div>{session}</div>\n}\n\n// Correct - extract outside, pass as argument\nasync function ProfilePage() {\n  const session = (await cookies()).get('session')?.value\n  return <CachedProfile sessionId={session} />\n}\n\nasync function CachedProfile({ sessionId }: { sessionId: string }) {\n  'use cache'\n  // sessionId becomes part of cache key automatically\n  const data = await fetchUserData(sessionId)\n  return <div>{data.name}</div>\n}\n```\n\n### Exception: `use cache: private`\n\nFor compliance requirements when you can't refactor:\n\n```tsx\nasync function getData() {\n  'use cache: private'\n  const session = (await cookies()).get('session')?.value  // Allowed\n  return fetchData(session)\n}\n```\n\n---\n\n## Cache Key Generation\n\nCache keys are automatic based on:\n- **Build ID** - invalidates all caches on deploy\n- **Function ID** - hash of function location\n- **Serializable arguments** - props become part of key\n- **Closure variables** - outer scope values included\n\n```tsx\nasync function Component({ userId }: { userId: string }) {\n  const getData = async (filter: string) => {\n    'use cache'\n    // Cache key = userId (closure) + filter (argument)\n    return fetch(`/api/users/${userId}?filter=${filter}`)\n  }\n  return getData('active')\n}\n```\n\n---\n\n## Complete Example\n\n```tsx\nimport { Suspense } from 'react'\nimport { cookies } from 'next/headers'\nimport { cacheLife, cacheTag } from 'next/cache'\n\nexport default function DashboardPage() {\n  return (\n    <>\n      {/* Static shell - instant from CDN */}\n      <header><h1>Dashboard</h1></header>\n      <nav>...</nav>\n\n      {/* Cached - fast, revalidates hourly */}\n      <Stats />\n\n      {/* Dynamic - streams in with fresh data */}\n      <Suspense fallback={<NotificationsSkeleton />}>\n        <Notifications />\n      </Suspense>\n    </>\n  )\n}\n\nasync function Stats() {\n  'use cache'\n  cacheLife('hours')\n  cacheTag('dashboard-stats')\n\n  const stats = await db.stats.aggregate()\n  return <StatsDisplay stats={stats} />\n}\n\nasync function Notifications() {\n  const userId = (await cookies()).get('userId')?.value\n  const notifications = await db.notifications.findMany({\n    where: { userId, read: false }\n  })\n  return <NotificationList items={notifications} />\n}\n```\n\n---\n\n## Migration from Previous Versions\n\n| Old Config | Replacement |\n|-----------|-------------|\n| `experimental.ppr` | `cacheComponents: true` |\n| `dynamic = 'force-dynamic'` | Remove (default behavior) |\n| `dynamic = 'force-static'` | `'use cache'` + `cacheLife('max')` |\n| `revalidate = N` | `cacheLife({ revalidate: N })` |\n| `unstable_cache()` | `'use cache'` directive |\n\n### Migrating `unstable_cache` to `use cache`\n\n`unstable_cache` has been replaced by the `use cache` directive in Next.js 16. When `cacheComponents` is enabled, convert `unstable_cache` calls to `use cache` functions:\n\n**Before (`unstable_cache`):**\n\n```tsx\nimport { unstable_cache } from 'next/cache'\n\nconst getCachedUser = unstable_cache(\n  async (id) => getUser(id),\n  ['my-app-user'],\n  {\n    tags: ['users'],\n    revalidate: 60,\n  }\n)\n\nexport default async function Page({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params\n  const user = await getCachedUser(id)\n  return <div>{user.name}</div>\n}\n```\n\n**After (`use cache`):**\n\n```tsx\nimport { cacheLife, cacheTag } from 'next/cache'\n\nasync function getCachedUser(id: string) {\n  'use cache'\n  cacheTag('users')\n  cacheLife({ revalidate: 60 })\n  return getUser(id)\n}\n\nexport default async function Page({ params }: { params: Promise<{ id: string }> }) {\n  const { id } = await params\n  const user = await getCachedUser(id)\n  return <div>{user.name}</div>\n}\n```\n\nKey differences:\n- **No manual cache keys** - `use cache` generates keys automatically from function arguments and closures. The `keyParts` array from `unstable_cache` is no longer needed.\n- **Tags** - Replace `options.tags` with `cacheTag()` calls inside the function.\n- **Revalidation** - Replace `options.revalidate` with `cacheLife({ revalidate: N })` or a built-in profile like `cacheLife('minutes')`.\n- **Dynamic data** - `unstable_cache` did not support `cookies()` or `headers()` inside the callback. The same restriction applies to `use cache`, but you can use `'use cache: private'` if needed.\n\n---\n\n## Limitations\n\n- **Edge runtime not supported** - requires Node.js\n- **Static export not supported** - needs server\n- **Non-deterministic values** (`Math.random()`, `Date.now()`) execute once at build time inside `use cache`\n\nFor request-time randomness outside cache:\n\n```tsx\nimport { connection } from 'next/server'\n\nasync function DynamicContent() {\n  await connection()  // Defer to request time\n  const id = crypto.randomUUID()  // Different per request\n  return <div>{id}</div>\n}\n```\n\nSources:\n- [Cache Components Guide](https://nextjs.org/docs/app/getting-started/cache-components)\n- [use cache Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)\n- [unstable_cache (legacy)](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)\n"
  },
  {
    "slug": "react-best-practices",
    "name": "react-best-practices",
    "tagline": "React best practices and patterns",
    "description": "React best practices and patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/react-best-practices",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A set of 64 performance rules for React and Next.js, organized by impact level and covering waterfalls, bundle size, server rendering, re-renders, and JavaScript patterns. Maintained by Vercel Engineering.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: vercel-react-best-practices\ndescription: React and Next.js performance optimization guidelines from Vercel Engineering. This skill should be used when writing, reviewing, or refactoring React/Next.js code to ensure optimal performance patterns. Triggers on tasks involving React components, Next.js pages, data fetching, bundle optimization, or performance improvements.\nlicense: MIT\nmetadata:\n  author: vercel\n  version: \"1.0.0\"\n---\n\n# Vercel React Best Practices\n\nComprehensive performance optimization guide for React and Next.js applications, maintained by Vercel. Contains 70 rules across 8 categories, prioritized by impact to guide automated refactoring and code generation.\n\n## When to Apply\n\nReference these guidelines when:\n- Writing new React components or Next.js pages\n- Implementing data fetching (client or server-side)\n- Reviewing code for performance issues\n- Refactoring existing React/Next.js code\n- Optimizing bundle size or load times\n\n## Rule Categories by Priority\n\n| Priority | Category | Impact | Prefix |\n|----------|----------|--------|--------|\n| 1 | Eliminating Waterfalls | CRITICAL | `async-` |\n| 2 | Bundle Size Optimization | CRITICAL | `bundle-` |\n| 3 | Server-Side Performance | HIGH | `server-` |\n| 4 | Client-Side Data Fetching | MEDIUM-HIGH | `client-` |\n| 5 | Re-render Optimization | MEDIUM | `rerender-` |\n| 6 | Rendering Performance | MEDIUM | `rendering-` |\n| 7 | JavaScript Performance | LOW-MEDIUM | `js-` |\n| 8 | Advanced Patterns | LOW | `advanced-` |\n\n## Quick Reference\n\n### 1. Eliminating Waterfalls (CRITICAL)\n\n- `async-cheap-condition-before-await` - Check cheap sync conditions before awaiting flags or remote values\n- `async-defer-await` - Move await into branches where actually used\n- `async-parallel` - Use Promise.all() for independent operations\n- `async-dependencies` - Use better-all for partial dependencies\n- `async-api-routes` - Start promises early, await late in API routes\n- `async-suspense-boundaries` - Use Suspense to stream content\n\n### 2. Bundle Size Optimization (CRITICAL)\n\n- `bundle-barrel-imports` - Import directly, avoid barrel files\n- `bundle-analyzable-paths` - Prefer statically analyzable import and file-system paths to avoid broad bundles and traces\n- `bundle-dynamic-imports` - Use next/dynamic for heavy components\n- `bundle-defer-third-party` - Load analytics/logging after hydration\n- `bundle-conditional` - Load modules only when feature is activated\n- `bundle-preload` - Preload on hover/focus for perceived speed\n\n### 3. Server-Side Performance (HIGH)\n\n- `server-auth-actions` - Authenticate server actions like API routes\n- `server-cache-react` - Use React.cache() for per-request deduplication\n- `server-cache-lru` - Use LRU cache for cross-request caching\n- `server-dedup-props` - Avoid duplicate serialization in RSC props\n- `server-hoist-static-io` - Hoist static I/O (fonts, logos) to module level\n- `server-no-shared-module-state` - Avoid module-level mutable request state in RSC/SSR\n- `server-serialization` - Minimize data passed to client components\n- `server-parallel-fetching` - Restructure components to parallelize fetches\n- `server-parallel-nested-fetching` - Chain nested fetches per item in Promise.all\n- `server-after-nonblocking` - Use after() for non-blocking operations\n\n### 4. Client-Side Data Fetching (MEDIUM-HIGH)\n\n- `client-swr-dedup` - Use SWR for automatic request deduplication\n- `client-event-listeners` - Deduplicate global event listeners\n- `client-passive-event-listeners` - Use passive listeners for scroll\n- `client-localstorage-schema` - Version and minimize localStorage data\n\n### 5. Re-render Optimization (MEDIUM)\n\n- `rerender-defer-reads` - Don't subscribe to state only used in callbacks\n- `rerender-memo` - Extract expensive work into memoized components\n- `rerender-memo-with-default-value` - Hoist default non-primitive props\n- `rerender-dependencies` - Use primitive dependencies in effects\n- `rerender-derived-state` - Subscribe to derived booleans, not raw values\n- `rerender-derived-state-no-effect` - Derive state during render, not effects\n- `rerender-functional-setstate` - Use functional setState for stable callbacks\n- `rerender-lazy-state-init` - Pass function to useState for expensive values\n- `rerender-simple-expression-in-memo` - Avoid memo for simple primitives\n- `rerender-split-combined-hooks` - Split hooks with independent dependencies\n- `rerender-move-effect-to-event` - Put interaction logic in event handlers\n- `rerender-transitions` - Use startTransition for non-urgent updates\n- `rerender-use-deferred-value` - Defer expensive renders to keep input responsive\n- `rerender-use-ref-transient-values` - Use refs for transient frequent values\n- `rerender-no-inline-components` - Don't define components inside components\n\n### 6. Rendering Performance (MEDIUM)\n\n- `rendering-animate-svg-wrapper` - Animate div wrapper, not SVG element\n- `rendering-content-visibility` - Use content-visibility for long lists\n- `rendering-hoist-jsx` - Extract static JSX outside components\n- `rendering-svg-precision` - Reduce SVG coordinate precision\n- `rendering-hydration-no-flicker` - Use inline script for client-only data\n- `rendering-hydration-suppress-warning` - Suppress expected mismatches\n- `rendering-activity` - Use Activity component for show/hide\n- `rendering-conditional-render` - Use ternary, not && for conditionals\n- `rendering-usetransition-loading` - Prefer useTransition for loading state\n- `rendering-resource-hints` - Use React DOM resource hints for preloading\n- `rendering-script-defer-async` - Use defer or async on script tags\n\n### 7. JavaScript Performance (LOW-MEDIUM)\n\n- `js-batch-dom-css` - Group CSS changes via classes or cssText\n- `js-index-maps` - Build Map for repeated lookups\n- `js-cache-property-access` - Cache object properties in loops\n- `js-cache-function-results` - Cache function results in module-level Map\n- `js-cache-storage` - Cache localStorage/sessionStorage reads\n- `js-combine-iterations` - Combine multiple filter/map into one loop\n- `js-length-check-first` - Check array length before expensive comparison\n- `js-early-exit` - Return early from functions\n- `js-hoist-regexp` - Hoist RegExp creation outside loops\n- `js-min-max-loop` - Use loop for min/max instead of sort\n- `js-set-map-lookups` - Use Set/Map for O(1) lookups\n- `js-tosorted-immutable` - Use toSorted() for immutability\n- `js-flatmap-filter` - Use flatMap to map and filter in one pass\n- `js-request-idle-callback` - Defer non-critical work to browser idle time\n\n### 8. Advanced Patterns (LOW)\n\n- `advanced-effect-event-deps` - Don't put `useEffectEvent` results in effect deps\n- `advanced-event-handler-refs` - Store event handlers in refs\n- `advanced-init-once` - Initialize app once per app load\n- `advanced-use-latest` - useLatest for stable callback refs\n\n## How to Use\n\nRead individual rule files for detailed explanations and code examples:\n\n```\nrules/async-parallel.md\nrules/bundle-barrel-imports.md\n```\n\nEach rule file contains:\n- Brief explanation of why it matters\n- Incorrect code example with explanation\n- Correct code example with explanation\n- Additional context and references\n\n## Full Compiled Document\n\nFor the complete guide with all rules expanded: `AGENTS.md`\n"
  },
  {
    "slug": "next-upgrade",
    "name": "next-upgrade",
    "tagline": "Upgrade Next.js projects to newer versions",
    "description": "Upgrade Next.js projects to newer versions",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/next-upgrade",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Upgrades a Next.js project to a newer version by reading the current package.json, fetching the official migration guides, running the appropriate codemods, and updating dependencies. Handles incremental upgrades across major versions and flags any manual changes required by breaking API or config changes.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: next-upgrade\ndescription: Upgrade Next.js to the latest version following official migration guides and codemods\nargument-hint: \"[target-version]\"\n---\n\n# Upgrade Next.js\n\nUpgrade the current project to the latest Next.js version following official migration guides.\n\n## Instructions\n\n1. **Detect current version**: Read `package.json` to identify the current Next.js version and related dependencies (React, React DOM, etc.)\n\n2. **Fetch the latest upgrade guide**: Use WebFetch to get the official upgrade documentation:\n   - Codemods: https://nextjs.org/docs/app/guides/upgrading/codemods\n   - Version-specific guides (adjust version as needed):\n     - https://nextjs.org/docs/app/guides/upgrading/version-16 \n     - https://nextjs.org/docs/app/guides/upgrading/version-15\n     - https://nextjs.org/docs/app/guides/upgrading/version-14\n\n3. **Determine upgrade path**: Based on current version, identify which migration steps apply. For major version jumps, upgrade incrementally (e.g., 13 → 14 → 15).\n\n4. **Run codemods first**: Next.js provides codemods to automate breaking changes:\n   ```bash\n   npx @next/codemod@latest <transform> <path>\n   ```\n   Common transforms:\n   - `next-async-request-api` - Updates async Request APIs (v15)\n   - `next-request-geo-ip` - Migrates geo/ip properties (v15)\n   - `next-dynamic-access-named-export` - Transforms dynamic imports (v15)\n\n5. **Update dependencies**: Upgrade Next.js and peer dependencies together:\n   ```bash\n   npm install next@latest react@latest react-dom@latest\n   ```\n\n6. **Review breaking changes**: Check the upgrade guide for manual changes needed:\n   - API changes (e.g., async params in v15)\n   - Configuration changes in `next.config.js`\n   - Deprecated features being removed\n\n7. **Update TypeScript types** (if applicable):\n   ```bash\n   npm install @types/react@latest @types/react-dom@latest\n   ```\n\n8. **Test the upgrade**:\n   - Run `npm run build` to check for build errors\n   - Run `npm run dev` and test key functionality\n"
  },
  {
    "slug": "react-native-skills",
    "name": "react-native-skills",
    "tagline": "React Native best practices and performance guidelines",
    "description": "React Native best practices and performance guidelines",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/react-native-skills",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A collection of best practices for React Native and Expo apps, covering list performance, animations, navigation, UI patterns, and monorepo configuration. Rules are organized by priority and reference specific APIs like FlashList, Reanimated, and Expo Image.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: vercel-react-native-skills\ndescription:\n  React Native and Expo best practices for building performant mobile apps. Use\n  when building React Native components, optimizing list performance,\n  implementing animations, or working with native modules. Triggers on tasks\n  involving React Native, Expo, mobile performance, or native platform APIs.\nlicense: MIT\nmetadata:\n  author: vercel\n  version: '1.0.0'\n---\n\n# React Native Skills\n\nComprehensive best practices for React Native and Expo applications. Contains\nrules across multiple categories covering performance, animations, UI patterns,\nand platform-specific optimizations.\n\n## When to Apply\n\nReference these guidelines when:\n\n- Building React Native or Expo apps\n- Optimizing list and scroll performance\n- Implementing animations with Reanimated\n- Working with images and media\n- Configuring native modules or fonts\n- Structuring monorepo projects with native dependencies\n\n## Rule Categories by Priority\n\n| Priority | Category         | Impact   | Prefix               |\n| -------- | ---------------- | -------- | -------------------- |\n| 1        | List Performance | CRITICAL | `list-performance-`  |\n| 2        | Animation        | HIGH     | `animation-`         |\n| 3        | Navigation       | HIGH     | `navigation-`        |\n| 4        | UI Patterns      | HIGH     | `ui-`                |\n| 5        | State Management | MEDIUM   | `react-state-`       |\n| 6        | Rendering        | MEDIUM   | `rendering-`         |\n| 7        | Monorepo         | MEDIUM   | `monorepo-`          |\n| 8        | Configuration    | LOW      | `fonts-`, `imports-` |\n\n## Quick Reference\n\n### 1. List Performance (CRITICAL)\n\n- `list-performance-virtualize` - Use FlashList for large lists\n- `list-performance-item-memo` - Memoize list item components\n- `list-performance-callbacks` - Stabilize callback references\n- `list-performance-inline-objects` - Avoid inline style objects\n- `list-performance-function-references` - Extract functions outside render\n- `list-performance-images` - Optimize images in lists\n- `list-performance-item-expensive` - Move expensive work outside items\n- `list-performance-item-types` - Use item types for heterogeneous lists\n\n### 2. Animation (HIGH)\n\n- `animation-gpu-properties` - Animate only transform and opacity\n- `animation-derived-value` - Use useDerivedValue for computed animations\n- `animation-gesture-detector-press` - Use Gesture.Tap instead of Pressable\n\n### 3. Navigation (HIGH)\n\n- `navigation-native-navigators` - Use native stack and native tabs over JS navigators\n\n### 4. UI Patterns (HIGH)\n\n- `ui-expo-image` - Use expo-image for all images\n- `ui-image-gallery` - Use Galeria for image lightboxes\n- `ui-pressable` - Use Pressable over TouchableOpacity\n- `ui-safe-area-scroll` - Handle safe areas in ScrollViews\n- `ui-scrollview-content-inset` - Use contentInset for headers\n- `ui-menus` - Use native context menus\n- `ui-native-modals` - Use native modals when possible\n- `ui-measure-views` - Use onLayout, not measure()\n- `ui-styling` - Use StyleSheet.create or Nativewind\n\n### 5. State Management (MEDIUM)\n\n- `react-state-minimize` - Minimize state subscriptions\n- `react-state-dispatcher` - Use dispatcher pattern for callbacks\n- `react-state-fallback` - Show fallback on first render\n- `react-compiler-destructure-functions` - Destructure for React Compiler\n- `react-compiler-reanimated-shared-values` - Handle shared values with compiler\n\n### 6. Rendering (MEDIUM)\n\n- `rendering-text-in-text-component` - Wrap text in Text components\n- `rendering-no-falsy-and` - Avoid falsy && for conditional rendering\n\n### 7. Monorepo (MEDIUM)\n\n- `monorepo-native-deps-in-app` - Keep native dependencies in app package\n- `monorepo-single-dependency-versions` - Use single versions across packages\n\n### 8. Configuration (LOW)\n\n- `fonts-config-plugin` - Use config plugins for custom fonts\n- `imports-design-system-folder` - Organize design system imports\n- `js-hoist-intl` - Hoist Intl object creation\n\n## How to Use\n\nRead individual rule files for detailed explanations and code examples:\n\n```\nrules/list-performance-virtualize.md\nrules/animation-gpu-properties.md\n```\n\nEach rule file contains:\n\n- Brief explanation of why it matters\n- Incorrect code example with explanation\n- Correct code example with explanation\n- Additional context and references\n\n## Full Compiled Document\n\nFor the complete guide with all rules expanded: `AGENTS.md`\n"
  },
  {
    "slug": "next-best-practices",
    "name": "next-best-practices",
    "tagline": "Next.js best practices and recommended patterns",
    "description": "Next.js best practices and recommended patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/next-skills/tree/main/skills/next-best-practices",
    "tags": [
      "vercel-labs",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A skill for writing and reviewing Next.js code across the full surface area of the framework. Covers file conventions, RSC boundaries, async API changes in Next.js 15+, metadata, image and font optimization, error handling, route handlers, and bundling.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: next-best-practices\ndescription: Next.js best practices - file conventions, RSC boundaries, data patterns, async APIs, metadata, error handling, route handlers, image/font optimization, bundling\nuser-invocable: false\n---\n\n# Next.js Best Practices\n\nApply these rules when writing or reviewing Next.js code.\n\n## File Conventions\n\nSee [file-conventions.md](./file-conventions.md) for:\n- Project structure and special files\n- Route segments (dynamic, catch-all, groups)\n- Parallel and intercepting routes\n- Middleware rename in v16 (middleware → proxy)\n\n## RSC Boundaries\n\nDetect invalid React Server Component patterns.\n\nSee [rsc-boundaries.md](./rsc-boundaries.md) for:\n- Async client component detection (invalid)\n- Non-serializable props detection\n- Server Action exceptions\n\n## Async Patterns\n\nNext.js 15+ async API changes.\n\nSee [async-patterns.md](./async-patterns.md) for:\n- Async `params` and `searchParams`\n- Async `cookies()` and `headers()`\n- Migration codemod\n\n## Runtime Selection\n\nSee [runtime-selection.md](./runtime-selection.md) for:\n- Default to Node.js runtime\n- When Edge runtime is appropriate\n\n## Directives\n\nSee [directives.md](./directives.md) for:\n- `'use client'`, `'use server'` (React)\n- `'use cache'` (Next.js)\n\n## Functions\n\nSee [functions.md](./functions.md) for:\n- Navigation hooks: `useRouter`, `usePathname`, `useSearchParams`, `useParams`\n- Server functions: `cookies`, `headers`, `draftMode`, `after`\n- Generate functions: `generateStaticParams`, `generateMetadata`\n\n## Error Handling\n\nSee [error-handling.md](./error-handling.md) for:\n- `error.tsx`, `global-error.tsx`, `not-found.tsx`\n- `redirect`, `permanentRedirect`, `notFound`\n- `forbidden`, `unauthorized` (auth errors)\n- `unstable_rethrow` for catch blocks\n\n## Data Patterns\n\nSee [data-patterns.md](./data-patterns.md) for:\n- Server Components vs Server Actions vs Route Handlers\n- Avoiding data waterfalls (`Promise.all`, Suspense, preload)\n- Client component data fetching\n\n## Route Handlers\n\nSee [route-handlers.md](./route-handlers.md) for:\n- `route.ts` basics\n- GET handler conflicts with `page.tsx`\n- Environment behavior (no React DOM)\n- When to use vs Server Actions\n\n## Metadata & OG Images\n\nSee [metadata.md](./metadata.md) for:\n- Static and dynamic metadata\n- `generateMetadata` function\n- OG image generation with `next/og`\n- File-based metadata conventions\n\n## Image Optimization\n\nSee [image.md](./image.md) for:\n- Always use `next/image` over `<img>`\n- Remote images configuration\n- Responsive `sizes` attribute\n- Blur placeholders\n- Priority loading for LCP\n\n## Font Optimization\n\nSee [font.md](./font.md) for:\n- `next/font` setup\n- Google Fonts, local fonts\n- Tailwind CSS integration\n- Preloading subsets\n\n## Bundling\n\nSee [bundling.md](./bundling.md) for:\n- Server-incompatible packages\n- CSS imports (not link tags)\n- Polyfills (already included)\n- ESM/CommonJS issues\n- Bundle analysis\n\n## Scripts\n\nSee [scripts.md](./scripts.md) for:\n- `next/script` vs native script tags\n- Inline scripts need `id`\n- Loading strategies\n- Google Analytics with `@next/third-parties`\n\n## Hydration Errors\n\nSee [hydration-error.md](./hydration-error.md) for:\n- Common causes (browser APIs, dates, invalid HTML)\n- Debugging with error overlay\n- Fixes for each cause\n\n## Suspense Boundaries\n\nSee [suspense-boundaries.md](./suspense-boundaries.md) for:\n- CSR bailout with `useSearchParams` and `usePathname`\n- Which hooks require Suspense boundaries\n\n## Parallel & Intercepting Routes\n\nSee [parallel-routes.md](./parallel-routes.md) for:\n- Modal patterns with `@slot` and `(.)` interceptors\n- `default.tsx` for fallbacks\n- Closing modals correctly with `router.back()`\n\n## Self-Hosting\n\nSee [self-hosting.md](./self-hosting.md) for:\n- `output: 'standalone'` for Docker\n- Cache handlers for multi-instance ISR\n- What works vs needs extra setup\n\n## Debug Tricks\n\nSee [debug-tricks.md](./debug-tricks.md) for:\n- MCP endpoint for AI-assisted debugging\n- Rebuild specific routes with `--debug-build-paths`\n\n"
  },
  {
    "slug": "react-best-practices",
    "name": "react-best-practices",
    "tagline": "React best practices and patterns",
    "description": "React best practices and patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/react-best-practices",
    "tags": [
      "Vercel",
      "React"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "React best practices and patterns",
    "whenToUse": [
      "Integrating react best practices into your development workflow.",
      "Following best practices for react best practices and patterns.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: react-best-practices\ndescription: React best practices and patterns\n---\n\nReact best practices and patterns"
  },
  {
    "slug": "web-design-guidelines",
    "name": "web-design-guidelines",
    "tagline": "Web design guidelines and standards",
    "description": "Web design guidelines and standards",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/web-design-guidelines",
    "tags": [
      "Vercel",
      "Web",
      "Design"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Web design guidelines and standards",
    "whenToUse": [
      "Integrating web design guidelines into your development workflow.",
      "Following best practices for web design guidelines and standards.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: web-design-guidelines\ndescription: Web design guidelines and standards\n---\n\nWeb design guidelines and standards"
  },
  {
    "slug": "composition-patterns",
    "name": "composition-patterns",
    "tagline": "React component composition and reusable patterns",
    "description": "React component composition and reusable patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/composition-patterns",
    "tags": [
      "Vercel",
      "React"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "React component composition and reusable patterns",
    "whenToUse": [
      "Integrating composition patterns into your development workflow.",
      "Following best practices for react component composition and reusable patterns.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: composition-patterns\ndescription: React component composition and reusable patterns\n---\n\nReact component composition and reusable patterns"
  },
  {
    "slug": "next-best-practices",
    "name": "next-best-practices",
    "tagline": "Next.js best practices and recommended patterns",
    "description": "Next.js best practices and recommended patterns",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/next-best-practices",
    "tags": [
      "Vercel",
      "Next.js"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Next.js best practices and recommended patterns",
    "whenToUse": [
      "Integrating next best practices into your development workflow.",
      "Following best practices for next.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: next-best-practices\ndescription: Next.js best practices and recommended patterns\n---\n\nNext.js best practices and recommended patterns"
  },
  {
    "slug": "next-cache-components",
    "name": "next-cache-components",
    "tagline": "Caching strategies and cache-aware components in Next.js",
    "description": "Caching strategies and cache-aware components in Next.js",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/next-cache-components",
    "tags": [
      "Vercel",
      "Next.js"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Caching strategies and cache-aware components in Next.js",
    "whenToUse": [
      "Integrating next cache components into your development workflow.",
      "Following best practices for caching strategies and cache-aware components in next.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: next-cache-components\ndescription: Caching strategies and cache-aware components in Next.js\n---\n\nCaching strategies and cache-aware components in Next.js"
  },
  {
    "slug": "next-upgrade",
    "name": "next-upgrade",
    "tagline": "Upgrade Next.js projects to newer versions",
    "description": "Upgrade Next.js projects to newer versions",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/next-upgrade",
    "tags": [
      "Vercel",
      "Next.js"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Upgrade Next.js projects to newer versions",
    "whenToUse": [
      "Integrating next upgrade into your development workflow.",
      "Following best practices for upgrade next.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: next-upgrade\ndescription: Upgrade Next.js projects to newer versions\n---\n\nUpgrade Next.js projects to newer versions"
  },
  {
    "slug": "react-native-skills",
    "name": "react-native-skills",
    "tagline": "React Native best practices and performance guidelines",
    "description": "React Native best practices and performance guidelines",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/vercel-labs/skills/tree/main/skills/react-native-skills",
    "tags": [
      "Vercel",
      "React",
      "Native"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "React Native best practices and performance guidelines",
    "whenToUse": [
      "Integrating react native skills into your development workflow.",
      "Following best practices for react native best practices and performance guidelines.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: react-native-skills\ndescription: React Native best practices and performance guidelines\n---\n\nReact Native best practices and performance guidelines"
  }
];
