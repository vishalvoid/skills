#!/usr/bin/env python3
"""Generate ExternalSkill entries for all providers from the README."""
import re, json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# ─── Metadata inference ───────────────────────────────────────────────────────

CATEGORY_RULES = [
    (["design", "art", "canvas", "gif", "theme", "frontend", "ui", "ux", "figma", "gsap",
      "animation", "visual", "color", "css", "tailwind", "creative", "slack-gif"], "Creative & Design"),
    (["docx", "pptx", "xlsx", "pdf", "doc", "spreadsheet", "slides", "presentation",
      "word", "excel", "office", "forms", "sheets", "docs", "drive", "email", "calendar",
      "gmail", "notion", "meet", "tasks", "people", "classroom", "chat"], "Office & Documents"),
    (["enterprise", "brand", "internal-comms", "compliance", "legal", "security",
      "audit", "soc2", "gdpr", "auth", "sso", "saml", "identity", "okta", "mfa",
      "vault", "hashicorp", "terraform", "iac", "sre", "incident", "monitoring",
      "datadog", "sentry", "cloudwatch"], "Enterprise"),
]

PROVIDER_CATEGORIES = {
    "anthropics": "Technical & Development",
    "angular": "Technical & Development",
    "auth0": "Enterprise",
    "better-auth": "Enterprise",
    "brave": "Technical & Development",
    "browserbase": "Technical & Development",
    "callstackincubator": "Technical & Development",
    "clickhouse": "Technical & Development",
    "cloudflare": "Technical & Development",
    "coderabbitai": "Technical & Development",
    "coinbase": "Technical & Development",
    "composiohq": "Technical & Development",
    "expo": "Technical & Development",
    "firecrawl": "Technical & Development",
    "getsentry": "Enterprise",
    "google-gemini": "Technical & Development",
    "google-labs-code": "Creative & Design",
    "googleworkspace": "Office & Documents",
    "hashicorp": "Enterprise",
    "huggingface": "Technical & Development",
    "microsoft": "Technical & Development",
    "neondatabase": "Technical & Development",
    "netlify": "Technical & Development",
    "remotion-dev": "Creative & Design",
    "replicate": "Technical & Development",
    "sanity-io": "Technical & Development",
    "stripe": "Technical & Development",
    "supabase": "Technical & Development",
    "tinybirdco": "Technical & Development",
    "trailofbits": "Enterprise",
    "trycourier": "Technical & Development",
    "typefully": "Creative & Design",
    "veniceai": "Technical & Development",
    "vercel-labs": "Technical & Development",
    "voltagent": "Technical & Development",
}

def infer_category(slug, desc, org):
    combined = (slug + " " + desc).lower()
    for keywords, cat in CATEGORY_RULES:
        if any(k in combined for k in keywords):
            return cat
    return PROVIDER_CATEGORIES.get(org, "Technical & Development")

DIFFICULTY_ADVANCED = ["architecture", "optimization", "advanced", "performance", "security",
                        "custom", "migration", "testing", "refactor", "stacks", "analysis",
                        "audit", "distributed", "streaming", "real-time"]
DIFFICULTY_BEGINNER = ["quickstart", "intro", "setup", "create", "install", "onboarding",
                        "getting-started", "basic", "simple", "template", "best-practices",
                        "overview", "guide", "start"]

def infer_difficulty(slug, desc):
    combined = (slug + " " + desc).lower()
    if any(k in combined for k in DIFFICULTY_ADVANCED):
        return "Advanced"
    if any(k in combined for k in DIFFICULTY_BEGINNER):
        return "Beginner"
    return "Intermediate"

def infer_tags(slug, desc, org, provider_name):
    tags = [provider_name]
    combined = (slug + " " + desc).lower()
    tech_keywords = {
        "react": "React", "next": "Next.js", "typescript": "TypeScript",
        "python": "Python", "rust": "Rust", "go": "Go", "node": "Node.js",
        "postgres": "PostgreSQL", "sql": "SQL", "api": "API", "auth": "Auth",
        "security": "Security", "terraform": "Terraform", "kubernetes": "Kubernetes",
        "docker": "Docker", "ai": "AI", "ml": "ML", "llm": "LLM",
        "mobile": "Mobile", "native": "Native", "web": "Web", "cli": "CLI",
        "testing": "Testing", "deploy": "Deploy", "cloud": "Cloud",
        "stripe": "Payments", "database": "Database", "analytics": "Analytics",
        "design": "Design", "video": "Video", "audio": "Audio", "image": "Image",
    }
    found = []
    for kw, tag in tech_keywords.items():
        if kw in combined and tag not in tags:
            found.append(tag)
    tags += found[:2]
    if len(tags) < 2:
        tags.append("Agent Skills")
    return tags[:3]

def make_when_to_use(slug, desc):
    lines = [
        f"Integrating {slug.replace('-', ' ')} into your development workflow.",
        f"Following best practices for {desc.split('.')[0].lower().strip()}.",
        "Automating repetitive tasks with AI-assisted tooling.",
        "Building production-grade applications with proper standards.",
        "Debugging and troubleshooting common implementation issues.",
    ]
    return lines

def build_source_url(url, github_org, github_repo, skills_path, slug):
    if url.startswith("https://github.com"):
        return url
    return f"https://github.com/{github_org}/{github_repo}/tree/main/{skills_path}/{slug}"

# ─── Provider config ──────────────────────────────────────────────────────────

with open(os.path.join(ROOT, 'scripts/providers.json')) as f:
    providers = json.load(f)

provider_map = {p['readmeOrg']: p for p in providers}

# ─── Load README skills ───────────────────────────────────────────────────────

with open('/tmp/readme_skills.json') as f:
    byOrg = json.load(f)

# ─── Get existing slugs from each data file ───────────────────────────────────

def get_existing_slugs(data_file):
    path = os.path.join(ROOT, data_file)
    if not os.path.exists(path): return set()
    content = open(path).read()
    return {m.group(1) for m in re.finditer(r'slug:\s*["\']([^"\']+)["\']', content)}

# ─── Append to data file ──────────────────────────────────────────────────────

def skill_to_ts(skill):
    return json.dumps(skill, indent=2, ensure_ascii=False)

def append_skill(data_file, export_name, skill):
    path = os.path.join(ROOT, data_file)
    entry = "  " + skill_to_ts(skill).replace("\n", "\n  ")
    if not os.path.exists(path):
        content = f'import type {{ ExternalSkill }} from "../external-skills";\n\nexport const {export_name}: ExternalSkill[] = [\n{entry}\n];\n'
        os.makedirs(os.path.dirname(path), exist_ok=True)
        with open(path, 'w') as f:
            f.write(content)
        return
    content = open(path).read()
    last = content.rfind("];")
    if last == -1:
        print(f"  WARNING: can't find array end in {data_file}")
        return
    before = content[:last].rstrip()
    needs_comma = before.endswith("}")
    new_content = before + (",\n" if needs_comma else "\n") + entry + "\n" + content[last:]
    with open(path, 'w') as f:
        f.write(new_content)

# ─── Generate all ─────────────────────────────────────────────────────────────

total_added = 0

for p in providers:
    org = p['readmeOrg']
    provider_name = p['displayName']
    skills = byOrg.get(org, [])
    if not skills:
        continue

    existing = get_existing_slugs(p['dataFile'])
    new_skills = [s for s in skills if s['slug'] not in existing]

    if not new_skills:
        print(f"[{provider_name}] up to date ({len(existing)} skills)")
        continue

    print(f"[{provider_name}] adding {len(new_skills)} skills...")

    for s in new_skills:
        slug = s['slug']
        desc = s['desc'].rstrip('.')
        url = s['url']

        category = infer_category(slug, desc, org)
        difficulty = infer_difficulty(slug, desc)
        tags = infer_tags(slug, desc, org, provider_name)
        source_url = build_source_url(url, p['githubOrg'], p['githubRepo'], p['skillsPath'], slug)

        skill = {
            "slug": slug,
            "name": slug,
            "tagline": desc[:70] if len(desc) <= 70 else desc[:67] + "...",
            "description": desc,
            "category": category,
            "sourceUrl": source_url,
            "tags": tags,
            "difficulty": difficulty,
            "whatItDoes": desc,
            "whenToUse": make_when_to_use(slug, desc),
            "skillMd": f"---\nname: {slug}\ndescription: {desc}\n---\n\n{desc}",
        }

        append_skill(p['dataFile'], p['exportName'], skill)
        total_added += 1

print(f"\nDone. Added {total_added} skills total.")
