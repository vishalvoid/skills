import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  PROVIDER_SLUGS,
  PROVIDER_NAMES,
  CATEGORY_COLORS,
  CATEGORIES,
  getSkillsByProvider,
} from "@/data/external-skills";

export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return PROVIDER_SLUGS.map(({ id }) => ({ provider: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ provider: string }>;
}): Promise<Metadata> {
  const { provider } = await params;
  const name = PROVIDER_NAMES[provider];
  if (!name) return {};
  const skills = getSkillsByProvider(provider);
  return {
    title: `${name} MCP Skills — Official AI Agent Skills`,
    description: `Browse ${skills.length} official ${name} MCP server skills for AI agents. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent. Free and open source.`,
    keywords: [
      `${name.toLowerCase()} mcp`, `${name.toLowerCase()} mcp server`,
      `${name.toLowerCase()} agent skills`, "mcp server", "official mcp skills",
      "ai agent skills", "model context protocol", "claude mcp", "cursor mcp",
    ],
    openGraph: {
      title: `${name} Official MCP Skills · skills.vishalvoid.com`,
      description: `${skills.length} official ${name} MCP server skills. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent.`,
      url: `https://skills.vishalvoid.com/skills/${provider}`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${name} Official MCP Skills`,
      description: `${skills.length} official ${name} MCP server skills for AI agents.`,
    },
    alternates: {
      canonical: `https://skills.vishalvoid.com/skills/${provider}`,
    },
  };
}

export default async function ProviderPage({
  params,
}: {
  params: Promise<{ provider: string }>;
}) {
  const { provider } = await params;
  const name = PROVIDER_NAMES[provider];
  if (!name) notFound();

  const skills = getSkillsByProvider(provider);

  const initial = name.charAt(0).toUpperCase();
  const difficulties = [...new Set(skills.map((s) => s.difficulty))];
  const presentCategories = CATEGORIES.filter((c) => skills.some((s) => s.category === c));

  const difficultyOrder = ["Beginner", "Intermediate", "Advanced"] as const;
  const sortedDifficulties = difficultyOrder.filter((d) => difficulties.includes(d));

  const sourceHost = skills[0]?.sourceUrl
    ? (() => { try { return new URL(skills[0].sourceUrl).hostname.replace("www.", ""); } catch { return null; } })()
    : null;

  return (
    <main className="flex-1 w-full">

      {/* ── Provider header ─────────────────────────────────── */}
      <div className="border-b border-black/8 dark:border-white/8">
        <div className="max-w-[1200px] mx-auto px-6 py-12 w-full">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 font-mono text-[11px] text-black/25 dark:text-white/20 mb-10">
            <Link href="/" className="hover:text-black/55 dark:hover:text-white/45 transition-colors">home</Link>
            <span>/</span>
            <Link href="/skills" className="hover:text-black/55 dark:hover:text-white/45 transition-colors">directory</Link>
            <span>/</span>
            <span className="text-black/50 dark:text-white/40">{name.toLowerCase()}</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8">

            {/* Left — identity */}
            <div className="flex items-start gap-5">
              {/* Initial avatar */}
              <div className="w-14 h-14 rounded-xl border border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.04] flex items-center justify-center shrink-0">
                <span className="font-mono text-xl font-bold text-black/60 dark:text-white/55">
                  {initial}
                </span>
              </div>

              <div className="flex flex-col gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-black dark:text-white tracking-tight leading-none">
                  {name}
                </h1>
                <p className="text-sm text-black/40 dark:text-white/35">
                  Official MCP skills provider
                </p>

                {/* Category chips */}
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {presentCategories.map((cat) => (
                    <span key={cat}
                      className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${CATEGORY_COLORS[cat]}`}>
                      {cat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — quick stats */}
            <div className="flex flex-col gap-3 sm:items-end">
              <div className="flex items-baseline gap-1.5">
                <span className="font-mono text-4xl font-bold text-black dark:text-white tabular-nums">
                  {skills.length}
                </span>
                <span className="font-mono text-sm text-black/30 dark:text-white/25">skills</span>
              </div>
              <div className="flex items-center gap-2 font-mono text-[11px] text-black/30 dark:text-white/25">
                {sortedDifficulties.map((d, i) => (
                  <span key={d} className="flex items-center gap-2">
                    <span>{d}</span>
                    {i < sortedDifficulties.length - 1 && <span className="text-black/15 dark:text-white/10">·</span>}
                  </span>
                ))}
              </div>
              {sourceHost && (
                <a href={skills[0].sourceUrl} target="_blank" rel="noopener noreferrer"
                  className="font-mono text-[11px] text-black/25 dark:text-white/20 hover:text-black/55 dark:hover:text-white/45 transition-colors flex items-center gap-1">
                  {sourceHost}
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Skills list ──────────────────────────────────────── */}
      <div className="max-w-[1200px] mx-auto px-6 py-10 w-full">
        {skills.length === 0 ? (
          <div className="text-center py-24 border border-dashed border-black/8 dark:border-white/8 rounded-xl">
            <span className="font-mono text-xs text-black/30 dark:text-white/30">
              No skills found for this provider.
            </span>
          </div>
        ) : (
          <div className="flex flex-col">
            {/* List header */}
            <div className="grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[3rem_1fr_8rem_6rem_2rem] gap-4 pb-3 border-b border-black/8 dark:border-white/8 font-mono text-[10px] tracking-widest uppercase text-black/25 dark:text-white/20">
              <span className="text-right">#</span>
              <span>Skill</span>
              <span className="hidden sm:block">Category</span>
              <span className="hidden sm:block">Difficulty</span>
              <span />
            </div>

            {skills.map((skill, index) => (
              <Link
                key={skill.slug}
                href={`/skills/${provider}/${skill.slug}`}
                className="group grid grid-cols-[3rem_1fr_auto] sm:grid-cols-[3rem_1fr_8rem_6rem_2rem] gap-4 py-4 border-b border-black/5 dark:border-white/5 last:border-none hover:bg-black/[0.025] dark:hover:bg-white/[0.03] -mx-3 px-3 rounded-lg transition-colors duration-100 items-start"
              >
                {/* Index */}
                <span className="font-mono text-xs text-black/20 dark:text-white/15 text-right pt-0.5 tabular-nums select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>

                {/* Name + tagline */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span className="font-mono text-sm font-semibold text-black dark:text-white group-hover:text-black dark:group-hover:text-white truncate">
                    {skill.slug}
                  </span>
                  <span className="text-[12px] text-black/40 dark:text-white/35 leading-relaxed line-clamp-1">
                    {skill.tagline}
                  </span>
                  {/* Mobile-only badges */}
                  <div className="flex items-center gap-2 mt-0.5 sm:hidden">
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono border ${CATEGORY_COLORS[skill.category]}`}>
                      {skill.category.split(" ")[0]}
                    </span>
                    <span className="font-mono text-[10px] text-black/30 dark:text-white/25">{skill.difficulty}</span>
                  </div>
                </div>

                {/* Category — desktop */}
                <span className="hidden sm:inline-flex items-start pt-0.5">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${CATEGORY_COLORS[skill.category]}`}>
                    {skill.category.split(" ")[0]}
                  </span>
                </span>

                {/* Difficulty — desktop */}
                <span className="hidden sm:block font-mono text-[11px] text-black/35 dark:text-white/30 pt-0.5">
                  {skill.difficulty}
                </span>

                {/* Arrow */}
                <span className="flex items-center pt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-black/35 dark:text-white/35">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        )}

        {/* Footer nav */}
        <div className="flex items-center justify-between pt-10 mt-4 border-t border-black/8 dark:border-white/8">
          <Link href="/skills"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-black/30 dark:text-white/25 hover:text-black/65 dark:hover:text-white/55 transition-colors">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            All providers
          </Link>
          <span className="font-mono text-[11px] text-black/20 dark:text-white/15 tabular-nums">
            {skills.length} skills
          </span>
        </div>
      </div>
    </main>
  );
}
