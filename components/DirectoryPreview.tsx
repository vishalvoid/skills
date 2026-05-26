"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalSkill, CategoryKey, CATEGORIES } from "@/data/external-skills";

const ALL = "All" as const;
type Filter = typeof ALL | CategoryKey;

// Curated picks from Anthropic skills for the homepage showcase
const FEATURED_SLUGS = [
  "canvas-design",
  "theme-factory",
  "algorithmic-art",
  "webapp-testing",
  "mcp-builder",
  "doc-coauthoring",
];

export default function DirectoryPreview({ skills }: { skills: ExternalSkill[] }) {
  const [category, setCategory] = useState<Filter>(ALL);

  const displayed =
    category === ALL
      ? (FEATURED_SLUGS.map((slug) => skills.find((s) => s.slug === slug)).filter(Boolean) as ExternalSkill[])
      : skills.filter((s) => s.category === category).slice(0, 9);

  const browseCount =
    category === ALL ? skills.length : skills.filter((s) => s.category === category).length;

  const browseHref =
    category === ALL ? "/skills" : `/skills?category=${encodeURIComponent(category)}`;

  return (
    <div className="flex flex-col gap-6">
      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => setCategory(ALL)}
          className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
            category === ALL
              ? "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
              : "text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/60 border border-transparent"
          }`}
        >
          All
        </button>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`px-3 py-1.5 rounded-md font-mono text-xs transition-colors cursor-pointer ${
              category === c
                ? "bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white"
                : "text-black/40 dark:text-white/35 hover:text-black/70 dark:hover:text-white/60 border border-transparent"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* List of Skills */}
      <div className="flex flex-col">
        {displayed.map((skill, index) => {
          const parts = skill.sourceUrl.replace("https://github.com/", "").split("/");
          const sourcePath = parts.length >= 2 ? `${parts[0]}/${parts[1]}` : "external/skills";
          return (
            <Link
              key={skill.slug}
              href={`/skills/anthropic/${skill.slug}`}
              className="group flex gap-4 py-4 border-b border-black/5 dark:border-white/5 last:border-none hover:bg-black/[0.06] dark:hover:bg-white/[0.08] px-4 rounded-xl -mx-4 transition-all duration-150 cursor-pointer"
            >
              {/* Index Number */}
              <div className="font-mono text-sm text-black/35 dark:text-white/30 w-8 shrink-0 pt-0.5 text-right select-none">
                {index + 1}
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                <div className="flex items-baseline gap-2 flex-wrap">
                  <span className="font-mono text-base font-bold text-black dark:text-white w-fit truncate">
                    {skill.slug}
                  </span>
                  <span className="font-mono text-xs text-black/35 dark:text-white/40 font-medium tracking-wide">
                    {sourcePath}
                  </span>
                </div>
                {/* One line tag (SEO heading) in place of description */}
                <h3 className="text-sm text-black/60 dark:text-white/50 leading-relaxed mt-1.5 max-w-2xl font-mono">
                  {skill.tagline}
                </h3>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Browse CTA */}
      <div className="flex items-center justify-between pt-2 border-t border-black/8 dark:border-white/8">
        <p className="font-mono text-xs text-black/30 dark:text-white/25">
          Showing {displayed.length} of {browseCount}
          {category !== ALL ? ` ${category}` : ""} skills
        </p>
        <Link
          href={browseHref}
          className="inline-flex items-center gap-2 font-mono text-xs text-black/60 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors"
        >
          Browse all {browseCount}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
