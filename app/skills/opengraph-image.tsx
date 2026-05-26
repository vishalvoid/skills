import { ImageResponse } from "next/og";
import { externalSkills, CATEGORIES } from "@/data/external-skills";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Skills Directory — skills.vishalvoid.com";

const CATEGORY_BADGE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "Creative & Design":        { bg: "#1e0b12", text: "#f472b6", border: "#3c1020" },
  "Technical & Development":  { bg: "#080d1a", text: "#3b82f6", border: "#0f1e3a" },
  "Office & Documents":       { bg: "#1e1308", text: "#fbbf24", border: "#3c2a10" },
  "Enterprise":               { bg: "#0d0818", text: "#a78bfa", border: "#1a1030" },
};

export default function OGImage() {
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
      }}
    >
      {/* Label */}
      <div style={{ color: "#444444", fontSize: "16px", letterSpacing: "0.08em", display: "flex" }}>
        skills.vishalvoid.com / directory
      </div>

      {/* Title */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "16px",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: "68px",
            fontWeight: 700,
            letterSpacing: "-2px",
            lineHeight: "1.05",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Skills Directory</span>
        </div>
        <div style={{ color: "#666666", fontSize: "22px", display: "flex" }}>
          {externalSkills.length}+ curated skills from across the ecosystem
        </div>

        {/* Category badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
          {CATEGORIES.map((category) => {
            const colors = CATEGORY_BADGE_COLORS[category] ?? { bg: "#111", text: "#888", border: "#222" };
            return (
              <div
                key={category}
                style={{
                  background: colors.bg,
                  border: `1px solid ${colors.border}`,
                  color: colors.text,
                  padding: "5px 12px",
                  borderRadius: "6px",
                  fontSize: "13px",
                  fontWeight: 600,
                  display: "flex",
                }}
              >
                {category}
              </div>
            );
          })}
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
        <div style={{ color: "#333333", fontSize: "13px", letterSpacing: "0.18em", display: "flex" }}>
          28.62° N, 77.37° E
        </div>
        <div
          style={{
            background: "#111111",
            border: "1px solid #222222",
            borderRadius: "12px",
            width: "64px",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span style={{ color: "#ffffff", fontSize: "24px", fontWeight: 700, letterSpacing: "-1px" }}>sv</span>
        </div>
      </div>
    </div>,
    { ...size }
  );
}
