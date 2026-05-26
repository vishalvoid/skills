import type { ExternalSkill } from "../external-skills";

export const supabaseSkills: ExternalSkill[] = [
  {
    "slug": "postgres-best-practices",
    "name": "postgres-best-practices",
    "tagline": "PostgreSQL best practices for Supabase",
    "description": "PostgreSQL best practices for Supabase",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/supabase/agent-skills/tree/main/skills/postgres-best-practices",
    "tags": [
      "supabase",
      "Developer Tools",
      "Agent Skills"
    ],
    "difficulty": "Intermediate",
    "whatItDoes": "A collection of Postgres optimization rules organized by impact, covering query performance, connection management, RLS, schema design, and concurrency. Each rule includes SQL examples showing the wrong and right approach, with EXPLAIN output and metrics where relevant. Maintained by Supabase, but applies to any Postgres setup.",
    "whenToUse": [
      "Configuring integration settings for custom agent workflows.",
      "Optimizing query execution and response latency in production.",
      "Developing clean, standard-compliant implementations for enterprise services.",
      "Troubleshooting connection timeouts and authentication handshakes.",
      "Monitoring API rate limits and execution pipelines programmatically."
    ],
    "skillMd": "---\nname: supabase-postgres-best-practices\ndescription: Postgres performance optimization and best practices from Supabase. Use this skill when writing, reviewing, or optimizing Postgres queries, schema designs, or database configurations.\nlicense: MIT\nmetadata:\n  author: supabase\n  version: \"1.1.1\"\n  organization: Supabase\n  date: January 2026\n  abstract: Comprehensive Postgres performance optimization guide for developers using Supabase and Postgres. Contains performance rules across 8 categories, prioritized by impact from critical (query performance, connection management) to incremental (advanced features). Each rule includes detailed explanations, incorrect vs. correct SQL examples, query plan analysis, and specific performance metrics to guide automated optimization and code generation.\n---\n\n# Supabase Postgres Best Practices\n\nComprehensive performance optimization guide for Postgres, maintained by Supabase. Contains rules across 8 categories, prioritized by impact to guide automated query optimization and schema design.\n\n## When to Apply\n\nReference these guidelines when:\n- Writing SQL queries or designing schemas\n- Implementing indexes or query optimization\n- Reviewing database performance issues\n- Configuring connection pooling or scaling\n- Optimizing for Postgres-specific features\n- Working with Row-Level Security (RLS)\n\n## Rule Categories by Priority\n\n| Priority | Category | Impact | Prefix |\n|----------|----------|--------|--------|\n| 1 | Query Performance | CRITICAL | `query-` |\n| 2 | Connection Management | CRITICAL | `conn-` |\n| 3 | Security & RLS | CRITICAL | `security-` |\n| 4 | Schema Design | HIGH | `schema-` |\n| 5 | Concurrency & Locking | MEDIUM-HIGH | `lock-` |\n| 6 | Data Access Patterns | MEDIUM | `data-` |\n| 7 | Monitoring & Diagnostics | LOW-MEDIUM | `monitor-` |\n| 8 | Advanced Features | LOW | `advanced-` |\n\n## How to Use\n\nRead individual rule files for detailed explanations and SQL examples:\n\n```\nreferences/query-missing-indexes.md\nreferences/query-partial-indexes.md\nreferences/_sections.md\n```\n\nEach rule file contains:\n- Brief explanation of why it matters\n- Incorrect SQL example with explanation\n- Correct SQL example with explanation\n- Optional EXPLAIN output or metrics\n- Additional context and references\n- Supabase-specific notes (when applicable)\n\n## References\n\n- https://www.postgresql.org/docs/current/\n- https://supabase.com/docs\n- https://wiki.postgresql.org/wiki/Performance_Optimization\n- https://supabase.com/docs/guides/database/overview\n- https://supabase.com/docs/guides/auth/row-level-security\n"
  },
  {
    "slug": "postgres-best-practices",
    "name": "postgres-best-practices",
    "tagline": "PostgreSQL best practices for Supabase",
    "description": "PostgreSQL best practices for Supabase",
    "category": "Technical & Development",
    "sourceUrl": "https://github.com/supabase/skills/tree/main/skills/postgres-best-practices",
    "tags": [
      "Supabase",
      "PostgreSQL",
      "SQL"
    ],
    "difficulty": "Beginner",
    "whatItDoes": "PostgreSQL best practices for Supabase",
    "whenToUse": [
      "Integrating postgres best practices into your development workflow.",
      "Following best practices for postgresql best practices for supabase.",
      "Automating repetitive tasks with AI-assisted tooling.",
      "Building production-grade applications with proper standards.",
      "Debugging and troubleshooting common implementation issues."
    ],
    "skillMd": "---\nname: postgres-best-practices\ndescription: PostgreSQL best practices for Supabase\n---\n\nPostgreSQL best practices for Supabase"
  }
];
