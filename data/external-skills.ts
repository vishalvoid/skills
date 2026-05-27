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
import { minimaxAiSkills } from "./external/minimax-ai";
import { wordpressSkills } from "./external/wordpress";
import { addyosmaniSkills } from "./external/addyosmani";
import { apollographqlSkills } from "./external/apollographql";
import { binanceSkills } from "./external/binance";
import { datadogLabsSkills } from "./external/datadog-labs";
import { duckdbSkills } from "./external/duckdb";
import { falAiCommunitySkills } from "./external/fal-ai-community";
import { figmaSkills } from "./external/figma";
import { firebaseSkills } from "./external/firebase";
import { flutterSkills } from "./external/flutter";
import { garrytanSkills } from "./external/garrytan";
import { greensockSkills } from "./external/greensock";
import { makenotionSkills } from "./external/makenotion";
import { mongodbSkills } from "./external/mongodb";
import { openaiSkills } from "./external/openai";

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
  ...microsoftSkills,
  ...minimaxAiSkills,
  ...wordpressSkills,
  ...addyosmaniSkills,
  ...apollographqlSkills,
  ...binanceSkills,
  ...datadogLabsSkills,
  ...duckdbSkills,
  ...falAiCommunitySkills,
  ...figmaSkills,
  ...firebaseSkills,
  ...flutterSkills,
  ...garrytanSkills,
  ...greensockSkills,
  ...makenotionSkills,
  ...mongodbSkills,
  ...openaiSkills
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

const slugToSkill = new Map(externalSkills.map((s) => [s.slug, s]));

export function getSkillsByProvider(providerId: string): ExternalSkill[] {
  const entry = PROVIDER_SLUGS.find((p) => p.id === providerId);
  if (!entry) return [];
  return entry.slugs.map((slug) => slugToSkill.get(slug)!).filter(Boolean);
}

export const PROVIDER_NAMES: Record<string, string> = {
  angular: "Angular",
  anthropic: "Anthropic",
  auth0: "Auth0",
  "better-auth": "Better Auth",
  brave: "Brave",
  browserbase: "Browserbase",
  callstack: "Callstack",
  clickhouse: "Clickhouse",
  cloudflare: "Cloudflare",
  coderabbitai: "Coderabbitai",
  coinbase: "Coinbase",
  composiohq: "Composio",
  expo: "Expo",
  firecrawl: "Firecrawl",
  getsentry: "Sentry",
  "google-gemini": "Google Gemini",
  "google-labs-code": "Google Labs",
  googleworkspace: "Google Workspace",
  hashicorp: "HashiCorp",
  huggingface: "Hugging Face",
  microsoft: "Microsoft",
  neondatabase: "Neon",
  netlify: "Netlify",
  "remotion-dev": "Remotion",
  replicate: "Replicate",
  "sanity-io": "Sanity",
  stripe: "Stripe",
  supabase: "Supabase",
  tinybirdco: "Tinybird",
  trailofbits: "Trail of Bits",
  trycourier: "Courier",
  typefully: "Typefully",
  veniceai: "Venice AI",
  "vercel-labs": "Vercel",
  voltagent: "VoltAgent",
  "minimax-ai": "MiniMax AI",
  wordpress: "WordPress",
  addyosmani: "Addy Osmani",
  apollographql: "Apollo GraphQL",
  binance: "Binance",
  "datadog-labs": "Datadog Labs",
  duckdb: "DuckDB",
  "fal-ai-community": "fal.ai",
  figma: "Figma",
  firebase: "Firebase",
  flutter: "Flutter",
  garrytan: "Garry Tan",
  greensock: "GSAP / GreenSock",
  makenotion: "Notion",
  mongodb: "MongoDB",
  openai: "OpenAI",
};

export const PROVIDER_SLUGS: { id: string; slugs: string[] }[] = [
  { id: "angular", slugs: angularSkills.map((s) => s.slug) },
  { id: "anthropic", slugs: anthropicSkills.map((s) => s.slug) },
  { id: "auth0", slugs: auth0Skills.map((s) => s.slug) },
  { id: "better-auth", slugs: betterAuthSkills.map((s) => s.slug) },
  { id: "brave", slugs: braveSkills.map((s) => s.slug) },
  { id: "browserbase", slugs: browserbaseSkills.map((s) => s.slug) },
  { id: "callstack", slugs: callstackSkills.map((s) => s.slug) },
  { id: "clickhouse", slugs: clickhouseSkills.map((s) => s.slug) },
  { id: "cloudflare", slugs: cloudflareSkills.map((s) => s.slug) },
  { id: "coderabbitai", slugs: coderabbitaiSkills.map((s) => s.slug) },
  { id: "coinbase", slugs: coinbaseSkills.map((s) => s.slug) },
  { id: "composiohq", slugs: composiohqSkills.map((s) => s.slug) },
  { id: "expo", slugs: expoSkills.map((s) => s.slug) },
  { id: "firecrawl", slugs: firecrawlSkills.map((s) => s.slug) },
  { id: "getsentry", slugs: getsentrySkills.map((s) => s.slug) },
  { id: "google-gemini", slugs: googleGeminiSkills.map((s) => s.slug) },
  { id: "google-labs-code", slugs: googleLabsCodeSkills.map((s) => s.slug) },
  { id: "googleworkspace", slugs: googleWorkspaceSkills.map((s) => s.slug) },
  { id: "hashicorp", slugs: hashicorpSkills.map((s) => s.slug) },
  { id: "huggingface", slugs: huggingfaceSkills.map((s) => s.slug) },
  { id: "microsoft", slugs: microsoftSkills.map((s) => s.slug) },
  { id: "neondatabase", slugs: neondatabaseSkills.map((s) => s.slug) },
  { id: "netlify", slugs: netlifySkills.map((s) => s.slug) },
  { id: "remotion-dev", slugs: remotionDevSkills.map((s) => s.slug) },
  { id: "replicate", slugs: replicateSkills.map((s) => s.slug) },
  { id: "sanity-io", slugs: sanityIoSkills.map((s) => s.slug) },
  { id: "stripe", slugs: stripeSkills.map((s) => s.slug) },
  { id: "supabase", slugs: supabaseSkills.map((s) => s.slug) },
  { id: "tinybirdco", slugs: tinybirdcoSkills.map((s) => s.slug) },
  { id: "trailofbits", slugs: trailofbitsSkills.map((s) => s.slug) },
  { id: "trycourier", slugs: trycourierSkills.map((s) => s.slug) },
  { id: "typefully", slugs: typefullySkills.map((s) => s.slug) },
  { id: "veniceai", slugs: veniceaiSkills.map((s) => s.slug) },
  { id: "vercel-labs", slugs: vercelLabsSkills.map((s) => s.slug) },
  { id: "voltagent", slugs: voltagentSkills.map((s) => s.slug) },
  { id: "minimax-ai", slugs: minimaxAiSkills.map((s) => s.slug) },
  { id: "wordpress", slugs: wordpressSkills.map((s) => s.slug) },
  { id: "addyosmani", slugs: addyosmaniSkills.map((s) => s.slug) },
  { id: "apollographql", slugs: apollographqlSkills.map((s) => s.slug) },
  { id: "binance", slugs: binanceSkills.map((s) => s.slug) },
  { id: "datadog-labs", slugs: datadogLabsSkills.map((s) => s.slug) },
  { id: "duckdb", slugs: duckdbSkills.map((s) => s.slug) },
  { id: "fal-ai-community", slugs: falAiCommunitySkills.map((s) => s.slug) },
  { id: "figma", slugs: figmaSkills.map((s) => s.slug) },
  { id: "firebase", slugs: firebaseSkills.map((s) => s.slug) },
  { id: "flutter", slugs: flutterSkills.map((s) => s.slug) },
  { id: "garrytan", slugs: garrytanSkills.map((s) => s.slug) },
  { id: "greensock", slugs: greensockSkills.map((s) => s.slug) },
  { id: "makenotion", slugs: makenotionSkills.map((s) => s.slug) },
  { id: "mongodb", slugs: mongodbSkills.map((s) => s.slug) },
  { id: "openai", slugs: openaiSkills.map((s) => s.slug) },
];
