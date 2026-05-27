import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SkillsClient from "@/components/SkillsClient";
import AITerminal from "@/components/AITerminal";
import VisitorCount from "@/components/VisitorCount";
import { externalSkills, PROVIDER_SLUGS, PROVIDER_NAMES, CATEGORIES } from "@/data/external-skills";

const FEATURED_PROVIDERS = [
  "anthropic", "stripe", "supabase", "cloudflare",
  "vercel-labs", "google-gemini", "huggingface", "neondatabase",
  "angular", "expo", "firecrawl", "coderabbitai",
];

export default function HomePage() {
  const providerCount = PROVIDER_SLUGS.length;
  const yesterday = new Date(Date.now() - 86400000);
  const lastUpdated = yesterday.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <>
      <Header />
      <main className="flex-1 w-full flex flex-col">

        {/* ── Hero ───────────────────────────────────────────────── */}
        <section className="max-w-[1200px] mx-auto w-full px-6 pt-[72px] pb-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

            {/* Left */}
            <div className="flex flex-col gap-10">

              {/* Headline + subtitle */}
              <div className="hero-item flex flex-col gap-5" style={{ animationDelay: "0ms" }}>
                <h1 className="font-bold leading-[1.05] tracking-tight text-black dark:text-white"
                  style={{ fontSize: "clamp(3rem, 6vw, 4.5rem)" }}>
                  Official<br />Agent Skills
                </h1>
                <p className="text-sm text-black/45 dark:text-white/38 leading-relaxed max-w-[340px]">
                  Official skills from the dev teams of software vendors,
                  plus handpicked &amp; community-adopted skills.
                </p>
                <Link
                  href="/skills"
                  className="group inline-flex items-center gap-2 font-mono text-sm text-black/50 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors w-fit"
                >
                  Browse Official Skills
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="group-hover:translate-y-0.5 transition-transform">
                    <path d="M12 5v14M5 12l7 7 7-7" />
                  </svg>
                </Link>
              </div>

              {/* Stats list */}
              <div className="hero-item flex flex-col" style={{ animationDelay: "120ms" }}>
                {[
                  { label: "Official Skills", value: String(externalSkills.length) },
                  { label: "Dev Teams",       value: String(providerCount) },
                  { label: "Last Updated",    value: lastUpdated },
                ].map(({ label, value }) => (
                  <div key={label}
                    className="flex items-center justify-between py-3 border-b border-black/6 dark:border-white/6">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-black/30 dark:text-white/25">
                      {label}
                    </span>
                    <span className="font-mono text-sm text-black dark:text-white tabular-nums">
                      {value}
                    </span>
                  </div>
                ))}
                <VisitorCount />
              </div>
            </div>

            {/* Right — AI summit terminal (stats appear in credits) */}
            <div className="h-[440px] lg:h-[500px]">
              <AITerminal
                skillCount={externalSkills.length}
                providerCount={providerCount}
                categoryCount={CATEGORIES.length}
              />
            </div>
          </div>
        </section>

        {/* ── Featured providers ───────────────────────────────── */}
        <section className="border-t border-black/8 dark:border-white/8">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-14 flex flex-col gap-8">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] text-black/25 dark:text-white/20 tracking-widest uppercase">
                  Ecosystem
                </p>
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  {providerCount} official providers
                </h2>
              </div>
              <Link href="/skills"
                className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/65 dark:hover:text-white/55 transition-colors flex items-center gap-1.5 shrink-0">
                View all
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
              {FEATURED_PROVIDERS.map((id) => {
                const entry = PROVIDER_SLUGS.find((p) => p.id === id);
                const name = PROVIDER_NAMES[id] ?? id;
                const count = entry?.slugs.length ?? 0;
                const samples = entry?.slugs.slice(0, 2) ?? [];
                return (
                  <Link key={id} href={`/skills/${id}`}
                    className="group flex flex-col gap-3 px-5 py-4 rounded-lg border border-black/8 dark:border-white/8 hover:border-black/18 dark:hover:border-white/15 hover:bg-black/[0.02] dark:hover:bg-white/[0.03] transition-all duration-150">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs font-medium text-black/70 dark:text-white/65 group-hover:text-black dark:group-hover:text-white transition-colors truncate">
                        {name}
                      </span>
                      <span className="font-mono text-[10px] text-black/25 dark:text-white/20 shrink-0 tabular-nums">
                        {count}
                      </span>
                    </div>
                    {samples.length > 0 && (
                      <div className="flex flex-col gap-1">
                        {samples.map((slug) => (
                          <span key={slug} className="font-mono text-[10px] text-black/25 dark:text-white/20 truncate leading-tight">
                            {slug}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Full directory ───────────────────────────────────── */}
        <section className="border-t border-black/8 dark:border-white/8">
          <div className="max-w-[1200px] mx-auto w-full px-6 py-14 flex flex-col gap-8">
            <div className="flex items-end justify-between gap-4">
              <div className="flex flex-col gap-1">
                <p className="font-mono text-[10px] text-black/25 dark:text-white/20 tracking-widest uppercase">
                  Skills directory
                </p>
                <h2 className="text-lg font-semibold text-black dark:text-white">
                  Browse everything
                </h2>
                <p className="text-sm text-black/40 dark:text-white/35 max-w-md">
                  Filter by provider, search by topic — all {externalSkills.length}+ skills in one place.
                </p>
              </div>
              <Link href="/skills"
                className="font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/65 dark:hover:text-white/55 transition-colors flex items-center gap-1.5 shrink-0">
                Full page
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
            </div>
            <SkillsClient />
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
