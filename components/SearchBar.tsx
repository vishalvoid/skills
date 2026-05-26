"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import { skills } from "@/data/skills";
import { externalSkills, CATEGORY_COLORS } from "@/data/external-skills";
import type { Skill } from "@/lib/types";
import type { ExternalSkill } from "@/data/external-skills";

type InternalItem = { type: "mine"; skill: Skill };
type ExternalItem = { type: "external"; skill: ExternalSkill };
type SearchItem = InternalItem | ExternalItem;

const ALL_ITEMS: SearchItem[] = [
  ...skills.map((s) => ({ type: "mine" as const, skill: s })),
  ...externalSkills.map((s) => ({ type: "external" as const, skill: s })),
];

function filterItems(query: string): SearchItem[] {
  if (!query.trim()) return ALL_ITEMS;
  const q = query.toLowerCase();
  return ALL_ITEMS.filter((item) => {
    if (item.type === "mine") {
      const s = item.skill;
      return (
        s.name.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      );
    } else {
      const s = item.skill;
      return (
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q)) ||
        s.category.toLowerCase().includes(q)
      );
    }
  });
}

export default function SearchBar() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const filtered = filterItems(query);
  const mine = filtered.filter((i) => i.type === "mine");
  const external = filtered.filter((i) => i.type === "external");

  // flat list for keyboard nav
  const flat = [...mine, ...external];

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const navigate = useCallback(
    (item: SearchItem) => {
      close();
      if (item.type === "mine") {
        router.push(`/${item.skill.slug}`);
      } else {
        router.push(`/skills/anthropic/${item.skill.slug}`);
      }
    },
    [close, router]
  );

  // Global keyboard shortcuts
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) {
        close();
        return;
      }
      if (
        e.key === "/" &&
        !open &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  // Focus input + lock body scroll when opened
  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => inputRef.current?.focus());
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Keyboard nav inside modal (Escape handled globally)
  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, flat.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter" && flat[selected]) {
      navigate(flat[selected]);
    }
  }

  // Scroll selected item into view
  useEffect(() => {
    const el = listRef.current?.querySelector(`[data-idx="${selected}"]`);
    el?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        aria-label="Search skills"
        className="flex items-center gap-1.5 h-7 px-2.5 rounded-md border border-black/15 dark:border-white/20 bg-black/4 dark:bg-white/8 hover:bg-black/8 dark:hover:bg-white/12 transition-colors text-black/55 dark:text-white/65 hover:text-black/80 dark:hover:text-white/85"
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="6.5" cy="6.5" r="4.5" />
          <path d="M11 11l3 3" />
        </svg>
        <span className="font-mono text-[11px]">search</span>
        <kbd className="hidden sm:inline-flex items-center justify-center h-4 px-1 rounded text-[10px] font-mono bg-black/6 dark:bg-white/10 border border-black/12 dark:border-white/20">
          /
        </kbd>
      </button>
    );
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-start justify-center pt-[15vh] bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={close}
      onKeyDown={onKeyDown}
    >
      {/* Modal — stopPropagation prevents clicks inside from closing */}
      <div
        className="w-full max-w-[580px] mx-4 rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-[#111] shadow-2xl shadow-black/20 dark:shadow-black/60 overflow-hidden flex flex-col max-h-[70vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-black/8 dark:border-white/8">
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-black/35 dark:text-white/30 shrink-0"
            aria-hidden="true"
          >
            <circle cx="6.5" cy="6.5" r="4.5" />
            <path d="M11 11l3 3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelected(0);
            }}
            placeholder="Search skills…"
            className="flex-1 bg-transparent text-sm text-black dark:text-white placeholder-black/30 dark:placeholder-white/25 outline-none font-sans"
            aria-label="Search skills"
          />
          <kbd className="shrink-0 inline-flex items-center justify-center h-5 px-1.5 rounded text-[10px] font-mono text-black/30 dark:text-white/25 bg-black/5 dark:bg-white/8 border border-black/8 dark:border-white/10">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="overflow-y-auto overscroll-contain">
          {flat.length === 0 ? (
            <p className="px-4 py-8 text-center text-sm text-black/35 dark:text-white/30">
              No skills match &ldquo;{query}&rdquo;
            </p>
          ) : (
            <>
              {mine.length > 0 && (
                <section>
                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-black/30 dark:text-white/25">
                      My Skills
                    </span>
                    <span className="text-[10px] font-mono text-black/20 dark:text-white/15">
                      {mine.length}
                    </span>
                  </div>
                  {mine.map((item, i) => {
                    const s = item.skill as Skill;
                    const idx = i;
                    return (
                      <button
                        key={s.slug}
                        data-idx={idx}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelected(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                          selected === idx
                            ? "bg-black/5 dark:bg-white/7"
                            : "hover:bg-black/3 dark:hover:bg-white/4"
                        }`}
                      >
                        <span className="mt-0.5 shrink-0 w-4 h-4 rounded-full bg-black/8 dark:bg-white/10 flex items-center justify-center">
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="currentColor"
                            className="text-black/50 dark:text-white/50"
                          >
                            <circle cx="4" cy="4" r="3" />
                          </svg>
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-black dark:text-white truncate">
                            {s.name}
                          </span>
                          <span className="block text-xs text-black/40 dark:text-white/35 truncate mt-0.5">
                            {s.tagline}
                          </span>
                        </span>
                        <span className="shrink-0 mt-0.5 text-[10px] font-mono text-black/25 dark:text-white/20 self-start">
                          {s.category}
                        </span>
                      </button>
                    );
                  })}
                </section>
              )}

              {external.length > 0 && (
                <section>
                  <div className="px-4 pt-3 pb-1.5 flex items-center gap-2">
                    <span className="text-[10px] font-mono font-medium tracking-wider uppercase text-black/30 dark:text-white/25">
                      External
                    </span>
                    <span className="text-[10px] font-mono text-black/20 dark:text-white/15">
                      {external.length}
                    </span>
                  </div>
                  {external.map((item, i) => {
                    const s = item.skill as ExternalSkill;
                    const idx = mine.length + i;
                    const colorCls =
                      CATEGORY_COLORS[s.category] ??
                      "text-black/40 dark:text-white/35 bg-black/5 dark:bg-white/5 border-black/10 dark:border-white/10";
                    return (
                      <button
                        key={s.slug}
                        data-idx={idx}
                        onClick={() => navigate(item)}
                        onMouseEnter={() => setSelected(idx)}
                        className={`w-full text-left px-4 py-2.5 flex items-start gap-3 transition-colors ${
                          selected === idx
                            ? "bg-black/5 dark:bg-white/7"
                            : "hover:bg-black/3 dark:hover:bg-white/4"
                        }`}
                      >
                        <span
                          className={`mt-0.5 shrink-0 inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-medium border ${colorCls}`}
                        >
                          {s.category}
                        </span>
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-medium text-black dark:text-white truncate">
                            {s.name}
                          </span>
                          <span className="block text-xs text-black/40 dark:text-white/35 truncate mt-0.5">
                            {s.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </section>
              )}
            </>
          )}
          <div className="h-2" />
        </div>

        {/* Footer hint */}
        <div className="border-t border-black/8 dark:border-white/8 px-4 py-2 flex items-center gap-3 text-[10px] font-mono text-black/25 dark:text-white/20">
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-current text-[9px]">↑</kbd>
            <kbd className="inline-flex items-center justify-center w-4 h-4 rounded border border-current text-[9px]">↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-4 px-1 rounded border border-current text-[9px]">↵</kbd>
            open
          </span>
          <span className="flex items-center gap-1">
            <kbd className="inline-flex items-center justify-center h-4 px-1 rounded border border-current text-[9px]">esc</kbd>
            close
          </span>
        </div>
      </div>
    </div>,
    document.body
  );
}
