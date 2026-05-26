import type { Metadata } from "next";
import Link from "next/link";
import { externalSkills } from "@/data/external-skills";
import SkillsClient from "@/components/SkillsClient";


export const metadata: Metadata = {
  title: "MCP Server Directory — Official AI Agent Skills",
  description: `Browse ${externalSkills.length}+ official MCP servers and AI agent skills from Anthropic, Stripe, Supabase, Cloudflare, Google, Microsoft and 35+ providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent.`,
  keywords: [
    "mcp servers", "mcp server directory", "official mcp servers", "ai agent skills",
    "model context protocol", "claude mcp", "cursor mcp", "copilot mcp",
    "anthropic mcp", "stripe mcp", "supabase mcp", "cloudflare mcp",
    "ai developer tools", "mcp tools list", "mcp skills directory",
  ],
  openGraph: {
    title: "MCP Server Directory — Official AI Agent Skills · skills.vishalvoid.com",
    description: `${externalSkills.length}+ official MCP servers from 35+ providers. Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible AI agent.`,
    url: "https://skills.vishalvoid.com/skills",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCP Server Directory — Official AI Agent Skills",
    description: `${externalSkills.length}+ official MCP servers from 35+ providers. Works with any MCP-compatible AI agent.`,
  },
  alternates: {
    canonical: "https://skills.vishalvoid.com/skills",
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
          Official MCP Server Directory
        </h1>
        <p className="text-black/55 dark:text-white/55 text-sm leading-relaxed max-w-xl">
          A curated index of{" "}
          <span className="text-black dark:text-white font-medium">
            {externalSkills.length}+ official MCP servers and AI agent skills
          </span>{" "}
          from Anthropic, Stripe, Supabase, Cloudflare, Google, Microsoft and 35+ providers.
          Works with Claude, Cursor, Copilot, Gemini and any MCP-compatible agent.
        </p>
      </div>

      <SkillsClient />
    </main>
  );
}
