"use client";

import { useState } from "react";

interface MarkdownChunk {
  html: string;
  startLine: number;
  endLine: number;
}

interface CollapsibleMarkdownProps {
  chunks: MarkdownChunk[];
}

export default function CollapsibleMarkdown({ chunks }: CollapsibleMarkdownProps) {
  const [expandedCount, setExpandedCount] = useState(1);

  if (!chunks || chunks.length === 0) return null;

  const visibleChunks = chunks.slice(0, expandedCount);
  const currentEndLine = chunks[expandedCount - 1].endLine;

  return (
    <div className="flex flex-col gap-6">
      {/* List of visible chunks */}
      <div className="flex flex-col gap-6">
        {visibleChunks.map((chunk, idx) => (
          <div key={idx} className="prose dark:prose-invert prose-sm max-w-none animate-fade-in">
            <div dangerouslySetInnerHTML={{ __html: chunk.html }} />
          </div>
        ))}
      </div>

      {/* Actions at the very bottom of the visible list */}
      <div className="relative flex items-center justify-center mt-2 border-t border-black/5 dark:border-white/5 pt-4">
        <div className="flex items-center gap-2">
          {/* If we have expanded beyond the first chunk, show Collapse */}
          {expandedCount > 1 && (
            <button
              onClick={() => setExpandedCount((prev) => prev - 1)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-[10px] font-bold uppercase bg-black/[0.04] dark:bg-white/[0.08] border border-black/15 dark:border-white/20 text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors cursor-pointer"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="stroke-current shrink-0">
                <path d="M18 12H6" />
              </svg>
              Collapse
            </button>
          )}

          {/* If there are more chunks left, show Read More */}
          {expandedCount < chunks.length && (
            <button
              onClick={() => setExpandedCount((prev) => prev + 1)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded font-mono text-[10px] font-bold uppercase bg-black/[0.04] dark:bg-white/[0.08] border border-black/15 dark:border-white/20 text-black dark:text-white hover:bg-black/[0.08] dark:hover:bg-white/[0.15] transition-colors cursor-pointer shadow-sm"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="stroke-current shrink-0">
                <path d="M12 5v14M5 12h14" />
              </svg>
              Read More
            </button>
          )}
        </div>

        {/* Progress indicator */}
        <div className="absolute right-0 font-mono text-[10px] text-black/35 dark:text-white/40 font-semibold uppercase tracking-wider">
          Lines 1 - {currentEndLine} of {chunks[chunks.length - 1].endLine}
        </div>
      </div>
    </div>
  );
}
