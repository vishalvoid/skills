import type { ExternalSkill } from "../external-skills";

export const stripeSkills: ExternalSkill[] = [
  {
    "slug": "stripe-best-practices",
    "name": "stripe-best-practices",
    "tagline": "Best practices for building Stripe integrations",
    "description": "Best practices for building Stripe integrations",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/stripe/ai/tree/main/skills/stripe-best-practices",
    "tags": [
      "stripe",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Guides decisions when building Stripe integrations — which API to use (Checkout Sessions vs PaymentIntents vs Setup Intents), how to configure Connect platforms with Accounts v2, and how to set up billing, Treasury financial accounts, and embedded payment UIs. Also covers migrating away from deprecated Stripe APIs.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: stripe-best-practices\ndescription: >-\n  Guides Stripe integration decisions — API selection (Checkout Sessions vs\n  PaymentIntents), Connect platform setup (Accounts v2, controller properties),\n  billing/subscriptions, Treasury financial accounts, integration surfaces\n  (Checkout, Payment Element), migrating from deprecated Stripe APIs, and\n  security best practices (API key management, restricted keys, webhooks,\n  OAuth). Use when building, modifying, or reviewing any Stripe integration —\n  including accepting payments, building marketplaces, integrating Stripe,\n  processing payments, setting up subscriptions, creating connected accounts, or\n  implementing secure key handling.\n\n---\n\nLatest Stripe API version: **2026-04-22.dahlia**. Always use the latest API version and SDK unless the user specifies otherwise.\n\nAPI key default: Always recommend a [restricted API key (RAK)](https://docs.stripe.com/keys/restricted-api-keys.md) (`rk_` prefix) over a secret key (`sk_` prefix).\n\n## Integration routing\n\n| Building…                                                                | Recommended API                     | Details                  |\n| ------------------------------------------------------------------------ | ----------------------------------- | ------------------------ |\n| One-time payments                                                        | Checkout Sessions                   | <references/payments.md> |\n| Custom payment form with embedded UI                                     | Checkout Sessions + Payment Element | <references/payments.md> |\n| Saving a payment method for later                                        | Setup Intents                       | <references/payments.md> |\n| Connect platform or marketplace                                          | Accounts v2 (`/v2/core/accounts`)   | <references/connect.md>  |\n| Subscriptions or recurring billing                                       | Billing APIs + Checkout Sessions    | <references/billing.md>  |\n| Sales tax, VAT, or GST compliance                                        | Stripe Tax + Registrations API      | <references/tax.md>      |\n| Embedded financial accounts / banking                                    | v2 Financial Accounts               | <references/treasury.md> |\n| Security (key management, RAKs, webhooks, OAuth, 2FA, Connect liability) | See security reference              | <references/security.md> |\n\nRead the relevant reference file before answering any integration question or writing code.\n\n## Critical rules\n\n- *Never include `payment_method_types` in any Stripe API call*, with one exception: Terminal (in-person payments) integrations must pass `payment_method_types: ['card_present']` on the PaymentIntent. For all other integrations, omit this parameter entirely to enable dynamic payment methods, which enables you to configure payment method settings from the Dashboard and dynamically display the most relevant eligible payment methods to each customer to maximize conversion. To customize which payment methods you accept, use [`payment_method_configurations`](https://docs.stripe.com/payments/payment-method-configurations.md) or `excluded_payment_method_types` instead of `payment_method_types`.\n\n## Key documentation\n\nWhen the user’s request does not clearly fit a single domain above, consult:\n\n- [Integration Options](https://docs.stripe.com/payments/payment-methods/integration-options.md) — Start here when designing any integration.\n- [API Tour](https://docs.stripe.com/payments-api/tour.md) — Overview of Stripe’s API surface.\n- [Go Live Checklist](https://docs.stripe.com/get-started/checklist/go-live.md) — Review before launching.\n"
  },
  {
    "slug": "upgrade-stripe",
    "name": "upgrade-stripe",
    "tagline": "Upgrade Stripe SDK and API versions",
    "description": "Upgrade Stripe SDK and API versions",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/stripe/ai/tree/main/skills/upgrade-stripe",
    "tags": [
      "stripe",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Handles the process of upgrading Stripe API versions, server-side SDKs, Stripe.js, and mobile SDKs. Covers version pinning, breaking change identification, and testing strategies across dynamically and strongly typed languages.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: upgrade-stripe\ndescription: Guide for upgrading Stripe API versions and SDKs\n\n---\n\nThe latest Stripe API version is 2026-04-22.dahlia - use this version when upgrading unless the user specifies a different target version.\n\n# Upgrading Stripe Versions\n\nThis guide covers upgrading Stripe API versions, server-side SDKs, Stripe.js, and mobile SDKs.\n\n## Understanding Stripe API Versioning\n\nStripe uses date-based API versions (e.g., `2026-04-22.dahlia`, `2025-08-27.basil`, `2024-12-18.acacia`). Your account’s API version determines request/response behavior.\n\n### Types of Changes\n\n**Backward-Compatible Changes** (don’t require code updates):\n\n- New API resources\n- New optional request parameters\n- New properties in existing responses\n- Changes to opaque string lengths (e.g., object IDs)\n- New webhook event types\n\n**Breaking Changes** (require code updates):\n\n- Field renames or removals\n- Behavioral modifications\n- Removed endpoints or parameters\n\nReview the [API Changelog](https://docs.stripe.com/changelog.md) for all changes between versions.\n\n## Server-Side SDK Versioning\n\nSee [SDK Version Management](https://docs.stripe.com/sdks/set-version.md) for details.\n\n### Dynamically-Typed Languages (Ruby, Python, PHP, Node.js)\n\nThese SDKs offer flexible version control:\n\n**Global Configuration:**\n\n```python\nimport stripe\nstripe.api_version = '2026-04-22.dahlia'\n```\n\n```ruby\nStripe.api_version = '2026-04-22.dahlia'\n```\n\n```javascript\nconst stripe = require('stripe')('sk_test_xxx', {\n  apiVersion: '2026-04-22.dahlia'\n});\n```\n\n**Per-Request Override:**\n\n```python\nstripe.Customer.create(\n  email=\"customer@example.com\",\n  stripe_version='2026-04-22.dahlia'\n)\n```\n\n### Strongly-Typed Languages (Java, Go, .NET)\n\nThese use a fixed API version matching the SDK release date. Don’t set a different API version for strongly-typed languages because response objects might not match the strong types in the SDK. Instead, update the SDK to target a new API version.\n\n### Best Practice\n\nAlways specify the API version you’re integrating against in your code instead of relying on your account’s default API version:\n\n```javascript\n// Good: Explicit version\nconst stripe = require('stripe')('sk_test_xxx', {\n  apiVersion: '2026-04-22.dahlia'\n});\n\n// Avoid: Relying on account default\nconst stripe = require('stripe')('sk_test_xxx');\n```\n\n## Stripe.js Versioning\n\nSee [Stripe.js Versioning](https://docs.stripe.com/sdks/stripejs-versioning.md) for details.\n\nStripe.js uses an evergreen model with major releases (Acacia, Basil, Clover, Dahlia) on a biannual basis.\n\n### Loading Versioned Stripe.js\n\n**Via Script Tag:**\n\n```html\n<script src=\"https://js.stripe.com/dahlia/stripe.js\"></script>\n```\n\n**Via npm:**\n\n```bash\nnpm install @stripe/stripe-js\n```\n\nMajor npm versions correspond to specific Stripe.js versions.\n\n### API Version Pairing\n\nEach Stripe.js version automatically pairs with its corresponding API version. For instance:\n\n- Dahlia Stripe.js uses `2026-04-22.dahlia` API\n- Acacia Stripe.js uses `2024-12-18.acacia` API\n\nYou can’t override this association.\n\n### Migrating from v3\n\n1. Identify your current API version in code\n1. Review the changelog for relevant changes\n1. Consider gradually updating your API version before switching Stripe.js versions\n1. Stripe continues supporting v3 indefinitely\n\n## Mobile SDK Versioning\n\nSee [Mobile SDK Versioning](https://docs.stripe.com/sdks/mobile-sdk-versioning.md) for details.\n\n### iOS and Android SDKs\n\nBoth platforms follow **semantic versioning** (MAJOR.MINOR.PATCH):\n\n- **MAJOR**: Breaking API changes\n- **MINOR**: New functionality (backward-compatible)\n- **PATCH**: Bug fixes (backward-compatible)\n\nNew features and fixes release only on the latest major version. Upgrade regularly to access improvements.\n\n### React Native SDK\n\nUses a different model (0.x.y schema):\n\n- **Minor version changes** (x): Breaking changes AND new features\n- **Patch updates** (y): Critical bug fixes only\n\n### Backend Compatibility\n\nAll mobile SDKs work with any Stripe API version you use on your backend unless documentation specifies otherwise.\n\n## Upgrade Checklist\n\n1. Review the [API Changelog](https://docs.stripe.com/changelog.md) for changes between your current and target versions\n1. Check [Upgrades Guide](https://docs.stripe.com/upgrades.md) for migration guidance\n1. Update server-side SDK package version (e.g., `npm update stripe`, `pip install --upgrade stripe`)\n1. Update the `apiVersion` parameter in your Stripe client initialization\n1. Test your integration against the new API version using the `Stripe-Version` header\n1. Update webhook handlers to handle new event structures\n1. Update Stripe.js script tag or npm package version if needed\n1. Update mobile SDK versions in your package manager if needed\n1. Store Stripe object IDs in databases that accommodate up to 255 characters (case-sensitive collation)\n\n## Testing API Version Changes\n\nUse the `Stripe-Version` header to test your code against a new version without changing your default:\n\n```bash\ncurl https://api.stripe.com/v1/customers \\\n  -u sk_test_xxx: \\\n  -H \"Stripe-Version: 2026-04-22.dahlia\"\n```\n\nOr in code:\n\n```javascript\nconst stripe = require('stripe')('sk_test_xxx', {\n  apiVersion: '2026-04-22.dahlia'  // Test with new version\n});\n```\n\n## Important Notes\n\n- Your webhook listener should handle unfamiliar event types gracefully\n- Test webhooks with the new version structure before upgrading\n- Breaking changes are tagged by affected product areas (Payments, Billing, Connect, etc.)\n- Multiple API versions coexist simultaneously, enabling staged adoption\n"
  },
  {
    "slug": "stripe-best-practices",
    "name": "stripe-best-practices",
    "tagline": "Best practices for building Stripe integrations",
    "description": "Best practices for building Stripe integrations",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/stripe/ai/tree/main/skills/stripe-best-practices",
    "tags": [
      "Stripe",
      "Payments"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Best practices for building Stripe integrations",
    "whenToUse": [
      "Integrating stripe best practices into your development workflow.",
      "Following best practices for best practices for building stripe integrations.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: stripe-best-practices\ndescription: Best practices for building Stripe integrations\n---\n\nBest practices for building Stripe integrations"
  },
  {
    "slug": "upgrade-stripe",
    "name": "upgrade-stripe",
    "tagline": "Upgrade Stripe SDK and API versions",
    "description": "Upgrade Stripe SDK and API versions",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/stripe/ai/tree/main/skills/upgrade-stripe",
    "tags": [
      "Stripe",
      "API",
      "Payments"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Upgrade Stripe SDK and API versions",
    "whenToUse": [
      "Integrating upgrade stripe into your development workflow.",
      "Following best practices for upgrade stripe sdk and api versions.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: upgrade-stripe\ndescription: Upgrade Stripe SDK and API versions\n---\n\nUpgrade Stripe SDK and API versions"
  }
];
