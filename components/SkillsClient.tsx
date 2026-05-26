"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ExternalSkill } from "@/data/external-skills";

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
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2L2 5l1.5 12 8.5 5 8.5-5L22 5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6l-4 8h8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "anthropic",
    name: "Anthropic",
    skills: anthropicSkills,
    repoPath: "anthropic/skills",
    icon: (
      <svg viewBox="0 0 58 58" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M20.9291783,34.560802 C20.9291783,34.560802 28.5123327,15.0258118 28.5123327,15.0258118 C28.5123327,15.0258118 36.0954888,34.560802 36.0954888,34.560802 C36.0954888,34.560802 20.9291783,34.560802 20.9291783,34.560802 C20.9291783,34.560802 20.9291783,34.560802 20.9291783,34.560802 Z M22.1586029,0.970173587 C22.1586029,0.970173587 0,56.5576044 0,56.5576044 C0,56.5576044 12.3897529,56.5576044 12.3897529,56.5576044 C12.3897529,56.5576044 16.9215463,44.8841814 16.9215463,44.8841814 C16.9215463,44.8841814 40.1038712,44.8841814 40.1038712,44.8841814 C40.1038712,44.8841814 44.6349124,56.5576044 44.6349124,56.5576044 C44.6349124,56.5576044 57.0246654,56.5576044 57.0246654,56.5576044 C57.0246654,56.5576044 34.8660642,0.970173587 34.8660642,0.970173587 C34.8660642,0.970173587 22.1586029,0.970173587 22.1586029,0.970173587 C22.1586029,0.970173587 22.1586029,0.970173587 22.1586029,0.970173587 Z" />
      </svg>
    )
  },
  {
    id: "auth0",
    name: "Auth0",
    skills: auth0Skills,
    repoPath: "auth0/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M12 2C9.5 3.5 6.5 4.5 3.5 5C3.5 11.5 6.5 18 12 22C17.5 18 20.5 11.5 20.5 5C17.5 4.5 14.5 3.5 12 2ZM12 6.5C13.5 6.5 14.5 7.5 14.5 9C14.5 10.5 13.5 11.5 12 11.5C10.5 11.5 9.5 10.5 9.5 9C9.5 7.5 10.5 6.5 12 6.5ZM12 18.5C9.5 18.5 7.5 16.5 7.5 14C7.5 12.5 8.5 11 10 10C10.5 11.5 11 12.5 12 12.5C13 12.5 13.5 11.5 14 10C15.5 11 16.5 12.5 16.5 14C16.5 16.5 14.5 18.5 12 18.5Z"/>
      </svg>
    )
  },
  {
    id: "better-auth",
    name: "Better Auth",
    skills: betterAuthSkills,
    repoPath: "better-auth/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L14 9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "brave",
    name: "Brave",
    skills: braveSkills,
    repoPath: "brave/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <circle cx="11" cy="11" r="8" />
        <path d="M21 21l-4.3-4.3" />
      </svg>
    )
  },
  {
    id: "browserbase",
    name: "Browserbase",
    skills: browserbaseSkills,
    repoPath: "browserbase/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3 9h18" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 21V9" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "callstack",
    name: "Callstack",
    skills: callstackSkills,
    repoPath: "callstack/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "clickhouse",
    name: "Clickhouse",
    skills: clickhouseSkills,
    repoPath: "clickhouse/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <ellipse cx="12" cy="5" rx="9" ry="3"/>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>
      </svg>
    )
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    skills: cloudflareSkills,
    repoPath: "cloudflare/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M17.5 19A4.5 4.5 0 0 1 13 14.5a3.5 3.5 0 0 1 5.5-2.9 5.5 5.5 0 0 0-10.5-1.6A4.5 4.5 0 0 0 4 14.5a4.5 4.5 0 0 0 4.5 4.5Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "coderabbitai",
    name: "Coderabbitai",
    skills: coderabbitaiSkills,
    repoPath: "coderabbitai/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M9 12a3 3 0 1 1 6 0 3 3 0 0 1-6 0Z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "coinbase",
    name: "Coinbase",
    skills: coinbaseSkills,
    repoPath: "coinbase/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M17 12h.01M17 12a1 1 0 1 1-1-1 1 1 0 0 1 1 1Z" fill="currentColor"/>
        <path d="M22 11c-1 0-2 1-2 2s1 2 2 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "composiohq",
    name: "Composio",
    skills: composiohqSkills,
    repoPath: "composiohq/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "expo",
    name: "Expo",
    skills: expoSkills,
    repoPath: "expo/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 18h.01" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "firecrawl",
    name: "Firecrawl",
    skills: firecrawlSkills,
    repoPath: "firecrawl/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "getsentry",
    name: "Sentry",
    skills: getsentrySkills,
    repoPath: "getsentry/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2L2 7l10 5 10-5-10-5z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "google-gemini",
    name: "Google Gemini",
    skills: googleGeminiSkills,
    repoPath: "google-gemini/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 3v4M12 17v4M3 12h4M17 12h4M18.36 5.64l-2.82 2.82M8.46 15.54l-2.82 2.82M18.36 18.36l-2.82-2.82M8.46 8.46L5.64 5.64M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "google-labs-code",
    name: "Google Labs",
    skills: googleLabsCodeSkills,
    repoPath: "google-labs-code/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M6 3h12M9 3v6L4.2 18.6C3.7 19.5 4.3 21 5.4 21h13.2c1.1 0 1.7-1.5 1.2-2.4L15 9V3M6 14h12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "googleworkspace",
    name: "Google Workspace",
    skills: googleWorkspaceSkills,
    repoPath: "googleworkspace/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="3" y="3" width="18" height="18" rx="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 3v18M3 9h18" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "hashicorp",
    name: "HashiCorp",
    skills: hashicorpSkills,
    repoPath: "hashicorp/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2L2 7l10 5 10-5-10-5zm0 10v10M2 17l10 5 10-5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    skills: huggingfaceSkills,
    repoPath: "huggingface/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <circle cx="12" cy="12" r="10"/>
        <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "microsoft",
    name: "Microsoft",
    skills: microsoftSkills,
    repoPath: "microsoft/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
      </svg>
    )
  },
  {
    id: "neondatabase",
    name: "Neon",
    skills: neondatabaseSkills,
    repoPath: "neondatabase/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "netlify",
    name: "Netlify",
    skills: netlifySkills,
    repoPath: "netlify/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2L2 12l10 10 10-10L12 2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 6v12M6 12h12" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "remotion-dev",
    name: "Remotion",
    skills: remotionDevSkills,
    repoPath: "remotion-dev/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="2" y="2" width="20" height="20" rx="2" ry="2"/>
        <path d="M7 2v20M17 2v20M2 12h20M2 7h5M2 17h5M17 17h5M17 7h5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "replicate",
    name: "Replicate",
    skills: replicateSkills,
    repoPath: "replicate/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
        <path d="M10 6h4M10 18h4" strokeLinecap="round"/>
      </svg>
    )
  },
  {
    id: "sanity-io",
    name: "Sanity",
    skills: sanityIoSkills,
    repoPath: "sanity-io/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    )
  },
  {
    id: "stripe",
    name: "Stripe",
    skills: stripeSkills,
    repoPath: "stripe/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "supabase",
    name: "Supabase",
    skills: supabaseSkills,
    repoPath: "supabase/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "tinybirdco",
    name: "Tinybird",
    skills: tinybirdcoSkills,
    repoPath: "tinybirdco/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 10h3l-4 4-4-4h3V8h2v4z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "trailofbits",
    name: "Trail of Bits",
    skills: trailofbitsSkills,
    repoPath: "trailofbits/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "trycourier",
    name: "Courier",
    skills: trycourierSkills,
    repoPath: "trycourier/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "typefully",
    name: "Typefully",
    skills: typefullySkills,
    repoPath: "typefully/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "veniceai",
    name: "Venice AI",
    skills: veniceaiSkills,
    repoPath: "veniceai/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M8 12a4 4 0 0 1 8 0" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  {
    id: "vercel-labs",
    name: "Vercel",
    skills: vercelLabsSkills,
    repoPath: "vercel-labs/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shrink-0">
        <path d="M24 22.5L12 1.5L0 22.5H24Z"/>
      </svg>
    )
  },
  {
    id: "voltagent",
    name: "VoltAgent",
    skills: voltagentSkills,
    repoPath: "voltagent/skills",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4 shrink-0">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  }
];

export default function SkillsClient({ skills }: { skills: ExternalSkill[] }) {
  const [query, setQuery] = useState("");
  const [provider, setProvider] = useState<string>("All");

  const providerSkillsMap = useMemo(() => {
    const map = new Map<string, Set<string>>();
    PROVIDER_LIST.forEach((p) => {
      map.set(p.id, new Set(p.skills.map((s) => s.slug)));
    });
    return map;
  }, []);

  const isSkillForProvider = (slug: string, providerId: string) => {
    return providerSkillsMap.get(providerId)?.has(slug) ?? false;
  };

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return skills.filter((skill) => {
      const matchesProvider =
        provider === "All" || isSkillForProvider(skill.slug, provider);
      const matchesQuery =
        !q ||
        skill.name.toLowerCase().includes(q) ||
        skill.description.toLowerCase().includes(q) ||
        skill.tags.some((t) => t.toLowerCase().includes(q)) ||
        skill.category.toLowerCase().includes(q);
      return matchesProvider && matchesQuery;
    });
  }, [skills, query, provider]);

  const activeProviderName = useMemo(() => {
    if (provider === "All") return "All Providers";
    return PROVIDER_LIST.find((p) => p.id === provider)?.name || provider;
  }, [provider]);

  return (
    <div className="flex flex-col md:flex-row gap-10 w-full items-start">
      {/* Sidebar - Providers Filter Only */}
      <aside className="w-full md:w-72 shrink-0 md:sticky md:top-24 flex flex-col gap-6 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-black/8 dark:border-white/10 md:pr-8">
        <div className="flex flex-col gap-3">
          <h3 className="font-mono text-[10px] text-black/40 dark:text-white/30 tracking-widest uppercase font-semibold">
            Providers
          </h3>
          <div className="flex flex-col gap-1.5">
            {/* All Providers */}
            <button
              onClick={() => setProvider("All")}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                provider === "All"
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
              <span className={`text-[10px] opacity-75 font-mono ${provider === "All" ? "text-white/70 dark:text-black/70" : "text-black/40 dark:text-white/40"}`}>
                {skills.length}
              </span>
            </button>

            {/* Providers List with scrollbar for premium aesthetics */}
            <div className="flex flex-col gap-1.5 max-h-[60vh] overflow-y-auto pr-1 mt-1 scrollbar-thin scrollbar-thumb-black/10 dark:scrollbar-thumb-white/10 scrollbar-track-transparent">
              {PROVIDER_LIST.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setProvider(p.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-xs font-mono transition-all flex items-center justify-between cursor-pointer ${
                    provider === p.id
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
            </div>
          </div>
        </div>
      </aside>

      {/* Main Grid Content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
        {/* Active Filter Status, Count & Search Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-black/5 dark:border-white/5 pb-4 gap-4">
          <div className="flex flex-col gap-0.5">
            <h2 className="text-xs font-mono font-semibold text-black/80 dark:text-white/90">
              {activeProviderName}
            </h2>
            <p className="text-[11px] text-black/40 dark:text-white/40">
              Showing {filtered.length} of {skills.length} skills
              {query && ` matching "${query}"`}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Search Input */}
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

            {(provider !== "All" || query) && (
              <button
                onClick={() => {
                  setProvider("All");
                  setQuery("");
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
          <div className="flex flex-col">
            {filtered.map((skill, index) => {
              const matchedProd = PROVIDER_LIST.find((p) =>
                isSkillForProvider(skill.slug, p.id)
              );
              const sourcePath = matchedProd ? matchedProd.repoPath : "external/skills";
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
                    {/* One line tagline */}
                    <h3 className="text-sm text-black/60 dark:text-white/50 leading-relaxed mt-1.5 max-w-2xl font-mono">
                      {skill.tagline}
                    </h3>
                  </div>
                </Link>
              );
            })}
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
