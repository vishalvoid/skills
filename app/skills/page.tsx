import type { Metadata } from "next";
import Link from "next/link";
import { externalSkills } from "@/data/external-skills";
import SkillsClient from "@/components/SkillsClient";

export const metadata: Metadata = {
  title: "Skills Directory",
  description: `Browse ${externalSkills.length}+ engineering skills from Anthropic, OpenAI, Google, React, Next.js, TypeScript, Node.js, and more. Find documentation links, difficulty levels, and curated guides.`,
  openGraph: {
    title: "Skills Directory · skills.vishalvoid.com",
    description: `${externalSkills.length}+ curated engineering skills with links to official documentation.`,
    url: "https://skills.vishalvoid.com/skills",
  },
};

export default function SkillsPage() {
  return (
    <main className="flex-1 max-w-[1200px] mx-auto px-6 py-16 w-full">
      {/* Hero */}
      <div className="flex flex-col gap-4 mb-12">
        <div className="flex items-center gap-2 font-mono text-xs text-black/30 dark:text-white/25">
          <Link href="/" className="hover:text-black/60 dark:hover:text-white/50 transition-colors">
            skills
          </Link>
          <span>/</span>
          <span>directory</span>
        </div>
        <h1 className="text-2xl font-semibold text-black dark:text-white leading-tight">
          Engineering Skills Directory
        </h1>
        <p className="text-black/55 dark:text-white/55 text-sm leading-relaxed max-w-xl">
          A curated index of{" "}
          <span className="text-black dark:text-white font-medium">
            {externalSkills.length}+ skills
          </span>{" "}
          from across the ecosystem — Anthropic, OpenAI, Google, React, Next.js, TypeScript, Node.js,
          and more. Each links directly to the official documentation.
        </p>
      </div>

      <SkillsClient skills={externalSkills} />
    </main>
  );
}
