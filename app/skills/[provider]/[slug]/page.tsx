import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getExternalSkillBySlug, externalSkills, CATEGORY_COLORS, PROVIDER_SLUGS, PROVIDER_NAMES } from "@/data/external-skills";
import CodeBlock from "@/components/CodeBlock";
import { marked } from "marked";
import MarkdownViewer from "@/components/MarkdownViewer";

export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return PROVIDER_SLUGS.flatMap(({ id, slugs }) =>
    slugs.map((slug) => ({ provider: id, slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string; slug: string }>;
}): Promise<Metadata> {
  const { slug, provider } = await params;
  const skill = getExternalSkillBySlug(slug);
  if (!skill) return {};
  const providerName = PROVIDER_NAMES[provider] ?? provider;
  return {
    title: `${skill.name} MCP Skill — ${providerName} Official Agent Skill`,
    description: `${skill.description} Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent. Official ${providerName} MCP server skill.`,
    keywords: [
      `${skill.name.toLowerCase()} mcp`, `${providerName.toLowerCase()} mcp`,
      `${providerName.toLowerCase()} agent skill`, "mcp server", "ai agent skill",
      "model context protocol", skill.category.toLowerCase(),
    ],
    openGraph: {
      title: `${skill.name} — ${providerName} Official MCP Skill · skills.vishalvoid.com`,
      description: `${skill.description} Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent.`,
      url: `https://skills.vishalvoid.com/skills/${provider}/${skill.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${skill.name} — ${providerName} Official MCP Skill`,
      description: skill.description,
    },
    alternates: {
      canonical: `https://skills.vishalvoid.com/skills/${provider}/${skill.slug}`,
    },
  };
}

export default async function ExternalSkillPage({
  params,
}: {
  params: Promise<{ provider: string; slug: string }>;
}) {
  const { slug, provider } = await params;
  const skill = getExternalSkillBySlug(slug);
  if (!skill) notFound();

  const providerName = PROVIDER_NAMES[provider] ?? provider;
  const githubLink = skill.sourceUrl;

  const others = externalSkills.filter((s) => s.slug !== slug);
  const charCodeSum = slug.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  const start = charCodeSum % others.length;
  const suggestions = [0, 1, 2].map((i) => others[(start + i) % others.length]);

  const cleanedMd = skill.skillMd.replace(/^---\r?\n[\s\S]*?\r?\n---/, "").trim();
  const lines = cleanedMd.split("\n");
  const rawChunks: { raw: string; startLine: number; endLine: number }[] = [];
  let currentChunk: string[] = [];
  let insideCodeBlock = false;
  let startLine = 1;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    currentChunk.push(line);
    if (line.trim().startsWith("```")) insideCodeBlock = !insideCodeBlock;
    if (currentChunk.length >= 25 && !insideCodeBlock) {
      const endLine = startLine + currentChunk.length - 1;
      rawChunks.push({ raw: currentChunk.join("\n"), startLine, endLine });
      startLine = endLine + 1;
      currentChunk = [];
    }
  }
  if (currentChunk.length > 0) {
    rawChunks.push({ raw: currentChunk.join("\n"), startLine, endLine: startLine + currentChunk.length - 1 });
  }

  const chunks = await Promise.all(
    rawChunks.map(async (c) => ({
      html: (await marked.parse(c.raw)) as string,
      startLine: c.startLine,
      endLine: c.endLine,
    }))
  );

  return (
    <main className="flex-1 max-w-3xl mx-auto px-6 py-12 w-full flex flex-col">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 font-mono text-[11px] text-black/25 dark:text-white/20 mb-10">
        <Link href="/" className="hover:text-black/55 dark:hover:text-white/45 transition-colors">/</Link>
        <Link href="/skills" className="hover:text-black/55 dark:hover:text-white/45 transition-colors">directory</Link>
        <span>/</span>
        <Link href={`/skills/${provider}`} className="hover:text-black/55 dark:hover:text-white/45 transition-colors">
          {providerName}
        </Link>
        <span>/</span>
        <span className="text-black/50 dark:text-white/40">{skill.slug}</span>
      </nav>

      {/* Header Info */}
      <div className="flex flex-col gap-4 pb-10 border-b border-black/8 dark:border-white/8 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${CATEGORY_COLORS[skill.category]}`}>
            {skill.category}
          </span>
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border border-black/10 dark:border-white/12 text-black/45 dark:text-white/40 bg-transparent">
            {skill.difficulty}
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-black dark:text-white tracking-tight leading-[1.08]">
          {skill.name}
        </h1>
        <p className="text-sm text-black/50 dark:text-white/45 leading-relaxed max-w-xl">
          {skill.tagline}
        </p>
      </div>

      {/* Setup & Installation Section */}
      <section className="flex flex-col gap-4 mb-10">
        <div className="flex flex-col gap-1 mb-2">
          <p className="font-mono text-[10px] text-black/55 dark:text-white/60 tracking-widest uppercase font-semibold">
            Developer Setup
          </p>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
            Setup &amp; Installation
          </h2>
        </div>
        <div className="flex flex-col gap-3">
          <CodeBlock
            code={`npx skills add ${githubLink.split("/tree/")[0]} --skill ${skill.slug}`}
            language="bash"
          />
          <div className="flex flex-col gap-1.5 text-xs mt-1">
            <span className="text-black/40 dark:text-white/50">
              Or paste this URL into your assistant to install:
            </span>
            <div className="flex items-center justify-between gap-4">
              <a href={githubLink} target="_blank" rel="noopener noreferrer"
                className="font-mono text-xs text-blue-600 dark:text-blue-400 hover:underline break-all">
                {githubLink}
              </a>
              <a href={githubLink} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold bg-black dark:bg-white text-white dark:text-black px-3 py-1.5 rounded-lg hover:opacity-90 transition-opacity shadow-sm shrink-0">
                View on GitHub
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="flex flex-col gap-4 border-t border-black/8 dark:border-white/15 pt-8 mb-10">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] text-black/55 dark:text-white/60 tracking-widest uppercase font-semibold">
            Overview
          </p>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
            What This Skill Does
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-black/75 dark:text-white/80 whitespace-pre-wrap">
          {skill.whatItDoes}
        </p>
      </section>

      {/* When to Use */}
      <section className="flex flex-col gap-4 border-t border-black/8 dark:border-white/15 pt-8 mb-10">
        <div className="flex flex-col gap-1">
          <p className="font-mono text-[10px] text-black/55 dark:text-white/60 tracking-widest uppercase font-semibold">
            Application
          </p>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
            When to use this Skill
          </h2>
        </div>
        <ul className="flex flex-col gap-3">
          {skill.whenToUse.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed text-black/75 dark:text-white/80">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500 dark:text-emerald-400 mt-1 shrink-0">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* SKILL.md */}
      <section className="flex flex-col gap-4 border-t border-black/8 dark:border-white/15 pt-8">
        <div className="flex flex-col gap-1 mb-2">
          <p className="font-mono text-[10px] text-black/55 dark:text-white/60 tracking-widest uppercase font-semibold">
            Documentation
          </p>
          <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
            Show Skills.md file
          </h2>
        </div>
        <MarkdownViewer chunks={chunks} rawText={cleanedMd} />
      </section>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <section className="flex flex-col gap-4 border-t border-black/8 dark:border-white/15 pt-8 mt-10">
          <div className="flex flex-col gap-1 mb-2">
            <p className="font-mono text-[10px] text-black/55 dark:text-white/60 tracking-widest uppercase font-semibold">
              Recommendations
            </p>
            <h2 className="text-lg font-semibold text-black dark:text-white leading-snug">
              Explore other random skills
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {suggestions.map((randomSkill) => (
              <Link
                key={randomSkill.slug}
                href={`/skills/${provider}/${randomSkill.slug}`}
                className="group flex flex-col gap-3 p-5 bg-black/[0.02] dark:bg-white/[0.03] border border-black/8 dark:border-white/10 rounded-lg hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:border-black/15 dark:hover:border-white/15 transition-all duration-200"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${CATEGORY_COLORS[randomSkill.category]}`}>
                    {randomSkill.category.split(" ")[0]}
                  </span>
                  <span className="font-mono text-[10px] text-black/40 dark:text-white/40">
                    {randomSkill.difficulty}
                  </span>
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <h3 className="font-semibold text-xs text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {randomSkill.name}
                  </h3>
                  <p className="text-[11px] text-black/60 dark:text-white/50 mt-1 line-clamp-3 leading-relaxed">
                    {randomSkill.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="flex items-center gap-6 border-t border-black/8 dark:border-white/15 pt-10 mt-6">
        <Link href="/skills"
          className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          All skills
        </Link>
        <Link href="/"
          className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors">
          My patterns
        </Link>
      </div>
    </main>
  );
}
