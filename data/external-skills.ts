import { anthropicSkills } from "./external/anthropic";
import { auth0Skills } from "./external/auth0";
import { betterAuthSkills } from "./external/better-auth";
import { braveSkills } from "./external/brave";
import { browserbaseSkills } from "./external/browserbase";
import { callstackSkills } from "./external/callstack";
import { clickhouseSkills } from "./external/clickhouse";
import { cloudflareSkills } from "./external/cloudflare";
import { coderabbitaiSkills } from "./external/coderabbitai";
import { coinbaseSkills } from "./external/coinbase";
import { voltagentSkills } from "./external/voltagent";
import { googleGeminiSkills } from "./external/google-gemini";
import { tinybirdcoSkills } from "./external/tinybirdco";
import { composiohqSkills } from "./external/composiohq";
import { stripeSkills } from "./external/stripe";
import { supabaseSkills } from "./external/supabase";
import { hashicorpSkills } from "./external/hashicorp";
import { angularSkills } from "./external/angular";
import { sanityIoSkills } from "./external/sanity-io";
import { trycourierSkills } from "./external/trycourier";
import { veniceaiSkills } from "./external/veniceai";
import { firecrawlSkills } from "./external/firecrawl";
import { neondatabaseSkills } from "./external/neondatabase";
import { vercelLabsSkills } from "./external/vercel-labs";
import { replicateSkills } from "./external/replicate";
import { remotionDevSkills } from "./external/remotion-dev";
import { typefullySkills } from "./external/typefully";
import { netlifySkills } from "./external/netlify";
import { googleLabsCodeSkills } from "./external/google-labs-code";
import { googleWorkspaceSkills } from "./external/googleworkspace";
import { expoSkills } from "./external/expo";
import { huggingfaceSkills } from "./external/huggingface";
import { trailofbitsSkills } from "./external/trailofbits";
import { getsentrySkills } from "./external/getsentry";
import { microsoftSkills } from "./external/microsoft";

export type CategoryKey =
  | "Creative & Design"
  | "Technical & Development"
  | "Office & Documents"
  | "Enterprise";

export interface ExternalSkill {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CategoryKey;
  sourceUrl: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  whatItDoes: string;
  whenToUse: string[];
  skillMd: string;
}

export const externalSkills: ExternalSkill[] = [
  ...anthropicSkills,
  ...auth0Skills,
  ...betterAuthSkills,
  ...braveSkills,
  ...browserbaseSkills,
  ...callstackSkills,
  ...clickhouseSkills,
  ...cloudflareSkills,
  ...coderabbitaiSkills,
  ...coinbaseSkills,
  ...voltagentSkills,
  ...googleGeminiSkills,
  ...tinybirdcoSkills,
  ...composiohqSkills,
  ...stripeSkills,
  ...supabaseSkills,
  ...hashicorpSkills,
  ...angularSkills,
  ...sanityIoSkills,
  ...trycourierSkills,
  ...veniceaiSkills,
  ...firecrawlSkills,
  ...neondatabaseSkills,
  ...vercelLabsSkills,
  ...replicateSkills,
  ...remotionDevSkills,
  ...typefullySkills,
  ...netlifySkills,
  ...googleLabsCodeSkills,
  ...googleWorkspaceSkills,
  ...expoSkills,
  ...huggingfaceSkills,
  ...trailofbitsSkills,
  ...getsentrySkills,
  ...microsoftSkills
];

export const CATEGORIES: CategoryKey[] = [
  "Creative & Design",
  "Technical & Development",
  "Office & Documents",
  "Enterprise"
];

export const CATEGORY_COLORS: Record<CategoryKey, string> = {
  "Creative & Design": "text-pink-600 dark:text-pink-400 bg-pink-50 dark:bg-pink-400/10 border-pink-200 dark:border-pink-400/20",
  "Technical & Development": "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-400/10 border-blue-200 dark:border-blue-400/20",
  "Office & Documents": "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-400/10 border-amber-200 dark:border-amber-400/20",
  "Enterprise": "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-400/10 border-purple-200 dark:border-purple-400/20",
};

export const DIFFICULTY_COLORS: Record<string, string> = {
  Beginner: "text-emerald-600 dark:text-emerald-400",
  Intermediate: "text-amber-600 dark:text-amber-400",
  Advanced: "text-red-600 dark:text-red-400",
};

export function getExternalSkillBySlug(slug: string): ExternalSkill | undefined {
  return externalSkills.find((s) => s.slug === slug);
}
