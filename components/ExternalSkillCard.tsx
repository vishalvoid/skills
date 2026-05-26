import Link from "next/link";
import { ExternalSkill, CATEGORY_COLORS, DIFFICULTY_COLORS } from "@/data/external-skills";

export default function ExternalSkillCard({
  skill,
  index,
}: {
  skill: ExternalSkill;
  index?: number;
}) {
  const isAuth0 = skill.sourceUrl.includes("auth0");
  const sourcePath = isAuth0 ? "auth0/skills" : "anthropic/skills";

  return (
    <Link
      href={`/skills/anthropic/${skill.slug}`}
      className="group flex flex-col gap-4 bg-white dark:bg-white/[0.02] border border-black/8 dark:border-white/8 rounded-xl p-5 hover:border-black/20 dark:hover:border-white/20 hover:shadow-md dark:hover:shadow-none hover:bg-black/[0.01] dark:hover:bg-white/[0.03] transition-all duration-200"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {index !== undefined && (
            <span className="font-mono text-xs text-black/35 dark:text-white/30 select-none font-semibold">
              {String(index + 1).padStart(2, "0")}.
            </span>
          )}
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded text-[9px] font-mono font-medium border ${CATEGORY_COLORS[skill.category]}`}
          >
            {skill.category}
          </span>
        </div>
        <span className={`font-mono text-[10px] shrink-0 ${DIFFICULTY_COLORS[skill.difficulty]}`}>
          {skill.difficulty}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h2 className="font-mono font-bold text-sm text-black dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors w-fit truncate">
            {skill.slug}
          </h2>
          <span className="font-mono text-[10px] text-black/35 dark:text-white/45 font-medium tracking-wide">
            {sourcePath}
          </span>
        </div>

        {/* One line tag (SEO heading) in place of description */}
        <h3 className="text-black/55 dark:text-white/50 text-[11px] font-mono leading-relaxed mt-1">
          {skill.tagline}
        </h3>
      </div>

      <div className="flex items-center justify-between mt-auto pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="font-mono text-[9px] text-black/40 dark:text-white/35 bg-black/[0.03] dark:bg-white/[0.03] border border-black/5 dark:border-white/5 px-2 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
