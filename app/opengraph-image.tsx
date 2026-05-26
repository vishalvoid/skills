import { ImageResponse } from "next/og";
import { externalSkills, PROVIDER_SLUGS } from "@/data/external-skills";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Official Agent Skills & MCP Server Directory — skills.vishalvoid.com";

export default function OGImage() {
  const skillCount = externalSkills.length;
  const providerCount = PROVIDER_SLUGS.length;

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
      {/* Subtle grid lines */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "420px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          opacity: 0.05,
        }}
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{ width: "100%", height: "35px", borderBottom: "1px solid #ffffff" }} />
        ))}
      </div>

      {/* Domain label */}
      <div style={{ color: "#444444", fontSize: "15px", letterSpacing: "0.1em", display: "flex" }}>
        skills.vishalvoid.com
      </div>

      {/* Main content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", gap: "18px" }}>
        <div
          style={{
            color: "#ffffff",
            fontSize: "66px",
            fontWeight: 700,
            lineHeight: "1.05",
            letterSpacing: "-2px",
            maxWidth: "780px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <span>Official Agent Skills</span>
          <span style={{ color: "#444444" }}>&amp; MCP Server Directory</span>
        </div>
        <div style={{ color: "#555555", fontSize: "20px", maxWidth: "600px", lineHeight: "1.6", display: "flex" }}>
          {skillCount}+ official skills from {providerCount} providers — Anthropic, Stripe,
          Supabase, Cloudflare and more. Works with any MCP-compatible AI agent.
        </div>
      </div>

      {/* Footer row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div style={{ display: "flex", gap: "12px" }}>
          {[
            `${skillCount}+ skills`,
            `${providerCount} providers`,
            "open source",
            "free",
          ].map((label) => (
            <div
              key={label}
              style={{
                background: "#111111",
                border: "1px solid #222222",
                color: "#555555",
                padding: "5px 12px",
                borderRadius: "6px",
                fontSize: "13px",
                display: "flex",
              }}
            >
              {label}
            </div>
          ))}
        </div>

        {/* Byline */}
        <div style={{ color: "#333333", fontSize: "13px", letterSpacing: "0.1em", display: "flex" }}>
          by Vishal Kumar Singh
        </div>
      </div>
    </div>,
    { ...size }
  );
}
