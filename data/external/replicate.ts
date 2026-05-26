import type { ExternalSkill } from "../external-skills";

export const replicateSkills: ExternalSkill[] = [
  {
    "slug": "replicate",
    "name": "replicate",
    "tagline": "Discover, compare, and run AI models using Replicate's API",
    "description": "Discover, compare, and run AI models using Replicate's API",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/replicate/skills/tree/main/skills/replicate",
    "tags": [
      "replicate",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Replicate lets you run AI models via API, including image generation, language models, and other ML tasks. It handles model hosting, scaling, and versioning so you don't run your own GPU infrastructure. Models are searchable and runnable through a standardized REST interface.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: run-models\ndescription: Run AI models on Replicate via predictions, webhooks, and streaming.\n---\n\n## Docs\n\n- Reference: <https://replicate.com/docs/llms.txt>\n- OpenAPI schema: <https://api.replicate.com/openapi.json>\n- MCP server: <https://mcp.replicate.com>\n- Per-model docs: `https://replicate.com/{owner}/{model}/llms.txt`\n- Set `Accept: text/markdown` when requesting docs pages for Markdown responses.\n\n## Workflow\n\n1. **Choose the right model** - Search with the API or ask the user.\n2. **Get model metadata** - Fetch input and output schema via API.\n3. **Create prediction** - POST to /v1/predictions.\n4. **Poll for results** - GET prediction until status is \"succeeded\".\n5. **Return output** - Usually URLs to generated content.\n\n## Three ways to get output\n\n1. Create a prediction, store its id from the response, and poll until completion.\n2. Set a `Prefer: wait` header when creating a prediction for a blocking synchronous response. Only recommended for very fast models. Max 60 seconds.\n3. Set an HTTPS webhook URL when creating a prediction, and Replicate will POST to that URL when the prediction completes.\n\n## Guidelines\n\n- Use the `POST /v1/predictions` endpoint, as it supports both official and community models.\n- Every model has its own OpenAPI schema. Always fetch and check model schemas to make sure you're setting valid inputs. Even popular models change their schemas.\n- Validate input parameters against schema constraints (`minimum`, `maximum`, `enum` values). Don't generate values that violate them.\n- When unsure about a parameter value, use the model's default example or omit the optional parameter.\n- Don't set optional inputs unless you have a reason to. Stick to the required inputs and let the model's defaults do the work.\n- Use HTTPS URLs for file inputs whenever possible. You can also send base64-encoded files, but they should be avoided.\n- Fire off multiple predictions concurrently. Don't wait for one to finish before starting the next.\n- Output file URLs expire after 1 hour, so back them up if you need to keep them, using a service like Cloudflare R2.\n- Webhooks are a good mechanism for receiving and storing prediction output.\n\n## Predictions\n\n- A prediction goes through these states: `starting` -> `processing` -> `succeeded` / `failed` / `canceled`.\n- Official models use `owner/name` format. Community models require `owner/name:version_id`.\n- The `POST /v1/predictions` endpoint handles both.\n\n## Webhooks\n\n- Set `webhook` to an HTTPS URL when creating a prediction. Replicate POSTs the full prediction object when it completes.\n- Filter events with `webhook_events_filter`: `start`, `output`, `logs`, `completed`.\n- Validate webhook signatures using the `Webhook-ID`, `Webhook-Timestamp`, and `Webhook-Signature` headers. Get the signing secret from `GET /v1/webhooks/default/secret`.\n\n## Prediction lifetime\n\n- Set `lifetime` to auto-cancel predictions that run too long (e.g. `30s`, `5m`, `1h`). Measured from creation time.\n\n## Streaming\n\n- Language models that support streaming include a `stream` URL in the response. Use SSE to receive incremental output.\n\n## File handling\n\n- Prefer HTTPS URLs for file inputs. Output URLs from one prediction can be passed directly as file inputs to the next model.\n- Output file URLs expire after 1 hour. Download and store them immediately if you need to keep them.\n\n## Multi-model workflows\n\n- Chain models by passing output URLs as file inputs to the next model.\n- Start all independent predictions in parallel, then collect results.\n- Output URLs are valid for 1 hour, which is enough for pipeline steps.\n"
  },
  {
    "slug": "replicate",
    "name": "replicate",
    "tagline": "Discover, compare, and run AI models using Replicate's API",
    "description": "Discover, compare, and run AI models using Replicate's API",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/replicate/skills/tree/main/skills/replicate",
    "tags": [
      "Replicate",
      "API",
      "AI"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Discover, compare, and run AI models using Replicate's API",
    "whenToUse": [
      "Integrating replicate into your development workflow.",
      "Following best practices for discover, compare, and run ai models using replicate's api.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: replicate\ndescription: Discover, compare, and run AI models using Replicate's API\n---\n\nDiscover, compare, and run AI models using Replicate's API"
  }
];
