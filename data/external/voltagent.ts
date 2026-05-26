import type { ExternalSkill } from "../external-skills";

export const voltagentSkills: ExternalSkill[] = [
  {
    "slug": "voltagent-best-practices",
    "name": "voltagent-best-practices",
    "tagline": "Architecture and usage patterns for agents, workflows, memory, and servers",
    "description": "Architecture and usage patterns for agents, workflows, memory, and servers",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent.png?size=32",
    "tags": [
      "voltagent",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Reference guide for VoltAgent architectural patterns and conventions. Covers when to use agents versus workflows, project layout, memory configuration, server providers, and observability setup.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: voltagent-best-practices\n# prettier-ignore\ndescription: VoltAgent architectural patterns and conventions. Covers agents vs workflows, project layout, memory, servers, and observability.\nlicense: MIT\nmetadata:\n  author: VoltAgent\n  version: \"1.0.0\"\n  repository: https://github.com/VoltAgent/skills\n---\n\n# VoltAgent Best Practices\n\nQuick reference for VoltAgent conventions and patterns.\n\n---\n\n## Choosing Agent or Workflow\n\n| Use | When |\n| --- | --- |\n| Agent | Open-ended tasks that require tool selection and adaptive reasoning |\n| Workflow | Multi-step pipelines with explicit control flow and suspend/resume |\n\n---\n\n## Layout\n\n```\nsrc/\n|-- index.ts\n|-- agents/\n|-- tools/\n`-- workflows/\n```\n\n---\n\n## Quick Snippets\n\n### Basic Agent\n\n```typescript\nimport { Agent } from \"@voltagent/core\";\n\nconst agent = new Agent({\n  name: \"assistant\",\n  instructions: \"You are helpful.\",\n  model: \"openai/gpt-4o-mini\",\n});\n```\n\nModel format is `provider/model` (for example `openai/gpt-4o-mini` or `anthropic/claude-3-5-sonnet`).\n\n### Basic Workflow\n\n```typescript\nimport { createWorkflowChain } from \"@voltagent/core\";\nimport { z } from \"zod\";\n\nconst workflow = createWorkflowChain({\n  id: \"example\",\n  input: z.object({ text: z.string() }),\n  result: z.object({ summary: z.string() }),\n}).andThen({\n  id: \"summarize\",\n  execute: async ({ data }) => ({ summary: data.text }),\n});\n```\n\n### VoltAgent Bootstrap\n\n```typescript\nimport { VoltAgent } from \"@voltagent/core\";\nimport { honoServer } from \"@voltagent/server-hono\";\n\nnew VoltAgent({\n  agents: { agent },\n  workflows: { workflow },\n  server: honoServer(),\n});\n```\n\n---\n\n## Memory Defaults\n\n- Use `memory` for a shared default across agents and workflows.\n- Use `agentMemory` or `workflowMemory` when defaults need to differ.\n\n---\n\n## Server Options\n\n- Use `@voltagent/server-hono` for Node HTTP servers.\n- Use `@voltagent/server-elysia` as an alternative Node server provider.\n- Use `serverless` provider for fetch runtimes (Cloudflare, Netlify).\n\n---\n\n## Observability Notes\n\n- Use `VoltOpsClient` or `createVoltAgentObservability` for tracing.\n- VoltAgent will auto-configure VoltOps if `VOLTAGENT_PUBLIC_KEY` and `VOLTAGENT_SECRET_KEY` are set.\n\n---\n\n## Recipes\n\nShort best-practice recipes live in the embedded docs:\n\n- `packages/core/docs/recipes/`\n- Search: `rg -n \"keyword\" packages/core/docs/recipes -g\"*.md\"`\n- Read: `cat packages/core/docs/recipes/<file>.md`\n\n---\n\n## Footguns\n\n- Do not use `JSON.stringify` inside VoltAgent packages. Use `safeStringify` from `@voltagent/internal`.\n\n---\n\n## Resources\n\n- https://voltagent.dev/docs\n- https://github.com/voltagent/voltagent\n- https://github.com/voltagent/voltagent/tree/main/examples\n"
  },
  {
    "slug": "voltagent-docs-bundle",
    "name": "voltagent-docs-bundle",
    "tagline": "Lookup embedded docs from @voltagent/core for version-matched documentation",
    "description": "Lookup embedded docs from @voltagent/core for version-matched documentation",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent.png?size=32",
    "tags": [
      "voltagent",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Reads VoltAgent documentation bundled inside node_modules/@voltagent/core/docs. Covers API signatures, guides, recipes, observability, workflows, and deployment docs. The bundled copy is version-matched to the installed package.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: voltagent-docs-bundle\n# prettier-ignore\ndescription: Look up VoltAgent documentation embedded in node_modules/@voltagent/core/docs for version-matched docs. Use for API signatures, guides, and examples.\nlicense: MIT\nmetadata:\n  author: VoltAgent\n  version: \"1.0.0\"\n  repository: https://github.com/VoltAgent/skills\n---\n\n# VoltAgent Embedded Docs Lookup\n\nLook up VoltAgent docs embedded in `node_modules/@voltagent/core/docs`. This bundle mirrors the website docs plus additional doc sets, so it is safe to use for version-matched answers.\n\n---\n\n## Where the Docs Live\n\n```\nnode_modules/@voltagent/core/docs/\n|-- actions.md\n|-- agents/\n|-- api/\n|-- blog/\n|-- community/\n|-- deployment-docs/\n|-- deployment.md\n|-- evals.md\n|-- evaluation-docs/\n|-- getting-started/\n|-- guardrails/\n|-- integrations/\n|-- models-docs/\n|-- observability/\n|-- observability-platform/\n|-- prompt-engineering-docs/\n|-- rag/\n|-- recipes/\n|-- repo-docs/\n|-- site-examples/\n|-- tools/\n|-- triggers.md\n|-- troubleshooting/\n|-- ui/\n|-- utils/\n`-- workflows/\n```\n\nIf you are inside the VoltAgent monorepo, the same content exists at:\n\n```\npackages/core/docs/\n```\n\n\n---\n\n## Lookup Flow\n\n1) List available sections:\n```bash\nls node_modules/@voltagent/core/docs\n```\n\n2) Search for a topic:\n```bash\nrg -n \"workflow\" node_modules/@voltagent/core/docs -g\"*.md\"\n```\n\n3) Read the file:\n```bash\ncat node_modules/@voltagent/core/docs/workflows/overview.md\n```\n\n---\n\n## Quick Commands\n\n```bash\n# List docs\nls node_modules/@voltagent/core/docs\n\n# Find a keyword\nrg -n \"memory\" node_modules/@voltagent/core/docs -g\"*.md\"\n\n# Open a section\ncat node_modules/@voltagent/core/docs/getting-started/quick-start.md\n```\n\n---\n\n## Why This Works\n\n- Docs are bundled with the installed version\n- Avoids web drift and outdated content\n- Covers the full doc surface (guides, recipes, platform docs)\n"
  },
  {
    "slug": "create-voltagent",
    "name": "create-voltagent",
    "tagline": "Project setup guide with CLI and manual steps",
    "description": "Project setup guide with CLI and manual steps",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent.png?size=32",
    "tags": [
      "voltagent",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Creates new VoltAgent AI agent projects via a CLI command or manual setup. Handles scaffolding, dependency installation, server and provider selection, and environment configuration. Supports multiple package managers and AI providers including OpenAI, Anthropic, Google, Groq, Mistral, and Ollama.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: create-voltagent\n# prettier-ignore\ndescription: Skill for creating AI agent projects using the VoltAgent framework. Guide for CLI setup and manual bootstrapping.\nlicense: MIT\nmetadata:\n  author: VoltAgent\n  version: \"1.0.0\"\n  repository: https://github.com/VoltAgent/skills\n---\n\n# Create VoltAgent Skill\n\nComplete guide for creating new VoltAgent projects. Includes the CLI flow and a full manual setup.\n\nOfficial documentation: https://voltagent.dev/docs/\n\n---\n\n## Start Here\n\nWhen a user wants to create a VoltAgent project, ask:\n\n\"How would you like to create your VoltAgent project?\"\n\n1. Automatic Setup - run `npm create voltagent-app@latest` and handle prompts\n2. Interactive Guide - walk through each step and confirm choices\n3. Manual Installation - set up dependencies and a full working example\n\nBased on their choice:\n- Option 1: run the CLI, capture server and provider choices, and finish setup\n- Option 2: gather server, provider, and API key, then run the CLI\n- Option 3: follow the manual steps below\n\n---\n\n## Before You Start\n\n- Node.js 20+ (>= 20.19.0 recommended)\n- Git (optional, for auto git init)\n- An API key for your model provider (not needed for Ollama)\n\n---\n\n## Fast Path\n\nCreate a new VoltAgent project with one command:\n\n```bash\nnpm create voltagent-app@latest\n```\n\nOther package managers:\n\n```bash\npnpm create voltagent-app@latest\nyarn create voltagent-app@latest\nbun create voltagent-app@latest\n```\n\n---\n\n## CLI Flow\n\nThe create-voltagent-app command:\n1. Asks for a project name (default: `my-voltagent-app`)\n2. Prompts for a server framework (Hono or Elysia)\n3. Prompts for an AI provider (OpenAI, Anthropic, Google, Groq, Mistral, Ollama)\n4. Prompts for an API key when required\n5. Installs dependencies and scaffolds the project\n6. Writes `.env`, `README.md`, `tsconfig.json`, `tsdown.config.ts`, and Docker files\n7. Initializes a git repo when available\n\n---\n\n## CLI Walkthrough\n\n1. Run:\n   ```bash\n   npm create voltagent-app@latest\n   ```\n\n2. When prompted:\n   - Choose a server (Hono recommended or Elysia)\n   - Choose an AI provider\n   - Enter your API key (skip if using Ollama)\n\n3. Start the dev server:\n   ```bash\n   cd <your-project-directory>\n   npm run dev\n   ```\n\n4. If you chose Ollama:\n   ```bash\n   ollama pull llama3.2\n   ```\n\n---\n\n## CLI Flags and Examples\n\nCreate in a specific directory:\n\n```bash\nnpm create voltagent-app@latest my-voltagent-app\n```\n\nDownload an example from the VoltAgent repo:\n\n```bash\nnpm create voltagent-app@latest -- --example with-workflow\n```\n\npnpm / yarn / bun equivalents:\n\n```bash\npnpm create voltagent-app@latest -- --example with-workflow\nyarn create voltagent-app@latest -- --example with-workflow\nbun create voltagent-app@latest -- --example with-workflow\n```\n\nNotes:\n- Examples are pulled from https://github.com/voltagent/voltagent/tree/main/examples\n- Some package managers require `--` before `--example`.\n- After an example download, run `npm install` and `npm run dev`.\n\n---\n\n## Generated Layout\n\n```\nmy-voltagent-app/\n|-- src/\n|   |-- index.ts\n|   |-- tools/\n|   |   |-- index.ts\n|   |   `-- weather.ts\n|   `-- workflows/\n|       `-- index.ts\n|-- .env\n|-- .voltagent/\n|-- Dockerfile\n|-- .dockerignore\n|-- .gitignore\n|-- README.md\n|-- package.json\n|-- tsconfig.json\n`-- tsdown.config.ts\n```\n\nIf you run the docs sync script in this repo, you may also see `packages/core/docs` generated.\n\n---\n\n## Env Keys\n\nThe CLI writes `.env` with your provider key (or a placeholder). Common keys:\n\n```env\nOPENAI_API_KEY=...\nANTHROPIC_API_KEY=...\nGOOGLE_GENERATIVE_AI_API_KEY=...\nGROQ_API_KEY=...\nMISTRAL_API_KEY=...\nOLLAMA_HOST=http://localhost:11434\n\nVOLTAGENT_PUBLIC_KEY=...\nVOLTAGENT_SECRET_KEY=...\n```\n\n---\n\n## Manual Setup (Full)\n\nIf you prefer not to use the CLI, follow these steps:\n\n### Step 1: Create the project directory\n\n```bash\nmkdir my-voltagent-app && cd my-voltagent-app\nnpm init -y\nmkdir -p src/tools src/workflows .voltagent\n```\n\n### Step 2: Install dependencies\n\nChoose one server package:\n\n```bash\nnpm install @voltagent/core @voltagent/libsql @voltagent/logger @voltagent/server-hono @voltagent/cli ai zod dotenv\n```\n\nor\n\n```bash\nnpm install @voltagent/core @voltagent/libsql @voltagent/logger @voltagent/server-elysia @voltagent/cli ai zod dotenv\n```\n\nDev dependencies:\n\n```bash\nnpm install -D typescript tsx tsdown @types/node @biomejs/biome\n```\n\n### Step 3: Add scripts to package.json\n\n```json\n{\n  \"scripts\": {\n    \"dev\": \"tsx watch --env-file=.env ./src\",\n    \"build\": \"tsdown\",\n    \"start\": \"node dist/index.js\",\n    \"lint\": \"biome check ./src\",\n    \"lint:fix\": \"biome check --write ./src\",\n    \"typecheck\": \"tsc --noEmit\",\n    \"volt\": \"volt\"\n  }\n}\n```\n\n`volt` is the VoltAgent CLI. Use it for project utilities (for example `init`, `deploy`, `eval`, `prompts`, `tunnel`, `update`).\n\n### Step 4: Configure TypeScript\n\nCreate `tsconfig.json`:\n\n```json\n{\n  \"compilerOptions\": {\n    \"target\": \"ES2022\",\n    \"module\": \"ES2022\",\n    \"moduleResolution\": \"bundler\",\n    \"esModuleInterop\": true,\n    \"forceConsistentCasingInFileNames\": true,\n    \"strict\": true,\n    \"outDir\": \"dist\",\n    \"skipLibCheck\": true\n  },\n  \"include\": [\"src\"],\n  \"exclude\": [\"node_modules\", \"dist\"]\n}\n```\n\n### Step 5: Add tsdown config\n\nCreate `tsdown.config.ts`:\n\n```typescript\nimport { defineConfig } from \"tsdown\";\n\nexport default defineConfig({\n  entry: [\"./src/index.ts\"],\n  sourcemap: true,\n  outDir: \"dist\",\n});\n```\n\n### Step 6: Create .env\n\n```env\nOPENAI_API_KEY=your-api-key-here\nVOLTAGENT_PUBLIC_KEY=your-public-key\nVOLTAGENT_SECRET_KEY=your-secret-key\nNODE_ENV=development\n```\n\nFor Ollama:\n\n```env\nOLLAMA_HOST=http://localhost:11434\n```\n\n### Step 7: Create a tool\n\nCreate `src/tools/weather.ts`:\n\n```typescript\nimport { createTool } from \"@voltagent/core\";\nimport { z } from \"zod\";\n\nexport const weatherTool = createTool({\n  name: \"getWeather\",\n  description: \"Get the current weather for a specific location\",\n  parameters: z.object({\n    location: z.string().describe(\"City or location to get weather for\"),\n  }),\n  execute: async ({ location }) => {\n    return {\n      weather: {\n        location,\n        temperature: 21,\n        condition: \"Sunny\",\n        humidity: 45,\n        windSpeed: 8,\n      },\n      message: `Current weather in ${location}: 21 C and sunny.`,\n    };\n  },\n});\n```\n\nCreate `src/tools/index.ts`:\n\n```typescript\nexport { weatherTool } from \"./weather\";\n```\n\n### Step 8: Create a workflow\n\nCreate `src/workflows/index.ts`:\n\n```typescript\nimport { createWorkflowChain } from \"@voltagent/core\";\nimport { z } from \"zod\";\n\nexport const expenseApprovalWorkflow = createWorkflowChain({\n  id: \"expense-approval\",\n  name: \"Expense Approval Workflow\",\n  purpose: \"Process expense reports with manager approval for high amounts\",\n  input: z.object({\n    employeeId: z.string(),\n    amount: z.number(),\n    category: z.string(),\n    description: z.string(),\n  }),\n  result: z.object({\n    status: z.enum([\"approved\", \"rejected\"]),\n    approvedBy: z.string(),\n    finalAmount: z.number(),\n  }),\n})\n  .andThen({\n    id: \"check-approval-needed\",\n    resumeSchema: z.object({\n      approved: z.boolean(),\n      managerId: z.string(),\n      comments: z.string().optional(),\n      adjustedAmount: z.number().optional(),\n    }),\n    execute: async ({ data, suspend, resumeData }) => {\n      if (resumeData) {\n        return {\n          ...data,\n          approved: resumeData.approved,\n          approvedBy: resumeData.managerId,\n          finalAmount: resumeData.adjustedAmount || data.amount,\n          managerComments: resumeData.comments,\n        };\n      }\n\n      if (data.amount > 500) {\n        await suspend(\"Manager approval required\", {\n          employeeId: data.employeeId,\n          requestedAmount: data.amount,\n          category: data.category,\n        });\n      }\n\n      return {\n        ...data,\n        approved: true,\n        approvedBy: \"system\",\n        finalAmount: data.amount,\n      };\n    },\n  })\n  .andThen({\n    id: \"process-decision\",\n    execute: async ({ data }) => {\n      return {\n        status: data.approved ? \"approved\" : \"rejected\",\n        approvedBy: data.approvedBy,\n        finalAmount: data.finalAmount,\n      };\n    },\n  });\n```\n\n### Step 9: Create the entry point\n\nCreate `src/index.ts`:\n\n```typescript\nimport \"dotenv/config\";\nimport {\n  Agent,\n  Memory,\n  VoltAgent,\n  VoltAgentObservability,\n  VoltOpsClient,\n} from \"@voltagent/core\";\nimport { LibSQLMemoryAdapter, LibSQLObservabilityAdapter } from \"@voltagent/libsql\";\nimport { createPinoLogger } from \"@voltagent/logger\";\nimport { honoServer } from \"@voltagent/server-hono\";\nimport { expenseApprovalWorkflow } from \"./workflows\";\nimport { weatherTool } from \"./tools\";\n\nconst logger = createPinoLogger({ name: \"my-voltagent-app\", level: \"info\" });\n\nconst memory = new Memory({\n  storage: new LibSQLMemoryAdapter({\n    url: \"file:./.voltagent/memory.db\",\n    logger: logger.child({ component: \"libsql\" }),\n  }),\n});\n\nconst observability = new VoltAgentObservability({\n  storage: new LibSQLObservabilityAdapter({\n    url: \"file:./.voltagent/observability.db\",\n  }),\n});\n\nconst agent = new Agent({\n  name: \"my-voltagent-app\",\n  instructions: \"A helpful assistant that can check weather and help with various tasks\",\n  model: \"openai/gpt-4o-mini\",\n  tools: [weatherTool],\n  memory,\n});\n\nnew VoltAgent({\n  agents: { agent },\n  workflows: { expenseApprovalWorkflow },\n  server: honoServer(),\n  logger,\n  observability,\n  voltOpsClient: new VoltOpsClient({\n    publicKey: process.env.VOLTAGENT_PUBLIC_KEY || \"\",\n    secretKey: process.env.VOLTAGENT_SECRET_KEY || \"\",\n  }),\n});\n```\n\nModel format is `provider/model`. Examples:\n- `openai/gpt-4o-mini`\n- `anthropic/claude-3-5-sonnet`\n- `google/gemini-2.0-flash`\n- `groq/llama-3.3-70b-versatile`\n- `mistral/mistral-large-latest`\n- `ollama/llama3.2`\n\nIf you chose Elysia, replace `honoServer` with `elysiaServer` and update the import.\n\n### Step 10: Run the dev server\n\n```bash\nnpm run dev\n```\n"
  },
  {
    "slug": "voltagent-core-reference",
    "name": "voltagent-core-reference",
    "tagline": "Reference for the VoltAgent class options and lifecycle methods",
    "description": "Reference for the VoltAgent class options and lifecycle methods",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent.png?size=32",
    "tags": [
      "voltagent",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Reference skill for the VoltAgent class in @voltagent/core. Covers constructor options, lifecycle behavior, method signatures, and server/serverless setup patterns.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: voltagent-core-reference\n# prettier-ignore\ndescription: Reference for the VoltAgent class: constructor options, lifecycle methods, and runtime behavior.\nlicense: MIT\nmetadata:\n  author: VoltAgent\n  version: \"1.0.0\"\n  repository: https://github.com/VoltAgent/skills\n---\n\n# VoltAgent Core Reference\n\nReference for the VoltAgent class in `@voltagent/core`.\n\nSource files:\n- packages/core/src/voltagent.ts\n- packages/core/src/types.ts\n\n---\n\n## Options Overview\n\n`VoltAgentOptions` supports:\n\n- `agents`: Record of `Agent` instances to register.\n- `workflows`: Record of `Workflow` or `WorkflowChain` instances.\n- `memory`: Default `Memory` used for agents and workflows.\n- `agentMemory`: Default `Memory` for agents (falls back to `memory`).\n- `workflowMemory`: Default `Memory` for workflows (falls back to `memory`).\n- `toolRouting`: Global `ToolRoutingConfig` defaults.\n- `triggers`: `VoltAgentTriggersConfig` handlers.\n- `server`: Server provider factory (for example `honoServer()`).\n- `serverless`: Serverless provider factory for fetch runtimes.\n- `voltOpsClient`: Shared `VoltOpsClient` instance.\n- `observability`: `VoltAgentObservability` instance.\n- `logger`: Shared `Logger` instance.\n- `mcpServers`: Record of MCP servers or factories.\n- `a2aServers`: Record of A2A servers or factories.\n- `checkDependencies`: Set to `false` to skip dependency checks.\n\nDeprecated options:\n- `port`\n- `autoStart`\n- `customEndpoints`\n- `enableSwaggerUI`\n\n---\n\n## Lifecycle Notes\n\n- Registers agents and workflows on construction.\n- Auto-starts the server if a server provider is supplied.\n- Applies default memory to agents and workflows.\n- Auto-configures VoltOps client from `VOLTAGENT_PUBLIC_KEY` and `VOLTAGENT_SECRET_KEY` if not provided.\n- Initializes MCP and A2A servers and starts MCP transports after server start.\n\n---\n\n## Methods\n\n- `registerAgent(agent)`, `registerAgents(agents)`\n- `registerWorkflow(workflow)`, `registerWorkflows(workflows)`\n- `registerTrigger(name, config)`, `registerTriggers(triggers)`\n- `getAgent(id)`, `getAgents()`, `getAgentCount()`\n- `getWorkflow(id)`, `getWorkflows()`, `getWorkflowCount()`\n- `getObservability()`\n- `startServer()`, `stopServer()`, `getServerInstance()`\n- `serverless()` to access the serverless provider\n- `shutdown()` for graceful shutdown, `shutdownTelemetry()` for observability\n\n---\n\n## Example\n\n```typescript\nimport { VoltAgent } from \"@voltagent/core\";\nimport { honoServer } from \"@voltagent/server-hono\";\n\nconst app = new VoltAgent({\n  agents: { agent },\n  workflows: { workflow },\n  server: honoServer(),\n});\n\nawait app.startServer();\n```\n"
  },
  {
    "slug": "create-voltagent",
    "name": "create-voltagent",
    "tagline": "Project setup guide with CLI and manual steps",
    "description": "Project setup guide with CLI and manual steps",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/VoltAgent/voltagent/tree/main/skills/create-voltagent",
    "tags": [
      "VoltAgent",
      "CLI"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Project setup guide with CLI and manual steps",
    "whenToUse": [
      "Integrating create voltagent into your development workflow.",
      "Following best practices for project setup guide with cli and manual steps.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: create-voltagent\ndescription: Project setup guide with CLI and manual steps\n---\n\nProject setup guide with CLI and manual steps"
  },
  {
    "slug": "voltagent-best-practices",
    "name": "voltagent-best-practices",
    "tagline": "Architecture and usage patterns for agents, workflows, memory, and ...",
    "description": "Architecture and usage patterns for agents, workflows, memory, and servers",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent/voltagent/tree/main/skills/voltagent-best-practices",
    "tags": [
      "VoltAgent",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Architecture and usage patterns for agents, workflows, memory, and servers",
    "whenToUse": [
      "Integrating voltagent best practices into your development workflow.",
      "Following best practices for architecture and usage patterns for agents, workflows, memory, and servers.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: voltagent-best-practices\ndescription: Architecture and usage patterns for agents, workflows, memory, and servers\n---\n\nArchitecture and usage patterns for agents, workflows, memory, and servers"
  },
  {
    "slug": "voltagent-core-reference",
    "name": "voltagent-core-reference",
    "tagline": "Reference for the VoltAgent class options and lifecycle methods",
    "description": "Reference for the VoltAgent class options and lifecycle methods",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/VoltAgent/voltagent/tree/main/skills/voltagent-core-reference",
    "tags": [
      "VoltAgent",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Reference for the VoltAgent class options and lifecycle methods",
    "whenToUse": [
      "Integrating voltagent core reference into your development workflow.",
      "Following best practices for reference for the voltagent class options and lifecycle methods.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: voltagent-core-reference\ndescription: Reference for the VoltAgent class options and lifecycle methods\n---\n\nReference for the VoltAgent class options and lifecycle methods"
  },
  {
    "slug": "voltagent-docs-bundle",
    "name": "voltagent-docs-bundle",
    "tagline": "Lookup embedded docs from @voltagent/core for version-matched docum...",
    "description": "Lookup embedded docs from @voltagent/core for version-matched documentation",
    "category": "Office & Documents",
    "sourceUrl": "https://github.com/VoltAgent/voltagent/tree/main/skills/voltagent-docs-bundle",
    "tags": [
      "VoltAgent",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Lookup embedded docs from @voltagent/core for version-matched documentation",
    "whenToUse": [
      "Integrating voltagent docs bundle into your development workflow.",
      "Following best practices for lookup embedded docs from @voltagent/core for version-matched documentation.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: voltagent-docs-bundle\ndescription: Lookup embedded docs from @voltagent/core for version-matched documentation\n---\n\nLookup embedded docs from @voltagent/core for version-matched documentation"
  }
];
