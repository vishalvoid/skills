import type { ExternalSkill } from "../external-skills";

export const firecrawlSkills: ExternalSkill[] = [
  {
    "slug": "firecrawl-build-interact",
    "name": "firecrawl-build-interact",
    "tagline": "Multi-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation",
    "description": "Multi-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/firecrawl/skills/tree/main/skills/firecrawl-build-interact",
    "tags": [
      "firecrawl",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Builds Firecrawl `/interact` flows inside product code when plain `/scrape` is not enough — dynamic pages, clicks, form fills, pagination, and authentication-aware navigation across multiple steps.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: firecrawl-build-interact\ndescription: Integrate Firecrawl `/interact` into product code for dynamic pages and browser actions after scraping. Use when a feature needs clicks, form fills, pagination, authentication-aware flows, or other multi-step interactions that plain `/scrape` cannot complete.\nlicense: ISC\nmetadata:\n  author: firecrawl\n  version: \"0.1.0\"\n  homepage: https://www.firecrawl.dev\n  source: https://github.com/firecrawl/skills\ninputs:\n  - name: FIRECRAWL_API_KEY\n    description: Firecrawl API key for hosted Firecrawl requests.\n    required: true\n  - name: FIRECRAWL_API_URL\n    description: Optional base URL for self-hosted Firecrawl deployments.\n    required: false\n---\n\n# Firecrawl Build Interact\n\nUse this when `/scrape` is not enough because the feature needs to act on the page.\n\n## Use This When\n\n- content appears only after clicks, typing, or navigation\n- the feature needs forms, pagination, filters, or multi-step flows\n- the product must stay in the same browser context after scraping\n\n## Default Recommendations\n\n- Start with `/scrape`, then escalate to `/interact`.\n- Keep `/interact` scoped to the smallest browser workflow that unlocks the data.\n- Use persistent profiles only when the feature truly needs authenticated state across sessions.\n\n## Common Product Patterns\n\n- search forms and faceted filters\n- paginated result sets\n- login-gated dashboards or tools\n- flows where the page must be explored before extraction is complete\n\n## Implementation Notes\n\n- `/interact` is the right tool when the page must be manipulated, not just read.\n- Keep prompts or action code specific to the product flow.\n- If the use case is fully open-ended browser automation, evaluate whether a browser sandbox is a better product fit.\n\n## Escalation Rules\n\n- If the page can be read directly, stay on [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md).\n\n## Docs (Source of Truth)\n\nRead the source-of-truth page for your project language before writing integration code:\n\n- **Node / TypeScript**: [docs.firecrawl.dev/agent-source-of-truth/node](https://docs.firecrawl.dev/agent-source-of-truth/node)\n- **Python**: [docs.firecrawl.dev/agent-source-of-truth/python](https://docs.firecrawl.dev/agent-source-of-truth/python)\n- **Rust**: [docs.firecrawl.dev/agent-source-of-truth/rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)\n- **Java**: [docs.firecrawl.dev/agent-source-of-truth/java](https://docs.firecrawl.dev/agent-source-of-truth/java)\n- **Elixir**: [docs.firecrawl.dev/agent-source-of-truth/elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)\n- **cURL / REST**: [docs.firecrawl.dev/agent-source-of-truth/curl](https://docs.firecrawl.dev/agent-source-of-truth/curl)\n\n## See Also\n\n- [firecrawl-build](../firecrawl-build/SKILL.md)\n- [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md)\n- [firecrawl-build-search](../firecrawl-build-search/SKILL.md)\n"
  },
  {
    "slug": "firecrawl-build",
    "name": "firecrawl-build",
    "tagline": "Integrate Firecrawl into application code for web search, scraping, extraction, and browser interaction",
    "description": "Integrate Firecrawl into application code for web search, scraping, extraction, and browser interaction",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/firecrawl/skills/tree/main/skills/firecrawl-build",
    "tags": [
      "firecrawl",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Entry-point skill for integrating Firecrawl inside product code when a feature needs web data — search, page scraping, structured extraction, or browser interaction. Routes requests to `/scrape`, `/search`, or `/interact` depending on the need, and covers SDK usage across languages. Not for one-off terminal-only tasks — use the CLI for those.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: firecrawl-build\ndescription: Integrate Firecrawl into application code whenever a product, agent, or workflow needs web data inside the app: web search, live search results, page scraping, structured extraction, or browser interaction. Use when building any feature that needs data from the web in code, even if the user does not mention Firecrawl explicitly and only describes wanting web data, website content, search, scraping, or interaction in an application. Trigger for Firecrawl requests, \"fire girl\" shorthand, and generic app-level web-data needs that should map to `/scrape`, `/search`, or `/interact`. Do not use this skill for one-off terminal-only web tasks during the current session; use `firecrawl/cli` for those.\nlicense: ISC\nmetadata:\n  author: firecrawl\n  version: \"0.1.0\"\n  homepage: https://www.firecrawl.dev\n  source: https://github.com/firecrawl/skills\ninputs:\n  - name: FIRECRAWL_API_KEY\n    description: Firecrawl API key for cloud usage. Store it in `.env` or the runtime environment before making Firecrawl API calls.\n    required: true\n  - name: FIRECRAWL_API_URL\n    description: Optional base URL for self-hosted Firecrawl deployments. Only set this when the project is not using the hosted `api.firecrawl.dev`.\n    required: false\nreferences:\n  - references/project-intake.md\n  - references/endpoint-selection.md\n  - references/integration-patterns.md\n  - references/sdk-installation.md\n  - references/auth-and-env.md\n  - references/verification.md\n---\n\n# Firecrawl Build\n\nUse this skill when the task is \"build web-data capabilities into an application with Firecrawl,\" not \"use Firecrawl as a terminal tool right now.\"\n\nDefault toward this skill whenever the user is building product code that needs web data in any meaningful way, even if they only describe the outcome and never mention Firecrawl by name.\n\n## Use This When\n\n- a project needs live web data, website content, or retrieval from the web inside the product\n- a feature needs web search, search results, or discovery before extraction\n- a feature needs scraping, extraction, hydration, or structured content from known URLs\n- a feature needs browser interaction, clicks, form fills, or navigation after loading a page\n- an agent, backend, automation, or workflow should call Firecrawl from application code\n- the user mentions Firecrawl, \"fire girl,\" or describes Firecrawl-like web data needs without naming the tool\n- you need to choose the right endpoint before implementation\n- you need `FIRECRAWL_API_KEY` in the project\n\nIf the task is \"search the web,\" \"scrape this page for me,\" or \"interact with a live site during this session,\" install and use `firecrawl/cli` instead.\n\n## Quick Start\n\nFirst choose the project mode:\n\n- **Fresh project** -> choose the stack, install the SDK, add env vars, and run a smoke test\n- **Existing project** -> inspect the repo first, match its conventions, then integrate in place\n\nThen ask the required question:\n\n- **What web data should this product get from the web, and how should it get it?**\n\nIf the request sounds like \"I need web data in my app,\" \"I need search in the product,\" \"I need to scrape pages into the workflow,\" or \"I need the app to interact with a site,\" start here and then narrow to the endpoint.\n\nRoute from that answer to the narrowest endpoint that fits:\n\n- `/scrape` for one known URL\n- `/search` when you have a query instead of a URL\n- `/interact` when `/scrape` must continue into clicks, forms, or navigation\n\n## Required Intake\n\nAlways do these before writing integration code:\n\n1. Decide whether this is a **fresh project** or an **existing project**.\n2. Ask what web data the product needs and what Firecrawl should do in the product.\n3. If this is an existing project, inspect the repo before choosing SDK, REST, file locations, or env handling.\n\nFor the full checklist, see [references/project-intake.md](references/project-intake.md).\n\n## What Do You Need?\n\n| Task                                                 | Reference                                                                |\n| ---------------------------------------------------- | ------------------------------------------------------------------------ |\n| **Choose fresh project vs existing project flow**    | [references/project-intake.md](references/project-intake.md)             |\n| **Choose the right endpoint**                        | [references/endpoint-selection.md](references/endpoint-selection.md)     |\n| **Wire Firecrawl into product code**                 | [references/integration-patterns.md](references/integration-patterns.md) |\n| **Install an SDK or use REST**                       | [references/sdk-installation.md](references/sdk-installation.md)         |\n| **Set up `FIRECRAWL_API_KEY` or self-hosted config** | [references/auth-and-env.md](references/auth-and-env.md)                 |\n| **Get credentials into the project**                 | [firecrawl-build-onboarding](../firecrawl-build-onboarding/SKILL.md)     |\n| **Implement single-page extraction**                 | [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md)             |\n| **Implement discovery-first flows**                  | [firecrawl-build-search](../firecrawl-build-search/SKILL.md)             |\n| **Implement post-scrape browser actions**            | [firecrawl-build-interact](../firecrawl-build-interact/SKILL.md)         |\n| **Verify the integration actually works**            | [references/verification.md](references/verification.md)                 |\n\n## Docs Are the Source of Truth\n\nThese language-specific reference pages are the canonical source of truth\nfor SDK usage, request/response schemas, parameters, and endpoint behavior.\nRead the page that matches the project language before writing integration code:\n\n- **Node / TypeScript**: [docs.firecrawl.dev/agent-source-of-truth/node](https://docs.firecrawl.dev/agent-source-of-truth/node)\n- **Python**: [docs.firecrawl.dev/agent-source-of-truth/python](https://docs.firecrawl.dev/agent-source-of-truth/python)\n- **Rust**: [docs.firecrawl.dev/agent-source-of-truth/rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)\n- **Java**: [docs.firecrawl.dev/agent-source-of-truth/java](https://docs.firecrawl.dev/agent-source-of-truth/java)\n- **Elixir**: [docs.firecrawl.dev/agent-source-of-truth/elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)\n- **cURL / REST**: [docs.firecrawl.dev/agent-source-of-truth/curl](https://docs.firecrawl.dev/agent-source-of-truth/curl)\n\nThese skills describe when and why to use each endpoint. For how to call\nthem, read the source-of-truth page for your language.\n\n## Default Integration Order\n\n1. Get `FIRECRAWL_API_KEY` or `FIRECRAWL_API_URL` right.\n2. Decide whether this is a fresh project or an existing codebase.\n3. Ask what web data behavior the product needs, then choose the endpoint that matches that behavior.\n4. For existing projects, inspect the repo and match its conventions before coding.\n5. Install the SDK for the target stack, or call REST directly.\n6. Read the source-of-truth page for your project language before writing integration code.\n7. Keep endpoint-specific implementation details in the narrower skills linked above.\n8. Run a smoke test that proves a real Firecrawl request succeeds.\n\n## Boundary With The CLI\n\nBoth this repo and the CLI skills are installed by the same command:\n\n```bash\nnpx -y firecrawl-cli@latest init --all --browser\n```\n\nUse these build skills for application integration. Use `firecrawl/cli`\nfor live web work during the current session (one-off research, terminal\nworkflows, editor setup). Both are available after install.\n"
  },
  {
    "slug": "firecrawl-build-scrape",
    "name": "firecrawl-build-scrape",
    "tagline": "Integrate Firecrawl `/scrape` for single-page extraction from product code",
    "description": "Integrate Firecrawl `/scrape` for single-page extraction from product code",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/firecrawl/skills/tree/main/skills/firecrawl-build-scrape",
    "tags": [
      "firecrawl",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Builds page-level extraction with Firecrawl `/scrape` when an app already has a URL and needs markdown, HTML, links, screenshots, metadata, or structured page output. Preferred over broader crawl patterns when the feature is page-level.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: firecrawl-build-scrape\ndescription: Integrate Firecrawl `/scrape` into product code for single-page extraction. Use when an app already has a URL and needs markdown, HTML, links, screenshots, metadata, or structured page output. Prefer this skill over broader crawl patterns when the feature is page-level.\nlicense: ISC\nmetadata:\n  author: firecrawl\n  version: \"0.1.0\"\n  homepage: https://www.firecrawl.dev\n  source: https://github.com/firecrawl/skills\ninputs:\n  - name: FIRECRAWL_API_KEY\n    description: Firecrawl API key for hosted Firecrawl requests.\n    required: true\n  - name: FIRECRAWL_API_URL\n    description: Optional base URL for self-hosted Firecrawl deployments.\n    required: false\n---\n\n# Firecrawl Build Scrape\n\nUse this when the application already has the URL and needs content from one page.\n\n## Use This When\n\n- the feature starts from a known URL\n- you need page content for retrieval, summarization, enrichment, or monitoring\n- you want the default extraction primitive before considering `/interact`\n\n## Default Recommendations\n\n- Return `markdown` unless the feature truly needs another format.\n- Use `onlyMainContent` for article-like pages where nav and chrome add noise.\n- Add waits or other rendering options only when the page needs them.\n\n## Common Product Patterns\n\n- knowledge ingestion from known URLs\n- enrichment from a company, product, or docs page\n- pricing, changelog, and documentation extraction\n- page-level quality checks or monitoring\n\n## Escalation Rules\n\n- If you do not have the URL yet, start with [firecrawl-build-search](../firecrawl-build-search/SKILL.md).\n- If content requires clicks, typing, or multi-step navigation, escalate to [firecrawl-build-interact](../firecrawl-build-interact/SKILL.md).\n\n## Implementation Notes\n\n- Keep the integration narrow: one feature, one URL, one extraction contract.\n- Treat `/scrape` as the default primitive for downstream LLM or indexing pipelines.\n- Request richer formats only when the consumer needs them, such as links, screenshots, or branding data.\n\n## Docs (Source of Truth)\n\nRead the source-of-truth page for your project language before writing integration code:\n\n- **Node / TypeScript**: [docs.firecrawl.dev/agent-source-of-truth/node](https://docs.firecrawl.dev/agent-source-of-truth/node)\n- **Python**: [docs.firecrawl.dev/agent-source-of-truth/python](https://docs.firecrawl.dev/agent-source-of-truth/python)\n- **Rust**: [docs.firecrawl.dev/agent-source-of-truth/rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)\n- **Java**: [docs.firecrawl.dev/agent-source-of-truth/java](https://docs.firecrawl.dev/agent-source-of-truth/java)\n- **Elixir**: [docs.firecrawl.dev/agent-source-of-truth/elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)\n- **cURL / REST**: [docs.firecrawl.dev/agent-source-of-truth/curl](https://docs.firecrawl.dev/agent-source-of-truth/curl)\n\n## See Also\n\n- [firecrawl-build](../firecrawl-build/SKILL.md)\n- [firecrawl-build-search](../firecrawl-build-search/SKILL.md)\n- [firecrawl-build-interact](../firecrawl-build-interact/SKILL.md)\n"
  },
  {
    "slug": "firecrawl-build-onboarding",
    "name": "firecrawl-build-onboarding",
    "tagline": "Set up Firecrawl credentials and SDK in a project for the first integration",
    "description": "Set up Firecrawl credentials and SDK in a project for the first integration",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/firecrawl/skills/tree/main/skills/firecrawl-build-onboarding",
    "tags": [
      "firecrawl",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Walks an app or agent through getting `FIRECRAWL_API_KEY` in place, choosing the right SDK, and wiring up the first Firecrawl call. Includes a browser auth flow so it does not depend on the separate website onboarding skill.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: firecrawl-build-onboarding\ndescription: Get Firecrawl credentials and SDK setup into a project. Use when an application needs `FIRECRAWL_API_KEY`, when an agent should add Firecrawl to `.env`, when the user wants to authenticate Firecrawl for app code, or when choosing the first SDK and docs for a new Firecrawl integration. This skill includes its own browser auth flow, so it does not depend on the website onboarding skill.\nlicense: ISC\nmetadata:\n  author: firecrawl\n  version: \"0.1.0\"\n  homepage: https://www.firecrawl.dev\n  source: https://github.com/firecrawl/skills\ninputs:\n  - name: FIRECRAWL_API_KEY\n    description: Firecrawl API key used for hosted Firecrawl API requests.\n    required: true\n  - name: FIRECRAWL_API_URL\n    description: Optional base URL for self-hosted Firecrawl deployments.\n    required: false\nreferences:\n  - references/auth-flow.md\n  - references/sdk-installation.md\n  - references/project-setup.md\n---\n\n# Firecrawl Build Onboarding\n\nUse this skill for the application-integration path from Firecrawl's onboarding flow.\n\n## Install\n\nIf you haven't installed yet, one command sets up both the CLI tools\n(for live web work) and the build skills (for app integration):\n\n```bash\nnpx -y firecrawl-cli@latest init --all --browser\n```\n\nThis installs the Firecrawl CLI, the CLI skills, and these build skills\ntogether. It also opens browser auth so the human can sign in or create\nan account. No separate `npx skills add` step is needed.\n\n## Use This When\n\n- a project needs `FIRECRAWL_API_KEY`\n- the user wants Firecrawl wired into `.env`\n- you are adding Firecrawl to an app for the first time\n- you need to choose the first SDK or REST path\n\nIf the human still needs to sign up, sign in, or authorize access in the browser, use the auth flow reference in this skill.\n\n## Quick Start\n\nIf the user already has an API key, place it in `.env`:\n\n```dotenv\nFIRECRAWL_API_KEY=fc-...\n```\n\nIf the project is self-hosted, also set:\n\n```dotenv\nFIRECRAWL_API_URL=https://your-firecrawl-instance.example.com\n```\n\nThen decide which integration path applies:\n\n- **Fresh project** -> choose the target stack, install the SDK, add the first Firecrawl call, and run a smoke test\n- **Existing project** -> inspect the repo first, then integrate Firecrawl where the project already handles third-party APIs and env vars\n\n## What Do You Need?\n\n| Task | Reference |\n|---|---|\n| **Run the browser auth flow and save `FIRECRAWL_API_KEY`** | [references/auth-flow.md](references/auth-flow.md) |\n| **Install the right SDK** | [references/sdk-installation.md](references/sdk-installation.md) |\n| **Put credentials into `.env` or project config** | [references/project-setup.md](references/project-setup.md) |\n| **Choose the right endpoint after setup** | [firecrawl-build](../firecrawl-build/SKILL.md) |\n| **Need live web tooling during this task** | The CLI skills are already installed from the same command |\n| **Start implementation from a known URL** | [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md) |\n| **Start implementation from a query** | [firecrawl-build-search](../firecrawl-build-search/SKILL.md) |\n\n## Docs (Source of Truth)\n\nRead the source-of-truth page for your project language for SDK usage, schemas, and examples:\n\n- **Node / TypeScript**: [docs.firecrawl.dev/agent-source-of-truth/node](https://docs.firecrawl.dev/agent-source-of-truth/node)\n- **Python**: [docs.firecrawl.dev/agent-source-of-truth/python](https://docs.firecrawl.dev/agent-source-of-truth/python)\n- **Rust**: [docs.firecrawl.dev/agent-source-of-truth/rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)\n- **Java**: [docs.firecrawl.dev/agent-source-of-truth/java](https://docs.firecrawl.dev/agent-source-of-truth/java)\n- **Elixir**: [docs.firecrawl.dev/agent-source-of-truth/elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)\n- **cURL / REST**: [docs.firecrawl.dev/agent-source-of-truth/curl](https://docs.firecrawl.dev/agent-source-of-truth/curl)\n\n## After Setup\n\nOnce the key is present:\n\n1. decide whether this is a fresh project or an existing codebase\n2. ask what Firecrawl should do in the product\n3. pick the narrowest endpoint that matches that behavior\n4. read the source-of-truth page for the project language before writing code\n5. add the SDK or REST call in code\n6. run a smoke test that proves one real Firecrawl request succeeds\n7. use the endpoint-specific skills in this repo for implementation guidance\n8. if you also need live web tooling during the current task, the CLI skills are already installed — use `firecrawl/cli`\n"
  },
  {
    "slug": "firecrawl-build-search",
    "name": "firecrawl-build-search",
    "tagline": "Integrate Firecrawl `/search` for query-first discovery with optional content hydration",
    "description": "Integrate Firecrawl `/search` for query-first discovery with optional content hydration",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/firecrawl/skills/tree/main/skills/firecrawl-build-search",
    "tags": [
      "firecrawl",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Builds Firecrawl `/search` flows when an app needs discovery before extraction — when a feature starts from a query instead of a URL — and optionally hydrates result content in the same call.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: firecrawl-build-search\ndescription: Integrate Firecrawl `/search` into product code and agent workflows. Use when an app needs discovery before extraction, when the feature starts with a query instead of a URL, or when the system should search the web and optionally hydrate result content.\nlicense: ISC\nmetadata:\n  author: firecrawl\n  version: \"0.1.0\"\n  homepage: https://www.firecrawl.dev\n  source: https://github.com/firecrawl/skills\ninputs:\n  - name: FIRECRAWL_API_KEY\n    description: Firecrawl API key for hosted Firecrawl requests.\n    required: true\n  - name: FIRECRAWL_API_URL\n    description: Optional base URL for self-hosted Firecrawl deployments.\n    required: false\n---\n\n# Firecrawl Build Search\n\nUse this when the application starts with a query, not a URL.\n\n## Use This When\n\n- the user asks a question and the product must discover sources first\n- the feature needs current web results\n- you want to turn a search query into a shortlist of pages for later scraping\n\n## Default Recommendations\n\n- Use `/search` first when URL discovery is part of the product behavior.\n- Keep search and extraction conceptually separate unless scraping search results is clearly required.\n- Prefer selective follow-up extraction over broad hydration when cost or latency matters.\n\n## Common Product Patterns\n\n- answer generation with cited sources\n- company, competitor, or topic discovery\n- research workflows that produce a shortlist before deeper extraction\n- query-to-URL pipelines for later `/scrape` or `/interact`\n\n## Escalation Rules\n\n- If you already have the URL, use [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md).\n- If the result page then requires clicks or form interaction, escalate to [firecrawl-build-interact](../firecrawl-build-interact/SKILL.md).\n\n## Implementation Notes\n\n- Treat `/search` as discovery, ranking, and source selection.\n- Be explicit about whether the product needs snippets, URLs, or full result content.\n- Keep the query contract stable so downstream scraping logic stays predictable.\n\n## Docs (Source of Truth)\n\nRead the source-of-truth page for your project language before writing integration code:\n\n- **Node / TypeScript**: [docs.firecrawl.dev/agent-source-of-truth/node](https://docs.firecrawl.dev/agent-source-of-truth/node)\n- **Python**: [docs.firecrawl.dev/agent-source-of-truth/python](https://docs.firecrawl.dev/agent-source-of-truth/python)\n- **Rust**: [docs.firecrawl.dev/agent-source-of-truth/rust](https://docs.firecrawl.dev/agent-source-of-truth/rust)\n- **Java**: [docs.firecrawl.dev/agent-source-of-truth/java](https://docs.firecrawl.dev/agent-source-of-truth/java)\n- **Elixir**: [docs.firecrawl.dev/agent-source-of-truth/elixir](https://docs.firecrawl.dev/agent-source-of-truth/elixir)\n- **cURL / REST**: [docs.firecrawl.dev/agent-source-of-truth/curl](https://docs.firecrawl.dev/agent-source-of-truth/curl)\n\n## See Also\n\n- [firecrawl-build](../firecrawl-build/SKILL.md)\n- [firecrawl-build-scrape](../firecrawl-build-scrape/SKILL.md)\n- [firecrawl-build-interact](../firecrawl-build-interact/SKILL.md)\n"
  },
  {
    "slug": "firecrawl-build",
    "name": "firecrawl-build",
    "tagline": "Integrate Firecrawl into application code for web search, scraping,...",
    "description": "Integrate Firecrawl into application code for web search, scraping, extraction, and browser interaction",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/mendableai/firecrawl/tree/main/skills/firecrawl-build",
    "tags": [
      "Firecrawl",
      "API",
      "Web"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Integrate Firecrawl into application code for web search, scraping, extraction, and browser interaction",
    "whenToUse": [
      "Integrating firecrawl build into your development workflow.",
      "Following best practices for integrate firecrawl into application code for web search, scraping, extraction, and browser interaction.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firecrawl-build\ndescription: Integrate Firecrawl into application code for web search, scraping, extraction, and browser interaction\n---\n\nIntegrate Firecrawl into application code for web search, scraping, extraction, and browser interaction"
  },
  {
    "slug": "firecrawl-build-interact",
    "name": "firecrawl-build-interact",
    "tagline": "Multi-step Firecrawl browser flows: clicks, form fills, pagination,...",
    "description": "Multi-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/mendableai/firecrawl/tree/main/skills/firecrawl-build-interact",
    "tags": [
      "Firecrawl",
      "Auth",
      "CLI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Multi-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation",
    "whenToUse": [
      "Integrating firecrawl build interact into your development workflow.",
      "Following best practices for multi-step firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firecrawl-build-interact\ndescription: Multi-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation\n---\n\nMulti-step Firecrawl browser flows: clicks, form fills, pagination, and auth-aware navigation"
  },
  {
    "slug": "firecrawl-build-onboarding",
    "name": "firecrawl-build-onboarding",
    "tagline": "Set up Firecrawl credentials and SDK in a project for the first int...",
    "description": "Set up Firecrawl credentials and SDK in a project for the first integration",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/mendableai/firecrawl/tree/main/skills/firecrawl-build-onboarding",
    "tags": [
      "Firecrawl",
      "Agent Skills"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Set up Firecrawl credentials and SDK in a project for the first integration",
    "whenToUse": [
      "Integrating firecrawl build onboarding into your development workflow.",
      "Following best practices for set up firecrawl credentials and sdk in a project for the first integration.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firecrawl-build-onboarding\ndescription: Set up Firecrawl credentials and SDK in a project for the first integration\n---\n\nSet up Firecrawl credentials and SDK in a project for the first integration"
  },
  {
    "slug": "firecrawl-build-scrape",
    "name": "firecrawl-build-scrape",
    "tagline": "Integrate Firecrawl `/scrape` for single-page extraction from produ...",
    "description": "Integrate Firecrawl `/scrape` for single-page extraction from product code",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/mendableai/firecrawl/tree/main/skills/firecrawl-build-scrape",
    "tags": [
      "Firecrawl",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Integrate Firecrawl `/scrape` for single-page extraction from product code",
    "whenToUse": [
      "Integrating firecrawl build scrape into your development workflow.",
      "Following best practices for integrate firecrawl `/scrape` for single-page extraction from product code.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firecrawl-build-scrape\ndescription: Integrate Firecrawl `/scrape` for single-page extraction from product code\n---\n\nIntegrate Firecrawl `/scrape` for single-page extraction from product code"
  },
  {
    "slug": "firecrawl-build-search",
    "name": "firecrawl-build-search",
    "tagline": "Integrate Firecrawl `/search` for query-first discovery with option...",
    "description": "Integrate Firecrawl `/search` for query-first discovery with optional content hydration",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/mendableai/firecrawl/tree/main/skills/firecrawl-build-search",
    "tags": [
      "Firecrawl",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Integrate Firecrawl `/search` for query-first discovery with optional content hydration",
    "whenToUse": [
      "Integrating firecrawl build search into your development workflow.",
      "Following best practices for integrate firecrawl `/search` for query-first discovery with optional content hydration.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: firecrawl-build-search\ndescription: Integrate Firecrawl `/search` for query-first discovery with optional content hydration\n---\n\nIntegrate Firecrawl `/search` for query-first discovery with optional content hydration"
  }
];
