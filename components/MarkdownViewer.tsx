"use client";

import { useState } from "react";
import CollapsibleMarkdown from "./CollapsibleMarkdown";

interface MarkdownChunk {
  html: string;
  startLine: number;
  endLine: number;
}

interface MarkdownViewerProps {
  chunks: MarkdownChunk[];
  rawText: string;
}

export default function MarkdownViewer({ chunks, rawText }: MarkdownViewerProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy spec: ", err);
    }
  };

  return (
    <div className="border border-black/8 dark:border-white/15 rounded-lg overflow-hidden bg-black/[0.005] dark:bg-white/[0.015] shadow-sm">
      {/* Header bar that toggles collapse state on left and copy on right */}
      <div className="flex items-center justify-between bg-black/[0.015] dark:bg-white/[0.03] px-4 py-3 border-b border-black/8 dark:border-white/15 select-none">
        {/* Toggle on the left */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-1.5 text-black/60 dark:text-white/70 hover:text-black dark:hover:text-white font-mono text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer"
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`transform transition-transform ${isOpen ? "rotate-90" : ""}`}
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
          {isOpen ? "Collapse Spec" : "Expand Spec"}
        </button>

        {/* Copy button on the right */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] font-semibold text-black/55 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-2 py-1 rounded cursor-pointer active:scale-95"
        >
          {copied ? (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500">
                <path d="M20 6L9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
              Copy Spec
            </>
          )}
        </button>
      </div>

      {/* Body panel */}
      {isOpen && (
        <div className="p-6 md:p-8 bg-[#f8f9fa] dark:bg-[#0c0c0d]">
          <CollapsibleMarkdown chunks={chunks} />
        </div>
      )}
    </div>
  );
}
