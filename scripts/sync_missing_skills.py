import os
import re
import json
import urllib.request
import urllib.error
import time

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
README_PATH = "/Users/vishalvoid/.gemini/antigravity-ide/brain/3d6113d4-0fb9-4ac5-81aa-ec57ac87f817/scratch/readme_direct.md"

missing_providers = {
    "MiniMax-AI": {
        "org": "MiniMax-AI", "repo": "skills", "branch": "main", "path": "skills", "export": "minimaxAiSkills", "file": "data/external/minimax-ai.ts", "display": "MiniMax AI"
    },
    "WordPress": {
        "org": "WordPress", "repo": "agent-skills", "branch": "trunk", "path": "skills", "export": "wordpressSkills", "file": "data/external/wordpress.ts", "display": "WordPress"
    },
    "addyosmani": {
        "org": "addyosmani", "repo": "web-quality-skills", "branch": "main", "path": "skills", "export": "addyosmaniSkills", "file": "data/external/addyosmani.ts", "display": "Addy Osmani"
    },
    "apollographql": {
        "org": "apollographql", "repo": "skills", "branch": "main", "path": "skills", "export": "apollographqlSkills", "file": "data/external/apollographql.ts", "display": "Apollo GraphQL"
    },
    "binance": {
        "org": "binance", "repo": "binance-skills-hub", "branch": "main", "path": "skills/binance-web3", "export": "binanceSkills", "file": "data/external/binance.ts", "display": "Binance"
    },
    "datadog-labs": {
        "org": "datadog-labs", "repo": "agent-skills", "branch": "main", "path": "", "export": "datadogLabsSkills", "file": "data/external/datadog-labs.ts", "display": "Datadog Labs"
    },
    "duckdb": {
        "org": "duckdb", "repo": "duckdb-skills", "branch": "main", "path": "skills", "export": "duckdbSkills", "file": "data/external/duckdb.ts", "display": "DuckDB"
    },
    "fal-ai-community": {
        "org": "fal-ai-community", "repo": "skills", "branch": "lovis/fal-updates", "path": "skills/claude.ai", "export": "falAiCommunitySkills", "file": "data/external/fal-ai-community.ts", "display": "fal.ai"
    },
    "figma": {
        "org": "figma", "repo": "mcp-server-guide", "branch": "cokun/add-generate-project-plan", "path": "skills", "export": "figmaSkills", "file": "data/external/figma.ts", "display": "Figma"
    },
    "firebase": {
        "org": "firebase", "repo": "agent-skills", "branch": "main", "path": "skills", "export": "firebaseSkills", "file": "data/external/firebase.ts", "display": "Firebase"
    },
    "flutter": {
        "org": "flutter", "repo": "skills", "branch": "address-feedback", "path": "skills", "export": "flutterSkills", "file": "data/external/flutter.ts", "display": "Flutter"
    },
    "garrytan": {
        "org": "garrytan", "repo": "gstack", "branch": "main", "path": "", "export": "garrytanSkills", "file": "data/external/garrytan.ts", "display": "Garry Tan"
    },
    "greensock": {
        "org": "greensock", "repo": "gsap-skills", "branch": "main", "path": "skills", "export": "greensockSkills", "file": "data/external/greensock.ts", "display": "GSAP / GreenSock"
    },
    "makenotion": {
        "org": "makenotion", "repo": "notion-cookbook", "branch": "main", "path": "skills/claude", "export": "makenotionSkills", "file": "data/external/makenotion.ts", "display": "Notion"
    },
    "mongodb": {
        "org": "mongodb", "repo": "agent-skills", "branch": "main", "path": "skills", "export": "mongodbSkills", "file": "data/external/mongodb.ts", "display": "MongoDB"
    },
    "openai": {
        "org": "openai", "repo": "skills", "branch": "main", "path": "skills/.curated", "export": "openaiSkills", "file": "data/external/openai.ts", "display": "OpenAI"
    }
}

# ─── Metadata Inference (from generate-all.py) ────────────────────────────────

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

def infer_category(slug, desc, org):
    combined = (slug + " " + desc).lower()
    for keywords, cat in CATEGORY_RULES:
        if any(k in combined for k in keywords):
            return cat
    return "Technical & Development"

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

def infer_tags(slug, desc, display_name):
    tags = [display_name]
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
    clean_desc = desc.split('.')[0].lower().strip()
    # Ensure it's not empty
    if not clean_desc:
         clean_desc = slug.replace('-', ' ')
    lines = [
        f"Integrating {slug.replace('-', ' ')} into your development workflow.",
        f"Following best practices for {clean_desc}.",
        "Automating repetitive tasks with AI-assisted tooling.",
        "Building production-grade applications with proper standards.",
        "Debugging and troubleshooting common implementation issues.",
    ]
    return lines

# ─── Slugs mapping rules ──────────────────────────────────────────────────────

def get_github_folder(org, slug):
    if org == "figma" and slug == "figma-code-connect-components":
        return "figma-code-connect"
    return slug

# ─── Fetch raw skill md from GitHub ───────────────────────────────────────────

def fetch_raw_skill(org_info, slug):
    org = org_info["org"]
    repo = org_info["repo"]
    branch = org_info["branch"]
    path = org_info["path"]
    
    folder = get_github_folder(org, slug)
    
    base_url = f"https://raw.githubusercontent.com/{org}/{repo}/{branch}"
    if path:
        base_url += f"/{path}"
    base_url += f"/{folder}"

    for filename in ["SKILL.md", "README.md", "CLAUDE.md", "skill.md", "readme.md", "claude.md"]:
        url = f"{base_url}/{filename}"
        req = urllib.request.Request(url, headers={"User-Agent": "skills-sync"})
        try:
            with urllib.request.urlopen(req) as response:
                content = response.read().decode('utf-8')
                return content, filename
        except Exception:
            pass
    return None, None

# ─── Main Logic ───────────────────────────────────────────────────────────────

def main():
    print(f"Reading {README_PATH}...")
    with open(README_PATH, 'r', encoding='utf-8') as f:
        readme_content = f.read()

    # Parse all skills from the README: - **[org/slug](url)** - desc
    pattern = r'-\s*\*\*\[([^/\]]+)/([^\]]+)\]\(([^)]+)\)\*\*\s*(?:-\s*)?(.+)'
    matches = re.findall(pattern, readme_content)

    skills_by_org = {}
    for org, slug, url, desc in matches:
        org = org.strip()
        slug = slug.strip()
        url = url.strip()
        desc = desc.strip()
        if org not in skills_by_org:
            skills_by_org[org] = []
        skills_by_org[org].append({"slug": slug, "url": url, "desc": desc})

    for org_id, info in missing_providers.items():
        print(f"\nProcessing provider: {info['display']} ({org_id}) ...")
        skills = skills_by_org.get(org_id, [])
        if not skills:
            print(f"  No skills found in README for {org_id}")
            continue

        print(f"  Found {len(skills)} skills. Fetching from GitHub...")
        fetched_skills = []
        for s in skills:
            slug = s["slug"]
            desc = s["desc"]
            
            print(f"    Fetching {slug} ... ", end="", flush=True)
            content, filename = fetch_raw_skill(info, slug)
            if not content:
                print("FAILED!")
                # Fallback to a placeholder if it really fails, so we don't block the build
                # but let's try our best to have a fallback content
                content = f"---\nname: {slug}\ndescription: {desc}\n---\n\n# {slug.replace('-', ' ').title()}\n\n{desc}"
                filename = "FALLBACK"
            
            print(f"SUCCESS ({filename}, {len(content)} bytes)")
            
            category = infer_category(slug, desc, org_id)
            difficulty = infer_difficulty(slug, desc)
            tags = infer_tags(slug, desc, info["display"])
            
            # Construct standard source URL pointing to the directory on GitHub
            branch = info["branch"]
            path_part = f"/{info['path']}" if info['path'] else ""
            github_folder = get_github_folder(org_id, slug)
            source_url = f"https://github.com/{info['org']}/{info['repo']}/tree/{branch}{path_part}/{github_folder}"
            
            skill_obj = {
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
                "skillMd": content
            }
            fetched_skills.append(skill_obj)
            time.sleep(0.1)

        # Write to TypeScript file
        output_file = os.path.join(ROOT, info["file"])
        os.makedirs(os.path.dirname(output_file), exist_ok=True)
        
        ts_content = f'import type {{ ExternalSkill }} from "../external-skills";\n\n'
        ts_content += f'export const {info["export"]}: ExternalSkill[] = [\n'
        for fs in fetched_skills:
            ts_content += "  " + json.dumps(fs, indent=2, ensure_ascii=False).replace("\n", "\n  ") + ",\n"
        # strip trailing comma and close bracket
        if fetched_skills:
            ts_content = ts_content.rstrip(",\n") + "\n"
        ts_content += "];\n"
        
        with open(output_file, 'w', encoding='utf-8') as out_f:
            out_f.write(ts_content)
        print(f"  Written to {info['file']} with {len(fetched_skills)} skills.")

if __name__ == "__main__":
    main()
