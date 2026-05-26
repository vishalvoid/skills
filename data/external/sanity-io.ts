import type { ExternalSkill } from "../external-skills";

export const sanityIoSkills: ExternalSkill[] = [
  {
    "slug": "content-experimentation-best-practices",
    "name": "content-experimentation-best-practices",
    "tagline": "Content A/B testing and experimentation workflows",
    "description": "Content A/B testing and experimentation workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/agent-toolkit/tree/main/skills/content-experimentation-best-practices",
    "tags": [
      "sanity-io",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers experiment design, statistical analysis, and CMS-managed variant setup for content A/B and multivariate testing. Includes hypothesis frameworks, sample size calculation, p-values, confidence intervals, and a catalog of 17 common pitfalls across design, execution, and interpretation. Addresses both the statistics layer and the CMS integration layer.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: content-experimentation-best-practices\ndescription: Content experimentation and A/B testing guidance covering experiment design, hypotheses, metrics, sample size, statistical foundations, CMS-managed variants, and common analysis pitfalls. Use this skill when planning experiments, setting up variants, choosing success metrics, interpreting statistical results, or building experimentation workflows in a CMS or frontend stack.\n---\n\n# Content Experimentation Best Practices\n\nPrinciples and patterns for running effective content experiments to improve conversion rates, engagement, and user experience.\n\n## When to Apply\n\nReference these guidelines when:\n- Setting up A/B or multivariate testing infrastructure\n- Designing experiments for content changes\n- Analyzing and interpreting test results\n- Building CMS integrations for experimentation\n- Deciding what to test and how\n\n## Core Concepts\n\n### A/B Testing\nComparing two variants (A vs B) to determine which performs better.\n\n### Multivariate Testing\nTesting multiple variables simultaneously to find optimal combinations.\n\n### Statistical Significance\nThe confidence level that results aren't due to random chance.\n\n### Experimentation Culture\nMaking decisions based on data rather than opinions (HiPPO avoidance).\n\n## References\n\nStart with the reference that matches the current problem, such as design, statistics, CMS integration, or pitfalls. See `references/` for detailed guidance:\n- `references/experiment-design.md` — Hypothesis framework, metrics, sample size, and what to test\n- `references/statistical-foundations.md` — p-values, confidence intervals, power analysis, Bayesian methods\n- `references/cms-integration.md` — CMS-managed variants, field-level variants, external platforms\n- `references/common-pitfalls.md` — 17 common mistakes across statistics, design, execution, and interpretation\n"
  },
  {
    "slug": "seo-aeo-best-practices",
    "name": "seo-aeo-best-practices",
    "tagline": "SEO and answer engine optimization patterns for content sites",
    "description": "SEO and answer engine optimization patterns for content sites",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/agent-toolkit/tree/main/skills/seo-aeo-best-practices",
    "tags": [
      "sanity-io",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Covers SEO and AEO implementation across metadata, Open Graph tags, sitemaps, robots.txt, hreflang, JSON-LD structured data, and EEAT principles. Targets both traditional search engines and AI answer surfaces like ChatGPT and Perplexity.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: seo-aeo-best-practices\ndescription: SEO and AEO best practices for metadata, Open Graph, sitemaps, robots.txt, hreflang, JSON-LD structured data, EEAT, and content optimized for search engines and AI answer surfaces. Use this skill when implementing page SEO, technical SEO, schema markup, international SEO, AI-overview readiness, or improving content for Google, ChatGPT, Perplexity, and similar assistants.\n---\n\n# SEO & AEO Best Practices\n\nPrinciples for optimizing content for both traditional search engines (SEO) and AI-powered answer engines (AEO). Includes Google's EEAT guidelines and structured data implementation.\n\n## When to Apply\n\nReference these guidelines when:\n- Implementing metadata and Open Graph tags\n- Creating sitemaps and robots.txt\n- Adding JSON-LD structured data\n- Optimizing content for featured snippets\n- Preparing content for AI assistants (ChatGPT, Perplexity, etc.)\n- Evaluating content quality using EEAT principles\n\n## Core Concepts\n\n### SEO (Search Engine Optimization)\nOptimizing content to rank well in traditional search results (Google, Bing).\n\n### AEO (Answer Engine Optimization)\nOptimizing content to be selected as authoritative answers by AI systems.\n\n### EEAT (Experience, Expertise, Authoritativeness, Trustworthiness)\nGoogle's framework for evaluating content quality.\n\n## References\n\nStart with the one reference that matches the task, such as technical SEO, structured data, EEAT, or AI-answer readiness. See `references/` for detailed guidance:\n- `references/eeat-principles.md` — EEAT implementation and author schema\n- `references/structured-data.md` — JSON-LD patterns (Article, FAQ, Breadcrumb, Product)\n- `references/technical-seo.md` — Technical SEO checklist (metadata, sitemaps, hreflang, robots.txt)\n- `references/aeo-considerations.md` — AI/AEO considerations (AI Overviews, crawler management)\n"
  },
  {
    "slug": "sanity-best-practices",
    "name": "sanity-best-practices",
    "tagline": "Best practices for Sanity Studio, GROQ queries, and content workflows",
    "description": "Best practices for Sanity Studio, GROQ queries, and content workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/agent-toolkit/tree/main/skills/sanity-best-practices",
    "tags": [
      "sanity-io",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Best practices and integration guides for Sanity development, maintained by the Sanity team. Covers schema design, GROQ queries, TypeGen, Visual Editing, Portable Text, localization, migrations, and integrations with Next.js, Nuxt, Astro, Remix, SvelteKit, Hydrogen, and the App SDK.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: sanity-best-practices\ndescription: Sanity development best practices for schema design, GROQ queries, TypeGen, Visual Editing, images, Portable Text, Studio structure, localization, migrations, Sanity Functions, Blueprints, and framework integrations such as Next.js, Nuxt, Astro, Remix, SvelteKit, Angular, Hydrogen, and the App SDK. Use this skill whenever working with Sanity schemas, defineType or defineField, GROQ or defineQuery, content modeling, Presentation or preview setups, Sanity-powered frontend integrations, Sanity Functions, documentEventHandler, defineDocumentFunction, defineMediaLibraryAssetFunction, @sanity/functions, @sanity/blueprints, sanity.blueprint.ts, event-driven content automation, or when reviewing and fixing a Sanity codebase.\n---\n\n# Sanity Best Practices\n\nComprehensive best practices and integration guides for Sanity development, maintained by Sanity. Use the quick reference below to load only the one or two topic files that match the task.\n\n## When to Apply\n\nReference these guidelines when:\n- Setting up a new Sanity project or onboarding\n- Integrating Sanity with a frontend framework (Next.js, Nuxt, Astro, Remix, SvelteKit, Hydrogen)\n- Writing GROQ queries or optimizing performance\n- Designing content schemas\n- Implementing Visual Editing and live preview\n- Working with images, Portable Text, or page builders\n- Configuring Sanity Studio structure\n- Setting up TypeGen for type safety\n- Implementing localization\n- Migrating content from other systems\n- Building custom apps with the Sanity App SDK\n- Managing infrastructure with Blueprints\n- Automating content workflows with Sanity Functions\n\n## Quick Reference\n\n### Integration Guides\n\n- `get-started` - Interactive onboarding for new Sanity projects\n- `nextjs` - Next.js App Router, Live Content API, embedded Studio\n- `nuxt` - Nuxt integration with @nuxtjs/sanity\n- `angular` - Angular integration with @sanity/client, signals, resource API\n- `astro` - Astro integration with @sanity/astro\n- `remix` - React Router / Remix integration\n- `svelte` - SvelteKit integration with @sanity/svelte-loader\n- `hydrogen` - Shopify Hydrogen with Sanity\n- `project-structure` - Monorepo and embedded Studio patterns\n- `app-sdk` - Custom applications with Sanity App SDK\n- `blueprints` - Infrastructure as Code with Sanity Blueprints\n- `functions` - Automating content workflows with Sanity Functions\n\n### Topic Guides\n\n- `groq` - GROQ query patterns, type safety, performance optimization\n- `schema` - Schema design, field definitions, validation, deprecation patterns\n- `visual-editing` - Presentation Tool, Stega, overlays, live preview\n- `page-builder` - Page Builder arrays, block components, live editing\n- `portable-text` - Rich text rendering and custom components\n- `image` - Image schema, URL builder, hotspots, LQIP, Next.js Image\n- `studio-structure` - Desk structure, singletons, navigation\n- `typegen` - TypeGen configuration, workflow, type utilities\n- `seo` - Metadata, sitemaps, Open Graph, JSON-LD\n- `localization` - i18n patterns, document vs field-level, locale management\n- `migration` - Content import overview (see also `migration-html-import`)\n- `migration-html-import` - HTML to Portable Text with @portabletext/block-tools\n\n## How to Use\n\nStart with the single framework or topic guide that best matches the request, then read additional references only when the task crosses concerns. Use these reference files for detailed explanations and code examples:\n\n```\nreferences/groq.md\nreferences/schema.md\nreferences/nextjs.md\n```\n\nEach reference file contains:\n- Comprehensive topic or integration coverage\n- Incorrect and correct code examples\n- Decision matrices and workflow guidance\n- Framework-specific patterns where applicable\n\n"
  },
  {
    "slug": "content-modeling-best-practices",
    "name": "content-modeling-best-practices",
    "tagline": "Guidelines for designing scalable content models in Sanity",
    "description": "Guidelines for designing scalable content models in Sanity",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/agent-toolkit/tree/main/skills/content-modeling-best-practices",
    "tags": [
      "sanity-io",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "Structured guidance for designing content schemas in Sanity and other headless CMSes. Covers when to use references versus embedded objects, how to avoid page-shaped schemas, content reuse patterns, and taxonomy design. Applies to new projects and schema refactors alike.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: content-modeling-best-practices\ndescription: Structured content modeling guidance for schema design, content architecture, content reuse, references versus embedded objects, separation of concerns, and taxonomies across Sanity and other headless CMSes. Use this skill when designing or refactoring content types, deciding field shapes, debating reusable versus nested content, planning omnichannel content models, or reviewing whether a schema is too page-shaped or presentation-driven.\n---\n\n# Content Modeling Best Practices\n\nPrinciples for designing structured content that's flexible, reusable, and maintainable. These concepts apply to any headless CMS but include Sanity-specific implementation notes.\n\n## When to Apply\n\nReference these guidelines when:\n- Starting a new project and designing the content model\n- Evaluating whether content should be structured or free-form\n- Deciding between references and embedded content\n- Planning for multi-channel content delivery\n- Refactoring existing content structures\n\n## Core Principles\n\n1. **Content is data, not pages** — Structure content for meaning, not presentation\n2. **Single source of truth** — Avoid content duplication\n3. **Future-proof** — Design for channels that don't exist yet\n4. **Editor-centric** — Optimize for the people creating content\n\n## References\n\nStart with the reference that matches the modeling decision in front of you, instead of loading every topic at once. See `references/` for detailed guidance on specific topics:\n- `references/separation-of-concerns.md` — Separating content from presentation\n- `references/reference-vs-embedding.md` — When to use references vs embedded objects\n- `references/content-reuse.md` — Content reuse patterns and the reuse spectrum\n- `references/taxonomy-classification.md` — Flat, hierarchical, and faceted classification\n"
  },
  {
    "slug": "sanity-best-practices",
    "name": "sanity-best-practices",
    "tagline": "Best practices for Sanity Studio, GROQ queries, and content workflows",
    "description": "Best practices for Sanity Studio, GROQ queries, and content workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/skills/tree/main/skills/sanity-best-practices",
    "tags": [
      "Sanity",
      "Agent Skills"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Best practices for Sanity Studio, GROQ queries, and content workflows",
    "whenToUse": [
      "Integrating sanity best practices into your development workflow.",
      "Following best practices for best practices for sanity studio, groq queries, and content workflows.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: sanity-best-practices\ndescription: Best practices for Sanity Studio, GROQ queries, and content workflows\n---\n\nBest practices for Sanity Studio, GROQ queries, and content workflows"
  },
  {
    "slug": "content-modeling-best-practices",
    "name": "content-modeling-best-practices",
    "tagline": "Guidelines for designing scalable content models in Sanity",
    "description": "Guidelines for designing scalable content models in Sanity",
    "category": "Creative & Design",
    "sourceUrl": "https://github.com/sanity-io/skills/tree/main/skills/content-modeling-best-practices",
    "tags": [
      "Sanity",
      "Design"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "Guidelines for designing scalable content models in Sanity",
    "whenToUse": [
      "Integrating content modeling best practices into your development workflow.",
      "Following best practices for guidelines for designing scalable content models in sanity.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: content-modeling-best-practices\ndescription: Guidelines for designing scalable content models in Sanity\n---\n\nGuidelines for designing scalable content models in Sanity"
  },
  {
    "slug": "seo-aeo-best-practices",
    "name": "seo-aeo-best-practices",
    "tagline": "SEO and answer engine optimization patterns for content sites",
    "description": "SEO and answer engine optimization patterns for content sites",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/skills/tree/main/skills/seo-aeo-best-practices",
    "tags": [
      "Sanity",
      "Agent Skills"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "SEO and answer engine optimization patterns for content sites",
    "whenToUse": [
      "Integrating seo aeo best practices into your development workflow.",
      "Following best practices for seo and answer engine optimization patterns for content sites.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: seo-aeo-best-practices\ndescription: SEO and answer engine optimization patterns for content sites\n---\n\nSEO and answer engine optimization patterns for content sites"
  },
  {
    "slug": "content-experimentation-best-practices",
    "name": "content-experimentation-best-practices",
    "tagline": "Content A/B testing and experimentation workflows",
    "description": "Content A/B testing and experimentation workflows",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/sanity-io/skills/tree/main/skills/content-experimentation-best-practices",
    "tags": [
      "Sanity",
      "Testing"
    ],
    "difficulty": "Advanced",
    "whatItDoes": "Content A/B testing and experimentation workflows",
    "whenToUse": [
      "Integrating content experimentation best practices into your development workflow.",
      "Following best practices for content a/b testing and experimentation workflows.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: content-experimentation-best-practices\ndescription: Content A/B testing and experimentation workflows\n---\n\nContent A/B testing and experimentation workflows"
  }
];
