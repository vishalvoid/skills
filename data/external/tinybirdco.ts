import type { ExternalSkill } from "../external-skills";

export const tinybirdcoSkills: ExternalSkill[] = [
  {
    "slug": "tinybird-python-sdk-guidelines",
    "name": "tinybird-python-sdk-guidelines",
    "tagline": "Tinybird Python SDK usage guidelines",
    "description": "Tinybird Python SDK usage guidelines",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/tinybirdco/tinybird-agent-skills/tree/main/skills/tinybird-python-sdk-guidelines",
    "tags": [
      "tinybirdco",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Provides coding guidelines for the tinybird-sdk Python package. Covers defining datasources, pipes, endpoints, and connections, plus CLI workflows for dev, build, and deploy. Includes patterns for materialized views, copy pipes, and migrating from legacy .datasource/.pipe files.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: tinybird-python-sdk-guidelines\ndescription: Tinybird Python SDK for defining datasources, pipes, and queries in Python. Use when working with tinybird-sdk, Python Tinybird projects, or data ingestion and queries in Python.\n---\n\n# Tinybird Python SDK Guidelines\n\nGuidance for using the `tinybird-sdk` package to define Tinybird resources in Python.\n\n## When to Apply\n\n- Installing or configuring tinybird-sdk\n- Defining datasources, pipes, or endpoints in Python\n- Creating Tinybird clients in Python\n- Using data ingestion or queries in Python\n- Running tinybird dev/build/deploy commands for Python projects\n- Migrating from legacy .datasource/.pipe files to Python\n- Defining connections (Kafka, S3, GCS)\n- Creating materialized views, copy pipes, or sink pipes\n\n## Rule Files\n\n- `rules/getting-started.md`\n- `rules/configuration.md`\n- `rules/defining-datasources.md`\n- `rules/defining-endpoints.md`\n- `rules/client.md`\n- `rules/low-level-api.md`\n- `rules/cli-commands.md`\n- `rules/connections.md`\n- `rules/materialized-views.md`\n- `rules/copy-sink-pipes.md`\n- `rules/tokens.md`\n\n## Quick Reference\n\n- Install: `pip install tinybird-sdk`\n- Initialize: `tinybird init`\n- Dev mode: `tinybird dev` (uses configured `dev_mode`, typically branch)\n- Build: `tinybird build` (builds against configured dev target)\n- Deploy: `tinybird deploy` (deploys to main/production)\n- Preview in CI: `tinybird preview`\n- Migrate: `tinybird migrate` (convert .datasource/.pipe files to Python)\n- Server-side only; never expose tokens in browsers\n"
  },
  {
    "slug": "tinybird-cli-guidelines",
    "name": "tinybird-cli-guidelines",
    "tagline": "Tinybird CLI usage guidelines and commands",
    "description": "Tinybird CLI usage guidelines and commands",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/tinybirdco/tinybird-agent-skills/tree/main/skills/tinybird-cli-guidelines",
    "tags": [
      "tinybirdco",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers the Tinybird CLI (tb) for local development, deployments, data operations, and workspace management. Includes guidance on the CLI 4.0 workflow with `tb build` and `tb deploy`, token and secrets management, mock data generation, and running tests.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: tinybird-cli-guidelines\ndescription: Tinybird CLI commands, workflows, and operations. Use when running tb commands, managing local development, deploying, or working with data operations.\n---\n\n# Tinybird CLI Guidelines\n\nGuidance for using the Tinybird CLI (tb) for local development, deployments, data operations, and workspace management.\n\n## When to Apply\n\n- Running any `tb` command\n- Choosing a development workflow (local, branch, or cloud)\n- Local development with Tinybird Local\n- Branch development with Tinybird Cloud branches\n- Building and deploying projects\n- Setting up CI/CD pipelines\n- Appending, replacing, or deleting data\n- Managing tokens and secrets via CLI\n- Generating mock data\n- Running tests\n\n## Rule Files\n\n- `rules/development-workflows.md`\n- `rules/cli-commands.md`\n- `rules/build-deploy.md`\n- `rules/local-development.md`\n- `rules/branch-development.md`\n- `rules/ci-cd.md`\n- `rules/data-operations.md`\n- `rules/append-data.md`\n- `rules/mock-data.md`\n- `rules/tokens.md`\n- `rules/secrets.md`\n\n## Quick Reference\n\n- CLI 4.0 workflow: configure `dev_mode` once, then use plain `tb build` and `tb deploy`.\n- `tb build` targets your configured development environment (`branch` or `local`) in tinybird.config.json.\n- `tb deploy` targets Tinybird Cloud production.\n- Use `--cloud`/`--local`/`--branch` only as explicit manual overrides.\n- Use `tb info` to check CLI context.\n- Use `tb endpoint data <pipe>` to test endpoints (not `tb pipe data`).\n- Never invent commands or flags; run `tb <command> --help` to verify.\n"
  },
  {
    "slug": "tinybird-best-practices",
    "name": "tinybird-best-practices",
    "tagline": "Tinybird project guidelines for datasources, pipes, endpoints, and SQL",
    "description": "Tinybird project guidelines for datasources, pipes, endpoints, and SQL",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/tinybirdco/tinybird-agent-skills/tree/main/skills/tinybird-best-practices",
    "tags": [
      "tinybirdco",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Encodes Tinybird file format rules, SQL constraints, and optimization patterns for datasources, pipes, endpoints, materialized views, and deduplication. Covers the full resource lifecycle from local development to cloud deployment.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: tinybird\ndescription: Tinybird file formats, SQL rules, optimization patterns, and best practices for datasources, pipes, endpoints, and materialized views.\n---\n\n# Tinybird Best Practices\n\nGuidance for Tinybird file formats, SQL rules, optimization patterns, and data modeling. Use this skill when creating or editing Tinybird datafiles.\n\n## When to Apply\n\n- Creating or updating Tinybird resources (.datasource, .pipe, .connection)\n- Writing or optimizing SQL queries\n- Designing endpoint schemas and data models\n- Organizing project structure and data layers\n- Working with materialized views or copy pipes\n- Implementing deduplication patterns\n- Reviewing or refactoring Tinybird project files\n\n## Rule Files\n\n- `rules/project-files.md`\n- `rules/build-deploy.md`\n- `rules/datasource-files.md`\n- `rules/pipe-files.md`\n- `rules/endpoint-files.md`\n- `rules/materialized-files.md`\n- `rules/sink-files.md`\n- `rules/copy-files.md`\n- `rules/connection-files.md`\n- `rules/sql.md`\n- `rules/endpoint-optimization.md`\n- `rules/tests.md`\n- `rules/deduplication-patterns.md`\n\n## Quick Reference\n\n- Project local files are the source of truth.\n- Build target comes from `tinybird.config.json` `dev_mode` (`local` or `branch`).\n- `tb deploy` targets Tinybird Cloud production.\n- Commands like `tb sql` and `tb logs` default to local unless `--cloud` or `--branch=<branch-name>` is set.\n- SQL is SELECT-only with Tinybird templating rules and strict parameter handling.\n- Use MergeTree by default; AggregatingMergeTree for materialized targets.\n- Filter early, select only needed columns, push complex work later in the pipeline.\n"
  },
  {
    "slug": "tinybird-typescript-sdk-guidelines",
    "name": "tinybird-typescript-sdk-guidelines",
    "tagline": "Tinybird TypeScript SDK usage guidelines",
    "description": "Tinybird TypeScript SDK usage guidelines",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/tinybirdco/tinybird-agent-skills/tree/main/skills/tinybird-typescript-sdk-guidelines",
    "tags": [
      "tinybirdco",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Guidelines for using the @tinybirdco/sdk package to define Tinybird datasources, pipes, and queries in TypeScript with full type inference. Covers typed client setup, data ingestion, endpoint definitions, and CLI workflows for dev, build, and deploy.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: tinybird-typescript-sdk-guidelines\ndescription: Tinybird TypeScript SDK for defining datasources, pipes, and queries with full type inference. Use when working with @tinybirdco/sdk, TypeScript Tinybird projects, or type-safe data ingestion and queries.\n---\n\n# Tinybird TypeScript SDK Guidelines\n\nGuidance for using the `@tinybirdco/sdk` package to define Tinybird resources in TypeScript with complete type inference.\n\n## When to Apply\n\n- Installing or configuring @tinybirdco/sdk\n- Defining datasources or pipes in TypeScript\n- Creating typed Tinybird clients\n- Using type-safe ingestion or queries\n- Running tinybird dev/build/deploy commands for TypeScript projects\n- Migrating from legacy .datasource/.pipe files to TypeScript\n- Defining connections (Kafka, S3, GCS)\n- Creating materialized views, copy pipes, or sink pipes\n\n## Rule Files\n\n- `rules/getting-started.md`\n- `rules/configuration.md`\n- `rules/defining-datasources.md`\n- `rules/defining-endpoints.md`\n- `rules/typed-client.md`\n- `rules/low-level-api.md`\n- `rules/cli-commands.md`\n- `rules/connections.md`\n- `rules/materialized-views.md`\n- `rules/copy-sink-pipes.md`\n- `rules/tokens.md`\n\n## Quick Reference\n\n- Install: `npm install @tinybirdco/sdk`\n- Initialize: `npx tinybird init`\n- Dev mode: `tinybird dev` (uses configured `devMode`, typically branch)\n- Build: `tinybird build` (builds against configured dev target)\n- Deploy: `tinybird deploy` (deploys to main/production)\n- Preview in CI: `tinybird preview`\n- Server-side only; never expose tokens in browsers\n"
  },
  {
    "slug": "tinybird-best-practices",
    "name": "tinybird-best-practices",
    "tagline": "Tinybird project guidelines for datasources, pipes, endpoints, and SQL",
    "description": "Tinybird project guidelines for datasources, pipes, endpoints, and SQL",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/tinybirdco/skills/tree/main/skills/tinybird-best-practices",
    "tags": [
      "Tinybird",
      "SQL"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Tinybird project guidelines for datasources, pipes, endpoints, and SQL",
    "whenToUse": [
      "Integrating tinybird best practices into your development workflow.",
      "Following best practices for tinybird project guidelines for datasources, pipes, endpoints, and sql.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: tinybird-best-practices\ndescription: Tinybird project guidelines for datasources, pipes, endpoints, and SQL\n---\n\nTinybird project guidelines for datasources, pipes, endpoints, and SQL"
  },
  {
    "slug": "tinybird-cli-guidelines",
    "name": "tinybird-cli-guidelines",
    "tagline": "Tinybird CLI usage guidelines and commands",
    "description": "Tinybird CLI usage guidelines and commands",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/tinybirdco/skills/tree/main/skills/tinybird-cli-guidelines",
    "tags": [
      "Tinybird",
      "CLI"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Tinybird CLI usage guidelines and commands",
    "whenToUse": [
      "Integrating tinybird cli guidelines into your development workflow.",
      "Following best practices for tinybird cli usage guidelines and commands.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: tinybird-cli-guidelines\ndescription: Tinybird CLI usage guidelines and commands\n---\n\nTinybird CLI usage guidelines and commands"
  },
  {
    "slug": "tinybird-python-sdk-guidelines",
    "name": "tinybird-python-sdk-guidelines",
    "tagline": "Tinybird Python SDK usage guidelines",
    "description": "Tinybird Python SDK usage guidelines",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/tinybirdco/skills/tree/main/skills/tinybird-python-sdk-guidelines",
    "tags": [
      "Tinybird",
      "Python"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Tinybird Python SDK usage guidelines",
    "whenToUse": [
      "Integrating tinybird python sdk guidelines into your development workflow.",
      "Following best practices for tinybird python sdk usage guidelines.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: tinybird-python-sdk-guidelines\ndescription: Tinybird Python SDK usage guidelines\n---\n\nTinybird Python SDK usage guidelines"
  },
  {
    "slug": "tinybird-typescript-sdk-guidelines",
    "name": "tinybird-typescript-sdk-guidelines",
    "tagline": "Tinybird TypeScript SDK usage guidelines",
    "description": "Tinybird TypeScript SDK usage guidelines",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/tinybirdco/skills/tree/main/skills/tinybird-typescript-sdk-guidelines",
    "tags": [
      "Tinybird",
      "TypeScript"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Tinybird TypeScript SDK usage guidelines",
    "whenToUse": [
      "Integrating tinybird typescript sdk guidelines into your development workflow.",
      "Following best practices for tinybird typescript sdk usage guidelines.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: tinybird-typescript-sdk-guidelines\ndescription: Tinybird TypeScript SDK usage guidelines\n---\n\nTinybird TypeScript SDK usage guidelines"
  }
];
