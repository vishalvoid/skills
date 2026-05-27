"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalSkill } from "@/data/external-skills";
import { skills as mySkills } from "@/data/skills";
import type { Skill } from "@/lib/types";

import { angularSkills } from "@/data/external/angular";
import { anthropicSkills } from "@/data/external/anthropic";
import { auth0Skills } from "@/data/external/auth0";
import { betterAuthSkills } from "@/data/external/better-auth";
import { braveSkills } from "@/data/external/brave";
import { browserbaseSkills } from "@/data/external/browserbase";
import { callstackSkills } from "@/data/external/callstack";
import { clickhouseSkills } from "@/data/external/clickhouse";
import { cloudflareSkills } from "@/data/external/cloudflare";
import { coderabbitaiSkills } from "@/data/external/coderabbitai";
import { coinbaseSkills } from "@/data/external/coinbase";
import { composiohqSkills } from "@/data/external/composiohq";
import { expoSkills } from "@/data/external/expo";
import { firecrawlSkills } from "@/data/external/firecrawl";
import { getsentrySkills } from "@/data/external/getsentry";
import { googleGeminiSkills } from "@/data/external/google-gemini";
import { googleLabsCodeSkills } from "@/data/external/google-labs-code";
import { googleWorkspaceSkills } from "@/data/external/googleworkspace";
import { hashicorpSkills } from "@/data/external/hashicorp";
import { huggingfaceSkills } from "@/data/external/huggingface";
import { microsoftSkills } from "@/data/external/microsoft";
import { neondatabaseSkills } from "@/data/external/neondatabase";
import { netlifySkills } from "@/data/external/netlify";
import { remotionDevSkills } from "@/data/external/remotion-dev";
import { replicateSkills } from "@/data/external/replicate";
import { sanityIoSkills } from "@/data/external/sanity-io";
import { stripeSkills } from "@/data/external/stripe";
import { supabaseSkills } from "@/data/external/supabase";
import { tinybirdcoSkills } from "@/data/external/tinybirdco";
import { trailofbitsSkills } from "@/data/external/trailofbits";
import { trycourierSkills } from "@/data/external/trycourier";
import { typefullySkills } from "@/data/external/typefully";
import { veniceaiSkills } from "@/data/external/veniceai";
import { vercelLabsSkills } from "@/data/external/vercel-labs";
import { voltagentSkills } from "@/data/external/voltagent";
import { minimaxAiSkills } from "@/data/external/minimax-ai";
import { wordpressSkills } from "@/data/external/wordpress";
import { addyosmaniSkills } from "@/data/external/addyosmani";
import { apollographqlSkills } from "@/data/external/apollographql";
import { binanceSkills } from "@/data/external/binance";
import { datadogLabsSkills } from "@/data/external/datadog-labs";
import { duckdbSkills } from "@/data/external/duckdb";
import { falAiCommunitySkills } from "@/data/external/fal-ai-community";
import { figmaSkills } from "@/data/external/figma";
import { firebaseSkills } from "@/data/external/firebase";
import { flutterSkills } from "@/data/external/flutter";
import { garrytanSkills } from "@/data/external/garrytan";
import { greensockSkills } from "@/data/external/greensock";
import { makenotionSkills } from "@/data/external/makenotion";
import { mongodbSkills } from "@/data/external/mongodb";
import { openaiSkills } from "@/data/external/openai";

interface ProviderItem {
  id: string;
  name: string;
  skills: ExternalSkill[];
  repoPath: string;
  icon: React.ReactNode;
}

const PROVIDER_LIST: ProviderItem[] = [
  {
    id: "angular",
    name: "Angular",
    skills: angularSkills,
    repoPath: "angular/skills",
    icon: (
      <img src="https://github.com/angular.png?size=32" alt="Angular" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "anthropic",
    name: "Anthropic",
    skills: anthropicSkills,
    repoPath: "anthropic/skills",
    icon: (
      <img src="https://github.com/anthropics.png?size=32" alt="Anthropic" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "auth0",
    name: "Auth0",
    skills: auth0Skills,
    repoPath: "auth0/skills",
    icon: (
      <img src="https://github.com/auth0.png?size=32" alt="Auth0" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "better-auth",
    name: "Better Auth",
    skills: betterAuthSkills,
    repoPath: "better-auth/skills",
    icon: (
      <img src="https://github.com/better-auth.png?size=32" alt="Better Auth" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "brave",
    name: "Brave",
    skills: braveSkills,
    repoPath: "brave/skills",
    icon: (
      <img src="https://github.com/brave.png?size=32" alt="Brave" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "browserbase",
    name: "Browserbase",
    skills: browserbaseSkills,
    repoPath: "browserbase/skills",
    icon: (
      <img src="https://github.com/browserbase.png?size=32" alt="Browserbase" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "callstack",
    name: "Callstack",
    skills: callstackSkills,
    repoPath: "callstack/skills",
    icon: (
      <img src="https://github.com/callstack.png?size=32" alt="Callstack" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "clickhouse",
    name: "Clickhouse",
    skills: clickhouseSkills,
    repoPath: "clickhouse/skills",
    icon: (
      <img src="https://github.com/ClickHouse.png?size=32" alt="ClickHouse" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    skills: cloudflareSkills,
    repoPath: "cloudflare/skills",
    icon: (
      <img src="https://github.com/cloudflare.png?size=32" alt="Cloudflare" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "coderabbitai",
    name: "Coderabbitai",
    skills: coderabbitaiSkills,
    repoPath: "coderabbitai/skills",
    icon: (
      <img src="https://github.com/coderabbitai.png?size=32" alt="CodeRabbit" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "coinbase",
    name: "Coinbase",
    skills: coinbaseSkills,
    repoPath: "coinbase/skills",
    icon: (
      <img src="https://github.com/coinbase.png?size=32" alt="Coinbase" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "composiohq",
    name: "Composio",
    skills: composiohqSkills,
    repoPath: "composiohq/skills",
    icon: (
      <img src="https://github.com/composiohq.png?size=32" alt="Composio" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "expo",
    name: "Expo",
    skills: expoSkills,
    repoPath: "expo/skills",
    icon: (
      <img src="https://github.com/expo.png?size=32" alt="Expo" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "firecrawl",
    name: "Firecrawl",
    skills: firecrawlSkills,
    repoPath: "firecrawl/skills",
    icon: (
      <img src="https://github.com/firecrawl.png?size=32" alt="Firecrawl" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "getsentry",
    name: "Sentry",
    skills: getsentrySkills,
    repoPath: "getsentry/skills",
    icon: (
      <img src="https://github.com/getsentry.png?size=32" alt="Sentry" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    skills: googleGeminiSkills,
    repoPath: "google-gemini/skills",
    icon: (
      <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none">
        <defs>
          <linearGradient id="gemini-grad-sidebar" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9B51E0" />
            <stop offset="50%" stopColor="#4285F4" />
            <stop offset="100%" stopColor="#EA4335" />
          </linearGradient>
        </defs>
        <path d="M12 2c0 5.5-4.5 10-10 10 5.5 0 10 4.5 10 10 0-5.5 4.5-10 10-10-5.5 0-10-4.5-10-10z" fill="url(#gemini-grad-sidebar)" />
      </svg>
    )
  },
  {
    id: "google-labs-code",
    name: "Google Labs",
    skills: googleLabsCodeSkills,
    repoPath: "google-labs-code/skills",
    icon: (
      <img src="https://github.com/google.png?size=32" alt="Google Labs" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "googleworkspace",
    name: "Google Workspace",
    skills: googleWorkspaceSkills,
    repoPath: "googleworkspace/skills",
    icon: (
      <img src="https://github.com/google.png?size=32" alt="Google Workspace" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "hashicorp",
    name: "HashiCorp",
    skills: hashicorpSkills,
    repoPath: "hashicorp/skills",
    icon: (
      <img src="https://github.com/hashicorp.png?size=32" alt="HashiCorp" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    skills: huggingfaceSkills,
    repoPath: "huggingface/skills",
    icon: (
      <img src="https://github.com/huggingface.png?size=32" alt="Hugging Face" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "microsoft",
    name: "Microsoft",
    skills: microsoftSkills,
    repoPath: "microsoft/skills",
    icon: (
      <img src="https://github.com/microsoft.png?size=32" alt="Microsoft" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "neondatabase",
    name: "Neon",
    skills: neondatabaseSkills,
    repoPath: "neondatabase/skills",
    icon: (
      <img src="https://github.com/neondatabase.png?size=32" alt="Neon" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "netlify",
    name: "Netlify",
    skills: netlifySkills,
    repoPath: "netlify/skills",
    icon: (
      <img src="https://github.com/netlify.png?size=32" alt="Netlify" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "remotion-dev",
    name: "Remotion",
    skills: remotionDevSkills,
    repoPath: "remotion-dev/skills",
    icon: (
      <img src="https://github.com/remotion.png?size=32" alt="Remotion" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "replicate",
    name: "Replicate",
    skills: replicateSkills,
    repoPath: "replicate/skills",
    icon: (
      <img src="https://github.com/replicate.png?size=32" alt="Replicate" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "sanity-io",
    name: "Sanity",
    skills: sanityIoSkills,
    repoPath: "sanity-io/skills",
    icon: (
      <img src="https://github.com/sanity-io.png?size=32" alt="Sanity" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "stripe",
    name: "Stripe",
    skills: stripeSkills,
    repoPath: "stripe/skills",
    icon: (
      <img src="https://github.com/stripe.png?size=32" alt="Stripe" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "supabase",
    name: "Supabase",
    skills: supabaseSkills,
    repoPath: "supabase/skills",
    icon: (
      <img src="https://github.com/supabase.png?size=32" alt="Supabase" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "tinybirdco",
    name: "Tinybird",
    skills: tinybirdcoSkills,
    repoPath: "tinybirdco/skills",
    icon: (
      <img src="https://github.com/tinybirdco.png?size=32" alt="Tinybird" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "trailofbits",
    name: "Trail of Bits",
    skills: trailofbitsSkills,
    repoPath: "trailofbits/skills",
    icon: (
      <img src="https://github.com/trailofbits.png?size=32" alt="Trail of Bits" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "trycourier",
    name: "Courier",
    skills: trycourierSkills,
    repoPath: "trycourier/skills",
    icon: (
      <img src="https://github.com/trycourier.png?size=32" alt="Courier" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "typefully",
    name: "Typefully",
    skills: typefullySkills,
    repoPath: "typefully/skills",
    icon: (
      <img src="https://github.com/typefully.png?size=32" alt="Typefully" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "veniceai",
    name: "Venice AI",
    skills: veniceaiSkills,
    repoPath: "veniceai/skills",
    icon: (
      <img src="https://github.com/veniceai.png?size=32" alt="Venice AI" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "vercel-labs",
    name: "Vercel",
    skills: vercelLabsSkills,
    repoPath: "vercel-labs/skills",
    icon: (
      <img src="https://github.com/vercel.png?size=32" alt="Vercel" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "voltagent",
    name: "VoltAgent",
    skills: voltagentSkills,
    repoPath: "voltagent/skills",
    icon: (
      <img src="https://github.com/voltagent.png?size=32" alt="VoltAgent" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "minimax-ai",
    name: "MiniMax AI",
    skills: minimaxAiSkills,
    repoPath: "MiniMax-AI/skills",
    icon: (
      <img src="https://github.com/MiniMax-AI.png?size=32" alt="MiniMax AI" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "wordpress",
    name: "WordPress",
    skills: wordpressSkills,
    repoPath: "WordPress/agent-skills",
    icon: (
      <img src="https://github.com/WordPress.png?size=32" alt="WordPress" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "addyosmani",
    name: "Addy Osmani",
    skills: addyosmaniSkills,
    repoPath: "addyosmani/web-quality-skills",
    icon: (
      <img src="https://github.com/addyosmani.png?size=32" alt="Addy Osmani" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "apollographql",
    name: "Apollo GraphQL",
    skills: apollographqlSkills,
    repoPath: "apollographql/skills",
    icon: (
      <img src="https://github.com/apollographql.png?size=32" alt="Apollo GraphQL" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "binance",
    name: "Binance",
    skills: binanceSkills,
    repoPath: "binance/binance-skills-hub",
    icon: (
      <img src="https://github.com/binance.png?size=32" alt="Binance" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "datadog-labs",
    name: "Datadog Labs",
    skills: datadogLabsSkills,
    repoPath: "datadog-labs/agent-skills",
    icon: (
      <img src="https://github.com/datadog.png?size=32" alt="Datadog Labs" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "duckdb",
    name: "DuckDB",
    skills: duckdbSkills,
    repoPath: "duckdb/duckdb-skills",
    icon: (
      <img src="https://github.com/duckdb.png?size=32" alt="DuckDB" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "fal-ai-community",
    name: "fal.ai",
    skills: falAiCommunitySkills,
    repoPath: "fal-ai-community/skills",
    icon: (
      <img src="https://github.com/fal-ai.png?size=32" alt="fal.ai" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "figma",
    name: "Figma",
    skills: figmaSkills,
    repoPath: "figma/mcp-server-guide",
    icon: (
      <img src="https://github.com/figma.png?size=32" alt="Figma" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "firebase",
    name: "Firebase",
    skills: firebaseSkills,
    repoPath: "firebase/agent-skills",
    icon: (
      <img src="https://github.com/firebase.png?size=32" alt="Firebase" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "flutter",
    name: "Flutter",
    skills: flutterSkills,
    repoPath: "flutter/skills",
    icon: (
      <img src="https://github.com/flutter.png?size=32" alt="Flutter" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "garrytan",
    name: "Garry Tan",
    skills: garrytanSkills,
    repoPath: "garrytan/gstack",
    icon: (
      <img src="https://github.com/garrytan.png?size=32" alt="Garry Tan" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "greensock",
    name: "GSAP / GreenSock",
    skills: greensockSkills,
    repoPath: "greensock/gsap-skills",
    icon: (
      <img src="https://github.com/greensock.png?size=32" alt="GSAP / GreenSock" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "makenotion",
    name: "Notion",
    skills: makenotionSkills,
    repoPath: "makenotion/notion-cookbook",
    icon: (
      <img src="https://github.com/makenotion.png?size=32" alt="Notion" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "mongodb",
    name: "MongoDB",
    skills: mongodbSkills,
    repoPath: "mongodb/agent-skills",
    icon: (
      <img src="https://github.com/mongodb.png?size=32" alt="MongoDB" className="w-4 h-4 rounded-full shrink-0" />
    )
  },
  {
    id: "openai",
    name: "OpenAI",
    skills: openaiSkills,
    repoPath: "openai/skills",
    icon: (
      <img src="https://github.com/openai.png?size=32" alt="OpenAI" className="w-4 h-4 rounded-full shrink-0" />
    )
  }
];

const TOTAL_SKILLS = PROVIDER_LIST.reduce((acc, p) => acc + p.skills.length, 0) + mySkills.length;

type FilteredItem =
  | { kind: "personal"; skill: Skill; href: string; repoPath: string }
  | { kind: "external"; skill: ExternalSkill; repoPath: string; href: string };

function matchesPersonal(skill: Skill, q: string): boolean {
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.slug.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q) ||
    skill.tags.some((t) => t.toLowerCase().includes(q))
  );
}

function matchesQuery(skill: ExternalSkill, q: string): boolean {
  return (
    skill.name.toLowerCase().includes(q) ||
    skill.slug.toLowerCase().includes(q) ||
    skill.description.toLowerCase().includes(q) ||
    skill.tags.some((t) => t.toLowerCase().includes(q)) ||
    skill.category.toLowerCase().includes(q)
  );
}

export default function SkillsClient() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState("all");
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const selectProvider = (id: string) => {
    setSelectedId(id);
    setSelectedCategory("all");
  };

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};

    if (selectedId === "all" || selectedId === "vishalvoid") {
      for (const skill of mySkills) {
        const cat = skill.category ?? "Other";
        counts[cat] = (counts[cat] ?? 0) + 1;
      }
    }

    if (selectedId !== "vishalvoid") {
      const pool = selectedId === "all" ? PROVIDER_LIST : PROVIDER_LIST.filter((p) => p.id === selectedId);
      for (const p of pool) {
        for (const skill of p.skills) {
          const cat = skill.category ?? "Other";
          counts[cat] = (counts[cat] ?? 0) + 1;
        }
      }
    }

    return counts;
  }, [selectedId]);

  const availableCategories = useMemo(() => {
    return Object.keys(categoryCounts).sort();
  }, [categoryCounts]);

  const displayedProviders = isExpanded ? PROVIDER_LIST : PROVIDER_LIST.slice(0, 11);
  const remainingCount = PROVIDER_LIST.length - 11;

  const filtered = useMemo((): FilteredItem[] => {
    const q = query.toLowerCase().trim();
    const results: FilteredItem[] = [];

    // Personal skills always first
    if (selectedId === "all" || selectedId === "vishalvoid") {
      for (const skill of mySkills) {
        if (selectedCategory !== "all" && skill.category !== selectedCategory) {
          continue;
        }
        if (!q || matchesPersonal(skill, q)) {
          results.push({ kind: "personal", skill, href: `/${skill.slug}`, repoPath: "vishalvoid" });
        }
      }
    }

    // External provider skills
    if (selectedId !== "vishalvoid") {
      const pool = selectedId === "all" ? PROVIDER_LIST : PROVIDER_LIST.filter((p) => p.id === selectedId);
      for (const p of pool) {
        for (const skill of p.skills) {
          if (selectedCategory !== "all" && skill.category !== selectedCategory) {
            continue;
          }
          if (!q || matchesQuery(skill, q)) {
            results.push({ kind: "external", skill, repoPath: p.repoPath, href: `/skills/${p.id}/${skill.slug}` });
          }
        }
      }
    }

    return results;
  }, [selectedId, query, selectedCategory]);

  const activeProviderName =
    selectedId === "all" ? "All Providers" :
    selectedId === "vishalvoid" ? "vishalvoid" :
    PROVIDER_LIST.find((p) => p.id === selectedId)?.name ?? selectedId;

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full items-start">
      {/* Sidebar - Providers Filter */}
      <aside className="w-full md:w-72 shrink-0 md:sticky md:top-24 flex flex-col gap-6 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-black/8 dark:border-white/10 md:pr-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-[10px] text-black/40 dark:text-white/30 tracking-widest uppercase font-semibold">
            Providers
          </h3>
          <div className="flex flex-col gap-1.5">
            {/* All Providers */}
            <button
              onClick={() => selectProvider("all")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === "all"
                  ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                  : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                All Providers
              </span>
              <span className={`text-[10px] opacity-75 font-mono ${selectedId === "all" ? "text-white/70 dark:text-black/70" : "text-black/40 dark:text-white/40"}`}>
                {TOTAL_SKILLS}
              </span>
            </button>

            {/* vishalvoid — personal skills */}
            <button
              onClick={() => selectProvider("vishalvoid")}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === "vishalvoid"
                  ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                  : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                }`}
            >
              <span className="flex items-center gap-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="8" r="4" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                vishalvoid
              </span>
              <span className="text-[10px] opacity-60 font-mono">{mySkills.length}</span>
            </button>

            {/* Providers List with scrollbar for premium aesthetics */}
            <div className="flex flex-col gap-1.5 max-h-[75vh] overflow-y-auto pr-1 mt-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {displayedProviders.map((p) => (
                <button
                  key={p.id}
                  onClick={() => selectProvider(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${selectedId === p.id
                      ? "bg-black dark:bg-white text-white dark:text-black font-semibold shadow-sm"
                      : "text-black/60 dark:text-white/50 hover:bg-black/5 dark:hover:bg-white/5"
                    }`}
                >
                  <span className="flex items-center gap-2">
                    {p.icon}
                    {p.name}
                  </span>
                  <span className="text-[10px] opacity-60 font-mono">
                    {p.skills.length}
                  </span>
                </button>
              ))}

              {!isExpanded && remainingCount > 0 && (
                <button
                  onClick={() => setIsExpanded(true)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-black/50 dark:text-white/40 hover:text-black/80 dark:hover:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-dashed border-black/10 dark:border-white/10 mt-1"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0 opacity-60">
                      <path d="M12 5v14M5 12h14" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Show more
                  </span>
                  <span className="text-[10px] opacity-65 bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded font-mono font-medium">
                    +{remainingCount}
                  </span>
                </button>
              )}

              {isExpanded && PROVIDER_LIST.length > 11 && (
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-full text-left px-3 py-2 rounded-lg text-xs font-mono text-black/55 dark:text-white/45 hover:text-black/85 dark:hover:text-white/90 hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center justify-between cursor-pointer border border-dashed border-black/10 dark:border-white/10 mt-1"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-3.5 h-3.5 shrink-0 opacity-60">
                      <path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Show less
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
        {/* Header + Categories + Search */}
        <div className="flex flex-col gap-4 border-b border-black/5 dark:border-white/5 pb-5">
          {/* Title row */}
          <div className="flex items-start justify-between gap-4">
            <div className="flex flex-col gap-1">
              <h2 className="font-mono text-xl font-bold tracking-tight text-black dark:text-white leading-none">
                {activeProviderName}
              </h2>
              <p className="font-mono text-[11px] text-black/38 dark:text-white/32 leading-snug">
                {selectedId === "all"
                  ? "every community-curated agent skill, in one place"
                  : selectedId === "vishalvoid"
                  ? "personal patterns, techniques & hard-won recipes"
                  : `open-source skills from ${PROVIDER_LIST.find((p) => p.id === selectedId)?.repoPath ?? selectedId}`}
              </p>
            </div>
            <div className="flex flex-col items-end gap-0.5 shrink-0 pt-0.5">
              <span className="font-mono text-3xl font-bold text-black/90 dark:text-white/90 leading-none tabular-nums">
                {filtered.length}
              </span>
              <span className="font-mono text-[10px] text-black/32 dark:text-white/28 leading-none">
                {query ? `of ${TOTAL_SKILLS}` : "skills"}
              </span>
            </div>
          </div>

          {/* Categories — above search */}
          {availableCategories.length > 0 && (
            <div className="flex items-center gap-1.5 overflow-x-auto pb-0.5 -mx-1 px-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === "all"
                    ? "bg-black dark:bg-white text-white dark:text-black font-semibold border-transparent shadow-sm"
                    : "bg-black/[0.03] dark:bg-white/[0.04] text-black/55 dark:text-white/45 border-black/6 dark:border-white/10 hover:bg-black/7 dark:hover:bg-white/8"
                }`}
              >
                All
                <span className={`tabular-nums text-[10px] font-medium ${selectedCategory === "all" ? "opacity-65" : "opacity-50"}`}>
                  {Object.values(categoryCounts).reduce((a, b) => a + b, 0)}
                </span>
              </button>
              {availableCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer whitespace-nowrap border ${
                    selectedCategory === cat
                      ? "bg-black dark:bg-white text-white dark:text-black font-semibold border-transparent shadow-sm"
                      : "bg-black/[0.03] dark:bg-white/[0.04] text-black/55 dark:text-white/45 border-black/6 dark:border-white/10 hover:bg-black/7 dark:hover:bg-white/8"
                  }`}
                >
                  {cat}
                  <span className={`tabular-nums text-[10px] font-medium ${selectedCategory === cat ? "opacity-65" : "opacity-50"}`}>
                    {categoryCounts[cat] ?? 0}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Search */}
          <div className="flex items-center gap-3 w-full">
            <div className="relative w-full">
              <svg
                width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-black/25 dark:text-white/25 pointer-events-none"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
              <input
                id="search-input"
                type="search"
                placeholder="Search skills..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-black/[0.02] dark:bg-white/[0.03] border border-black/8 dark:border-white/10 rounded-lg pl-9 pr-4 py-2 font-mono text-xs text-black/70 dark:text-white/70 placeholder-black/30 dark:placeholder-white/25 focus:outline-none focus:border-black/20 dark:focus:border-white/20 focus:bg-white dark:focus:bg-black/20 transition-all duration-200"
              />
            </div>

            {(selectedId !== "all" || query || selectedCategory !== "all") && (
              <button
                onClick={() => {
                  selectProvider("all");
                  setQuery("");
                  setSelectedCategory("all");
                }}
                className="text-[10px] font-mono text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors flex items-center gap-1 cursor-pointer shrink-0"
              >
                Clear
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* List of Skills */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-black/[0.01] dark:bg-white/[0.01] border border-dashed border-black/8 dark:border-white/8 rounded-xl flex flex-col gap-2 items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-black/30 dark:text-white/30">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35M15 9l-6 6" />
            </svg>
            <span className="font-mono text-xs text-black/40 dark:text-white/45">
              No skills found matching those filters.
            </span>
          </div>
        ) : (
          <div className="flex flex-col w-full">
            {filtered.map((item, index) => (
              <Link
                key={`${index}-${item.repoPath}-${item.skill.slug}`}
                href={item.href}
                className="group flex gap-4 py-4 border-b border-black/5 dark:border-white/5 last:border-none hover:bg-black/[0.06] dark:hover:bg-white/[0.08] px-4 rounded-xl -mx-4 transition-all duration-150 cursor-pointer w-full"
              >
                {/* Index Number */}
                <div className="font-mono text-sm text-black/35 dark:text-white/30 w-8 shrink-0 pt-0.5 text-right select-none">
                  {index + 1}
                </div>

                {/* Details */}
                <div className="flex-1 flex flex-col gap-0.5 min-w-0">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="font-mono text-base font-bold text-black dark:text-white w-fit truncate">
                      {item.skill.slug}
                    </span>
                    <span className={`font-mono text-xs font-medium tracking-wide ${item.kind === "personal" ? "text-blue-500 dark:text-blue-400" : "text-black/35 dark:text-white/40"}`}>
                      {item.repoPath}
                    </span>
                  </div>
                  
                  <h3 className="text-sm text-black/60 dark:text-white/50 leading-relaxed mt-1.5 w-full font-mono">
                    {item.skill.tagline}
                  </h3>

                  <div className="flex items-center gap-2 mt-1.5 font-mono text-[10px] text-black/45 dark:text-white/40">
                    {item.kind === "external" && item.skill.difficulty && (
                      <>
                        <span>{item.skill.difficulty}</span>
                        {item.skill.category && <span>•</span>}
                      </>
                    )}
                    {item.skill.category && (
                      <span>{item.skill.category}</span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Back to home */}
        <div className="border-t border-black/8 dark:border-white/8 pt-6 mt-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 font-mono text-xs text-black/35 dark:text-white/30 hover:text-black/70 dark:hover:text-white/60 transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
            Back to my patterns
          </Link>
        </div>
      </div>
    </div>
  );
}
