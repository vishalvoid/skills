import { readFileSync } from "fs";
import { join } from "path";
import { skills } from "@/data/skills";

export const dynamic = "force-static";

export function generateStaticParams() {
  return skills.map((s) => ({ slug: s.slug }));
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  const isValid = skills.some((s) => s.slug === slug);
  if (!isValid) {
    return new Response("Skill not found", { status: 404 });
  }

  let content: string;
  try {
    const filePath = join(process.cwd(), "skill", slug, "SKILL.md");
    content = readFileSync(filePath, "utf-8");
  } catch {
    return new Response("Skill file not found", { status: 404 });
  }

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
