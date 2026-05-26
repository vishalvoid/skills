#!/usr/bin/env node
// sync-skills.js — Daily sync: detect new skills from VoltAgent/awesome-agent-skills README
// Uses GitHub API + Claude API to auto-add new skills to data/external/*.ts files
// Run: node scripts/sync-skills.js [--force]

const { readFileSync, writeFileSync, existsSync } = require("fs");
const { resolve } = require("path");
const Anthropic = require("@anthropic-ai/sdk").default;

const ROOT = resolve(__dirname, "..");
const STATE_FILE = resolve(__dirname, ".sync-state.json");
const PROVIDERS_FILE = resolve(__dirname, "providers.json");

const GITHUB_TOKEN = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const README_REPO = "VoltAgent/awesome-agent-skills";

const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ─── GitHub helpers ──────────────────────────────────────────────────────────

async function githubFetch(path, raw = false) {
  const url = raw
    ? `https://raw.githubusercontent.com/${path}`
    : `https://api.github.com/${path}`;
  const headers = { "User-Agent": "skills-sync" };
  if (!raw) headers["Accept"] = "application/vnd.github.v3+json";
  if (GITHUB_TOKEN) headers["Authorization"] = `Bearer ${GITHUB_TOKEN}`;
  try {
    const res = await fetch(url, { headers });
    if (!res.ok) return null;
    return raw ? res.text() : res.json();
  } catch {
    return null;
  }
}

async function getLatestCommitSha(repo) {
  const data = await githubFetch(`repos/${repo}/commits/main?per_page=1`);
  return data?.sha || null;
}

async function fetchRawFile(owner, repo, branch, path) {
  return githubFetch(`${owner}/${repo}/${branch}/${path}`, true);
}

async function fetchSkillMd(readmeUrl, githubOrg, githubRepo, skillsPath, slug) {
  // 1. Direct GitHub URL in README
  const ghMatch = readmeUrl.match(
    /github\.com\/([^/]+)\/([^/]+)\/tree\/([^/]+)\/(.+)/
  );
  if (ghMatch) {
    const [, owner, repo, branch, path] = ghMatch;
    const content = await fetchRawFile(owner, repo, branch, `${path}/CLAUDE.md`);
    if (content && content.length > 50) return content;
    const readme = await fetchRawFile(owner, repo, branch, `${path}/README.md`);
    if (readme && readme.length > 50) return readme;
  }

  // 2. Try provider's known repo
  for (const branch of ["main", "master"]) {
    const content = await fetchRawFile(githubOrg, githubRepo, branch, `${skillsPath}/${slug}/CLAUDE.md`);
    if (content && content.length > 50) return content;
  }

  return null;
}

// ─── README parser ────────────────────────────────────────────────────────────

function parseReadme(content) {
  const pattern = /\*\*\[([^/\]]+)\/([^\]]+)\]\(([^)]+)\)\*\*\s*[-–]\s*(.+)/g;
  const byOrg = {};
  let m;
  while ((m = pattern.exec(content)) !== null) {
    const [, org, slug, url, desc] = m;
    if (!byOrg[org]) byOrg[org] = [];
    byOrg[org].push({ slug: slug.trim(), url: url.trim(), desc: desc.trim() });
  }
  return byOrg;
}

// ─── Data file helpers ────────────────────────────────────────────────────────

function getExistingSlugs(dataFile) {
  const path = resolve(ROOT, dataFile);
  if (!existsSync(path)) return new Set();
  const content = readFileSync(path, "utf8");
  const slugs = new Set();
  for (const m of content.matchAll(/slug:\s*["']([^"']+)["']/g)) {
    slugs.add(m[1]);
  }
  return slugs;
}

function appendSkillToFile(dataFile, exportName, skill) {
  const path = resolve(ROOT, dataFile);
  const entryJson = `  ${JSON.stringify(skill, null, 2).replace(/\n/g, "\n  ")}`;

  if (!existsSync(path)) {
    const content = `import type { ExternalSkill } from "../external-skills";\n\nexport const ${exportName}: ExternalSkill[] = [\n${entryJson}\n];\n`;
    writeFileSync(path, content);
    console.log(`  Created: ${dataFile}`);
    return;
  }

  let content = readFileSync(path, "utf8");
  const lastBracket = content.lastIndexOf("];");
  if (lastBracket === -1) {
    console.warn(`  Could not find array end in ${dataFile}`);
    return;
  }
  const before = content.slice(0, lastBracket).trimEnd();
  const needsComma = before.endsWith("}");
  content = before + (needsComma ? ",\n" : "\n") + entryJson + "\n" + content.slice(lastBracket);
  writeFileSync(path, content);
}

// ─── Claude metadata generator ────────────────────────────────────────────────

async function generateSkillMetadata(slug, desc, skillMdContent) {
  const prompt = `Generate JSON metadata for a developer skill card.

Slug: ${slug}
Description: ${desc}
CLAUDE.md:
${(skillMdContent || "").slice(0, 2500)}

Return ONLY a JSON object with:
- tagline: string (max 70 chars)
- description: string (1-2 sentences)
- category: "Creative & Design" | "Technical & Development" | "Office & Documents" | "Enterprise"
- tags: string[] (2-3 capitalized words)
- difficulty: "Beginner" | "Intermediate" | "Advanced"
- whatItDoes: string (1-2 sentences)
- whenToUse: string[] (exactly 5 items, each max 80 chars)`;

  try {
    const response = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 800,
      messages: [{ role: "user", content: prompt }],
    });
    const text = response.content[0].text.trim().replace(/^```json?\n?/, "").replace(/\n?```$/, "");
    return JSON.parse(text);
  } catch {
    return null;
  }
}

// ─── State ────────────────────────────────────────────────────────────────────

function loadState() {
  if (!existsSync(STATE_FILE)) return {};
  try { return JSON.parse(readFileSync(STATE_FILE, "utf8")); } catch { return {}; }
}

function saveState(state) {
  writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  if (!ANTHROPIC_API_KEY) {
    console.error("Error: ANTHROPIC_API_KEY environment variable is required");
    process.exit(1);
  }

  const providers = JSON.parse(readFileSync(PROVIDERS_FILE, "utf8"));
  const state = loadState();
  const forceSync = process.argv.includes("--force");

  console.log("Checking VoltAgent/awesome-agent-skills for updates...");
  const latestSha = await getLatestCommitSha(README_REPO);

  if (!latestSha) {
    console.error("Could not reach GitHub API. Set GITHUB_TOKEN to avoid rate limits.");
    process.exit(1);
  }

  if (!forceSync && state.lastSha === latestSha) {
    console.log(`No new changes (sha: ${latestSha.slice(0, 7)}). Run with --force to re-process.`);
    return;
  }

  console.log(`Processing commit: ${latestSha.slice(0, 7)}\n`);

  const readmeContent = await fetchRawFile("VoltAgent", "awesome-agent-skills", "main", "README.md");
  if (!readmeContent) {
    console.error("Failed to fetch README from GitHub");
    process.exit(1);
  }

  const skillsByOrg = parseReadme(readmeContent);
  let totalAdded = 0;

  for (const provider of providers) {
    const { readmeOrg, githubOrg, githubRepo, skillsPath, dataFile, exportName, displayName } = provider;
    const readmeSkills = skillsByOrg[readmeOrg] || [];

    if (!readmeSkills.length) {
      console.log(`[${displayName}] — not in README`);
      continue;
    }

    const existingSlugs = getExistingSlugs(dataFile);
    const newSkills = readmeSkills.filter((s) => !existingSlugs.has(s.slug));

    if (!newSkills.length) {
      console.log(`[${displayName}] ✓ up to date (${existingSlugs.size} skills)`);
      continue;
    }

    console.log(`[${displayName}] ${newSkills.length} new skill(s):`);

    for (const { slug, url, desc } of newSkills) {
      process.stdout.write(`  → ${slug} ... `);

      const skillMd = await fetchSkillMd(url, githubOrg, githubRepo, skillsPath, slug);
      if (!skillMd) {
        console.log("skip (CLAUDE.md not found)");
        continue;
      }

      const meta = await generateSkillMetadata(slug, desc, skillMd);
      if (!meta) {
        console.log("skip (metadata failed)");
        continue;
      }

      const sourceUrl = url.startsWith("https://github.com")
        ? url
        : `https://github.com/${githubOrg}/${githubRepo}/tree/main/${skillsPath}/${slug}`;

      appendSkillToFile(dataFile, exportName, {
        slug,
        name: slug,
        tagline: meta.tagline || desc.slice(0, 70),
        description: meta.description || desc,
        category: meta.category || "Technical & Development",
        sourceUrl,
        tags: meta.tags || [],
        difficulty: meta.difficulty || "Intermediate",
        whatItDoes: meta.whatItDoes || desc,
        whenToUse: meta.whenToUse || [],
        skillMd,
      });

      console.log("added");
      totalAdded++;
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  state.lastSha = latestSha;
  state.lastSync = new Date().toISOString();
  saveState(state);

  console.log(`\nDone. Added ${totalAdded} new skill(s). State saved.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
