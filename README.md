# skills.vishalvoid.com

**The largest curated directory of official MCP servers and AI agent skills.**

Browse 500+ MCP (Model Context Protocol) skills published by the official dev teams of Anthropic, Stripe, Supabase, Cloudflare, Google, Microsoft and 35+ providers. Works with Claude, Cursor, GitHub Copilot, Gemini and any MCP-compatible AI agent. Free and open source.

🌐 **[skills.vishalvoid.com](https://skills.vishalvoid.com)**

---

## What is this?

`skills.vishalvoid.com` is a public directory of **official** MCP server skills — tools that extend AI agents with real-world capabilities. Each skill is:

- **Official** — published or maintained by the vendor's own engineering team
- **MCP-compatible** — works with any agent that supports the Model Context Protocol
- **Agent-agnostic** — Claude, Cursor, GitHub Copilot, Gemini, and more

Unlike community lists, this directory only includes skills where the provider themselves ships and maintains the MCP integration.

---

## Providers (35+)

| Provider | ID | Category |
|----------|----|----------|
| Anthropic | `anthropic` | Technical & Development |
| Stripe | `stripe` | Enterprise |
| Supabase | `supabase` | Technical & Development |
| Cloudflare | `cloudflare` | Enterprise |
| Google Gemini | `google-gemini` | Technical & Development |
| Google Workspace | `googleworkspace` | Office & Documents |
| Microsoft | `microsoft` | Enterprise |
| Vercel | `vercel-labs` | Technical & Development |
| Hugging Face | `huggingface` | Technical & Development |
| Sentry | `getsentry` | Technical & Development |
| Neon | `neondatabase` | Technical & Development |
| HashiCorp | `hashicorp` | Enterprise |
| Auth0 | `auth0` | Enterprise |
| Brave | `brave` | Technical & Development |
| Browserbase | `browserbase` | Technical & Development |
| Coinbase | `coinbase` | Enterprise |
| Composio | `composiohq` | Enterprise |
| Firecrawl | `firecrawl` | Technical & Development |
| Replicate | `replicate` | Creative & Design |
| Sanity | `sanity-io` | Creative & Design |
| Angular | `angular` | Technical & Development |
| Expo | `expo` | Technical & Development |
| Netlify | `netlify` | Technical & Development |
| Tinybird | `tinybirdco` | Technical & Development |
| Courier | `trycourier` | Enterprise |
| VoltAgent | `voltagent` | Technical & Development |
| Trail of Bits | `trailofbits` | Enterprise |
| Venice AI | `veniceai` | Creative & Design |
| Better Auth | `better-auth` | Enterprise |
| Callstack | `callstack` | Technical & Development |
| Clickhouse | `clickhouse` | Technical & Development |
| CodeRabbit | `coderabbitai` | Technical & Development |
| Remotion | `remotion-dev` | Creative & Design |
| Typefully | `typefully` | Office & Documents |

---

## Tech Stack

- **Framework**: Next.js 16 App Router (server components, `generateStaticParams`)
- **Styling**: Tailwind CSS with dark mode
- **Fonts**: Geist Sans + Geist Mono (Google Fonts)
- **Deployment**: Vercel (edge-optimized)
- **Language**: TypeScript

### Key files

```
app/
  layout.tsx           # Root metadata, JSON-LD schema, favicon
  page.tsx             # Homepage (hero + featured providers + directory)
  skills/
    page.tsx           # Directory listing (/skills)
    [provider]/
      page.tsx         # Provider page (/skills/{provider})
      [slug]/
        page.tsx       # Skill detail page (/skills/{provider}/{slug})
  sitemap.ts           # Dynamic sitemap (all providers + all skills)
  robots.ts            # Robots.txt with sitemap link
  opengraph-image.tsx  # Root OG image
components/
  Header.tsx           # Sticky nav with logo + search + theme toggle
  SkillsClient.tsx     # Client-side searchable skills grid
  AITerminal.tsx       # Animated terminal demo on homepage
  SearchBar.tsx        # Search input with keyboard shortcut
  CodeBlock.tsx        # Syntax-highlighted code block
  MarkdownViewer.tsx   # Renders SKILL.md content on detail pages
data/
  external-skills.ts   # All skills, provider names, slugs, categories
  external/            # Per-provider skill arrays (one file per provider)
public/
  skills-icon.svg      # Favicon and header logo
  llms.txt             # AI-readable site description for LLM crawlers
```

---

## URL Structure

```
/                          → Homepage
/skills                    → Full directory (searchable, filterable)
/skills/{provider}         → All skills from a provider
/skills/{provider}/{slug}  → Individual skill detail page
/sitemap.xml               → XML sitemap (auto-generated)
/robots.txt                → Robots.txt
/llms.txt                  → AI-readable site description
```

### Examples

```
/skills/anthropic
/skills/stripe
/skills/supabase/supabase-database
/skills/stripe/stripe-payments
/skills/cloudflare/cloudflare-workers
```

---

## Development

```bash
# Install dependencies
npm install

# Run dev server (http://localhost:3000)
npm run dev

# Type check
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start
```

---

## Adding a New Provider & Skills

### 1. Create the data file

Create `data/external/{provider-id}.ts`:

```typescript
import type { ExternalSkill } from "../external-skills";

export const myProviderSkills: ExternalSkill[] = [
  {
    slug: "my-skill-slug",
    name: "My Skill Name",
    tagline: "Short one-liner description (~60 chars)",
    description: "Full 2-3 sentence description for search engines and the detail page.",
    category: "Technical & Development",
    sourceUrl: "https://github.com/org/repo",
    tags: ["tag1", "tag2"],
    difficulty: "Beginner",
    whatItDoes: "Detailed explanation of what the skill can do.",
    whenToUse: [
      "Use case 1 — describe a specific scenario",
      "Use case 2 — describe another scenario",
    ],
    skillMd: `# Skill Name

Brief intro line.

## Installation

\`\`\`bash
npx @org/package
\`\`\`

## Usage

...
`,
  },
];
```

### 2. Register in `data/external-skills.ts`

```typescript
// Add import
import { myProviderSkills } from "./external/my-provider";

// Add to externalSkills array
export const externalSkills = [
  // ...existing...
  ...myProviderSkills,
];

// Add to PROVIDER_NAMES
export const PROVIDER_NAMES = {
  // ...existing...
  "my-provider": "My Provider",
};

// Add to PROVIDER_SLUGS
export const PROVIDER_SLUGS = [
  // ...existing...
  { id: "my-provider", slugs: myProviderSkills.map((s) => s.slug) },
];
```

### 3. Done

Pages at `/skills/my-provider` and `/skills/my-provider/{slug}` are auto-generated.

---

## Skill Type Reference

```typescript
interface ExternalSkill {
  slug: string;       // Unique URL segment (kebab-case, unique across all providers)
  name: string;       // Display name in headings
  tagline: string;    // One-line summary for card listings
  description: string;// 2-3 sentences for metadata and detail page intro
  category:           // Exactly one of:
    | "Creative & Design"
    | "Technical & Development"
    | "Office & Documents"
    | "Enterprise";
  sourceUrl: string;  // Link to GitHub repo or official docs
  tags: string[];     // Searchable tags used in directory filter
  difficulty:
    | "Beginner"
    | "Intermediate"
    | "Advanced";
  whatItDoes: string; // Paragraph explaining capabilities shown on detail page
  whenToUse: string[];// Bullet list of use cases
  skillMd: string;    // Raw markdown for SKILL.md tab (install, config, usage)
}
```

---

## SEO

Every page has full metadata coverage:

| Signal | Where |
|--------|-------|
| `<title>` + `<meta description>` | All pages via Next.js `metadata` export |
| `<meta keywords>` | All pages (MCP/agent-focused per page) |
| Open Graph (`og:title`, `og:description`, `og:image`) | All pages |
| Twitter Card (`summary_large_image`) | All pages |
| `<link rel="canonical">` | All pages |
| JSON-LD `WebSite` + `SearchAction` | Root layout |
| XML sitemap | `/sitemap.xml` — all providers + all skills |
| `robots.txt` | `/robots.txt` — full crawl allowed |
| `llms.txt` | `/llms.txt` — AI crawler readability |
| OG images | Root + `/skills` directory page |

### Target keywords

- `mcp servers` · `mcp server directory` · `official mcp servers`
- `ai agent skills` · `model context protocol`
- `claude mcp` · `cursor mcp` · `copilot mcp` · `gemini mcp`
- `anthropic mcp` · `stripe mcp` · `supabase mcp` · `cloudflare mcp`
- `ai developer tools` · `mcp tools`

---

## Contributing

Open a PR with a new file in `data/external/` following the pattern above. Please only add skills that are:

1. Officially published by the vendor's engineering team
2. Actively maintained
3. Actually MCP-compatible

---

## License

MIT — free to use, fork, and build on.

---

Built by [Vishal Kumar Singh](https://vishalvoid.com) · [@vishalvoid](https://github.com/vishalvoid) · [twitter.com/vishalvoid](https://twitter.com/vishalvoid)
