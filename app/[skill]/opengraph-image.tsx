import { ImageResponse } from "next/og";
import { skills, getSkillBySlug } from "@/data/skills";

export const dynamicParams = false;
export const revalidate = false;

export function generateStaticParams() {
  return skills.map((s) => ({ skill: s.slug }));
}

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_STYLE: Record<string, { bg: string; text: string; border: string; accent: string }> = {
  Patterns:     { bg: "#080d1a", text: "#3b82f6", border: "#0f1e3a", accent: "#1d4ed8" },
  Architecture: { bg: "#0d0818", text: "#a78bfa", border: "#1a1030", accent: "#7c3aed" },
  Design:       { bg: "#080f0d", text: "#10b981", border: "#0f2018", accent: "#059669" },
};

export default async function OGImage({ params }: { params: Promise<{ skill: string }> }) {
  const { skill: slug } = await params;
  const skill = getSkillBySlug(slug);
  if (!skill) return new Response("not found", { status: 404 });

  const cat = CATEGORY_STYLE[skill.category] ?? CATEGORY_STYLE.Patterns;

  return new ImageResponse(
    <div
      style={{
        background: "#000000",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "64px 80px",
        fontFamily: "monospace, 'Courier New'",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent line at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "3px",
          background: cat.accent,
          display: "flex",
        }}
      />

      {/* Category badge */}
      <div style={{ display: "flex", marginTop: "8px" }}>
        <div
          style={{
            background: cat.bg,
            border: `1px solid ${cat.border}`,
            color: cat.text,
            padding: "6px 14px",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 600,
            display: "flex",
          }}
        >
          {skill.category}
        </div>
      </div>

      {/* Skill name + tagline */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: skill.name.length > 28 ? "52px" : "62px",
            fontWeight: 700,
            lineHeight: "1.08",
            letterSpacing: "-1.5px",
            maxWidth: "900px",
            display: "flex",
          }}
        >
          {skill.name}
        </div>
        <div
          style={{
            color: "#777777",
            fontSize: "22px",
            maxWidth: "680px",
            lineHeight: "1.45",
            display: "flex",
          }}
        >
          {skill.tagline}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
        }}
      >
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {skill.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              style={{
                background: "#0d0d0d",
                border: "1px solid #1f1f1f",
                color: "#555555",
                padding: "5px 10px",
                borderRadius: "5px",
                fontSize: "12px",
                display: "flex",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
        <div style={{ color: "#333333", fontSize: "14px", display: "flex" }}>
          skills.vishalvoid.com
        </div>
      </div>
    </div>,
    { ...size }
  );
}
