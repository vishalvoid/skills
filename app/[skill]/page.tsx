import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InstallCommand from "@/components/InstallCommand";
import CodeBlock from "@/components/CodeBlock";
import { skills, getSkillBySlug, getRelatedSkills } from "@/data/skills";

export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return skills.map((skill) => ({ skill: skill.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[skill]">): Promise<Metadata> {
  const { skill: slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return {};
  return {
    title: skill.name,
    description: skill.tagline,
  };
}

const categoryBadge: Record<string, string> = {
  Patterns:
    "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  Architecture:
    "text-violet-600 dark:text-violet-400 bg-violet-50 dark:bg-violet-400/10 border-violet-200 dark:border-violet-400/20",
  Design:
    "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-400/10 border-emerald-200 dark:border-emerald-400/20",
};

const relatedCategoryDot: Record<string, string> = {
  Patterns: "bg-blue-500 dark:bg-blue-400",
  Architecture: "bg-violet-500 dark:bg-violet-400",
  Design: "bg-emerald-500 dark:bg-emerald-400",
};

export default async function SkillPage({ params }: PageProps<"/[skill]">) {
  const { skill: slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) notFound();

  const related = getRelatedSkills(skill);

  return (
    <>
      <Header />
      <main className="flex-1 max-w-[720px] mx-auto w-full px-6 py-12 flex flex-col gap-10">

        {/* Breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-mono text-black/40 dark:text-white/30 hover:text-black dark:hover:text-white/70 transition-colors w-fit"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          all skills
        </Link>

        {/* Header */}
        <div className="flex flex-col gap-4">
          <span className={`inline-flex self-start items-center px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${categoryBadge[skill.category]}`}>
            {skill.category}
          </span>
          <h1 className="text-2xl font-semibold text-black dark:text-white tracking-tight leading-snug">
            {skill.name}
          </h1>
          <p className="text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-prose">
            {skill.description}
          </p>
          <div className="flex flex-wrap gap-1.5">
            {skill.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] text-black/40 dark:text-white/35 bg-black/5 dark:bg-white/5 border border-black/8 dark:border-white/8 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Install */}
        <div className="flex flex-col gap-3">
          <p className="text-[10px] font-mono text-black/30 dark:text-white/30 uppercase tracking-widest">
            Install
          </p>
          <InstallCommand command={skill.installCmd} />
        </div>

        {/* Docs */}
        <div className="flex flex-col gap-10">
          {skill.docs.map((doc, i) => (
            <div key={i} className="flex flex-col gap-3">
              <h2 className="text-sm font-semibold text-black/75 dark:text-white/75">
                {doc.title}
              </h2>
              <p className="text-sm text-black/55 dark:text-white/55 leading-relaxed">
                {doc.content}
              </p>
              {doc.code && (
                <CodeBlock
                  code={doc.code}
                  language={doc.language}
                  filename={doc.filename}
                />
              )}
            </div>
          ))}
        </div>

        {/* Related skills */}
        {related.length > 0 && (
          <div className="flex flex-col gap-4 border-t border-black/8 dark:border-white/8 pt-8">
            <p className="text-[10px] font-mono text-black/30 dark:text-white/30 uppercase tracking-widest">
              Related skills
            </p>
            <div className="flex flex-col gap-2">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  href={`/${rel.slug}`}
                  className="group flex items-center justify-between py-3 px-4 rounded-lg border border-black/8 dark:border-white/8 hover:border-black/15 dark:hover:border-white/15 bg-white dark:bg-white/[0.03] hover:bg-black/[0.02] dark:hover:bg-white/[0.05] transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${relatedCategoryDot[rel.category]}`} />
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-medium text-black dark:text-white">
                        {rel.name}
                      </span>
                      <span className="text-xs text-black/40 dark:text-white/40">
                        {rel.tagline}
                      </span>
                    </div>
                  </div>
                  <svg
                    width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    className="text-black/15 dark:text-white/15 group-hover:text-black/40 dark:group-hover:text-white/40 transition-colors shrink-0"
                    aria-hidden="true"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Back */}
        <div className="border-t border-black/8 dark:border-white/8 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-black/40 dark:text-white/30 hover:text-black dark:hover:text-white/70 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="m15 18-6-6 6-6" />
            </svg>
            back to all skills
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
