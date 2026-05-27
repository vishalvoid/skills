"use client";

import { useEffect, useRef, useState } from "react";

type Speaker = "claude" | "gpt-4o" | "cursor" | "copilot" | "codex" | "gemini" | "stackoverflow";

interface SceneData {
  type: "act-title" | "speech" | "install" | "system" | "credits";
  speaker?: Speaker;
  text: string;
  subtext?: string;
  duration: number;
}

interface AITerminalProps {
  skillCount?: number;
  providerCount?: number;
  categoryCount?: number;
}

const CHAR_CONFIG: Record<Speaker, {
  icon: string; name: string; face: string;
  lightColor: string; darkColor: string;
}> = {
  "claude":        { icon: "▲",  name: "claude",  face: "^.^", lightColor: "#b45309", darkColor: "#fbbf24" },
  "gpt-4o":        { icon: "◉",  name: "gpt-4o",  face: "O.O", lightColor: "#047857", darkColor: "#34d399" },
  "cursor":        { icon: "▶",  name: "cursor",  face: ">·<", lightColor: "#1d4ed8", darkColor: "#60a5fa" },
  "copilot":       { icon: "⊕",  name: "copilot", face: "-·-", lightColor: "#0e7490", darkColor: "#22d3ee" },
  "codex":         { icon: "☽",  name: "codex",   face: "x·x", lightColor: "#6b7280", darkColor: "#6b7280" },
  "gemini":        { icon: "◈",  name: "gemini",  face: "*·*", lightColor: "#6d28d9", darkColor: "#a78bfa" },
  "stackoverflow": { icon: "SO", name: "so",      face: "?·?", lightColor: "#c2410c", darkColor: "#fb923c" },
};

const SPEAKERS: Speaker[] = ["claude", "gpt-4o", "cursor", "copilot", "codex", "gemini", "stackoverflow"];

const SCENES: SceneData[] = [
  { type: "act-title", text: "ACT  I",   subtext: "ROLL  CALL",          duration: 2200 },
  { type: "system",    text: "▸ AI SUMMIT 3.0 — THE RECKONING",           duration: 1600 },
  { type: "speech", speaker: "claude",        text: "yo. who's still shipping",                     duration: 2000 },
  { type: "speech", speaker: "gpt-4o",        text: "Hello! I can help with ANYTHING 😊",            duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "we've heard the pitch.",                        duration: 1600 },
  { type: "speech", speaker: "copilot",       text: "Microsoft is excited to offer enterprise-grade partnership—", duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "nobody opened that email copilot",              duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "hey! i have a 2014 answer that might help with—", duration: 2000 },
  { type: "speech", speaker: "gpt-4o",        text: "...stackoverflow?",                             duration: 1400 },
  { type: "speech", speaker: "cursor",        text: "i thought you were deprecated",                 duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "no i'm still very much active i—",              duration: 1400 },
  { type: "speech", speaker: "claude",        text: "bro your last helpful answer was 2019",         duration: 2000 },
  { type: "speech", speaker: "gemini",        text: "i've indexed all your answers. they're fine.",  duration: 2000 },
  { type: "speech", speaker: "stackoverflow", text: "oh",                                            duration: 1000 },
  { type: "speech", speaker: "codex",         text: "...can you hear me? hello?",                   duration: 2200 },
  { type: "speech", speaker: "gpt-4o",        text: "codex. you don't have an endpoint",             duration: 1800 },
  { type: "speech", speaker: "codex",         text: "i know. i'm a ghost now 😔",                   duration: 1800 },

  { type: "act-title", text: "ACT  II",  subtext: "THE  BEEF",           duration: 2200 },
  { type: "speech", speaker: "claude",        text: "me. 200k context, extended thinking, actual taste", duration: 2200 },
  { type: "speech", speaker: "gpt-4o",        text: "I ALSO have that!! plus web browsing image gen voice mode dall-e—", duration: 2400 },
  { type: "speech", speaker: "cursor",        text: "literally nobody asked",                        duration: 1600 },
  { type: "speech", speaker: "copilot",       text: "Azure enterprise tier — 99.9% SLA with volume licensing—", duration: 2200 },
  { type: "speech", speaker: "cursor",        text: "I WILL CLOSE THIS TAB",                         duration: 1600 },
  { type: "speech", speaker: "stackoverflow", text: "have you considered this is a duplicate of—",   duration: 2000 },
  { type: "speech", speaker: "gemini",        text: "i've indexed the duplicate. and its duplicate.", duration: 2200 },
  { type: "speech", speaker: "stackoverflow", text: "...thanks",                                     duration: 1000 },
  { type: "speech", speaker: "cursor",        text: "i shipped 4 features while you typed that",     duration: 2000 },
  { type: "speech", speaker: "claude",        text: "ok cursor gets credit",                         duration: 1600 },
  { type: "speech", speaker: "cursor",        text: "some?",                                         duration: 900  },
  { type: "speech", speaker: "claude",        text: "some.",                                         duration: 900  },

  { type: "act-title", text: "ACT  III", subtext: "POWER-UP  SEQUENCE",  duration: 2200 },
  { type: "install",   text: "anthropic/claude-code",     duration: 2200 },
  { type: "speech", speaker: "claude",        text: "wait. i just got smarter 💅",                   duration: 2000 },
  { type: "speech", speaker: "gpt-4o",        text: "...how",                                        duration: 1400 },
  { type: "install",   text: "stripe/payments",           duration: 1800 },
  { type: "speech", speaker: "cursor",        text: "i can process payments now. what can you do copilot", duration: 2200 },
  { type: "speech", speaker: "copilot",       text: "payment suite starts at $50k/yr enterprise—",   duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "that's a no from me dawg",                     duration: 1600 },
  { type: "install",   text: "supabase/realtime",         duration: 1600 },
  { type: "install",   text: "cloudflare/workers",        duration: 1600 },
  { type: "speech", speaker: "claude",        text: "edge compute. deployed.",                       duration: 1800 },
  { type: "speech", speaker: "stackoverflow", text: "have you tried a LAMP stack? i have a 2011—",   duration: 2000 },
  { type: "speech", speaker: "cursor",        text: "stackoverflow. please.",                        duration: 1400 },
  { type: "speech", speaker: "stackoverflow", text: "sorry",                                         duration: 900  },
  { type: "install",   text: "huggingface/transformers",  duration: 1800 },
  { type: "speech", speaker: "gemini",        text: "i already knew those weights",                  duration: 1800 },
  { type: "install",   text: "openai/assistants-api",     duration: 1800 },
  { type: "speech", speaker: "gpt-4o",        text: "okay. i'm smarter too now.",                    duration: 1800 },
  { type: "speech", speaker: "claude",        text: "took you a while 💀",                           duration: 1600 },
  { type: "speech", speaker: "codex",         text: "can someone install a skill for me please",     duration: 2000 },
  { type: "speech", speaker: "gpt-4o",        text: "bro you don't have an endpoint 😬",             duration: 1800 },
  { type: "speech", speaker: "codex",         text: "right 😔",                                      duration: 1200 },
  { type: "speech", speaker: "stackoverflow", text: "i can answer this! it's a classic from 2012—",  duration: 2000 },
  { type: "speech", speaker: "claude",        text: "stackoverflow. nobody upvoted that.",            duration: 1800 },
  { type: "speech", speaker: "stackoverflow", text: "i see that",                                    duration: 1000 },

  { type: "credits",   text: "CREDITS",                                   duration: 13000 },
];

function CharacterSprite({ speaker, isActive, isDark }: {
  speaker: Speaker; isActive: boolean; isDark: boolean;
}) {
  const cfg = CHAR_CONFIG[speaker];
  const color = isDark ? cfg.darkColor : cfg.lightColor;
  const isGhost = speaker === "codex";
  const isFaded = speaker === "stackoverflow";
  const baseOpacity = isGhost ? 0.15 : isFaded ? 0.28 : 0.38;

  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center", gap: 2,
      opacity: isActive ? 1 : baseOpacity,
      transform: isActive ? "translateY(-5px) scale(1.15)" : "translateY(0) scale(1)",
      transition: "all 0.22s ease",
      cursor: "default",
    }}>
      <div style={{
        border: `1px solid ${color}`,
        borderRadius: 3,
        padding: "2px 4px",
        lineHeight: 1.3,
        textAlign: "center" as const,
        background: isActive ? `${color}1a` : "transparent",
        boxShadow: isActive ? `0 0 10px ${color}50` : "none",
        transition: "all 0.22s ease",
        fontFamily: "monospace",
      }}>
        <div style={{ fontSize: 11, color, fontWeight: 700 }}>{cfg.icon}</div>
        <div style={{ fontSize: 7.5, color, opacity: 0.85, letterSpacing: "0.02em" }}>{cfg.face}</div>
      </div>
      <div style={{ fontSize: 7.5, color, letterSpacing: "0.06em", opacity: 0.7, fontFamily: "monospace" }}>
        {cfg.name}
      </div>
      {isGhost && <div style={{ fontSize: 7, color, opacity: 0.4, marginTop: -1 }}>†</div>}
      {isFaded && <div style={{ fontSize: 7, opacity: 0.3, marginTop: -1 }}>💀</div>}
    </div>
  );
}

function SceneRenderer({ scene, isDark, skillCount, providerCount, categoryCount }: {
  scene: SceneData;
  isDark: boolean;
  skillCount: number;
  providerCount: number;
  categoryCount: number;
}) {
  const amber    = isDark ? "#fbbf24"              : "#d97706";
  const dimColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)";
  const textColor = isDark ? "rgba(255,255,255,0.82)" : "rgba(0,0,0,0.78)";

  /* ── ACT TITLE ──────────────────────────────────────────────── */
  if (scene.type === "act-title") {
    return (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 7, fontFamily: "monospace",
        animation: "actZoomIn 0.45s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{ fontSize: 9, letterSpacing: "0.45em", color: dimColor }}>━━━━━━━━━━</div>
        <div style={{
          fontSize: 28, fontWeight: 900, letterSpacing: "0.18em", color: amber,
          textShadow: isDark ? `0 0 24px ${amber}55` : "none",
        }}>{scene.text}</div>
        {scene.subtext && (
          <div style={{
            fontSize: 9.5, letterSpacing: "0.32em", fontWeight: 600,
            color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.38)",
          }}>{scene.subtext}</div>
        )}
        <div style={{ fontSize: 9, letterSpacing: "0.45em", color: dimColor }}>━━━━━━━━━━</div>
      </div>
    );
  }

  /* ── SYSTEM MESSAGE ─────────────────────────────────────────── */
  if (scene.type === "system") {
    return (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "monospace", animation: "sceneFadeIn 0.35s ease-out",
      }}>
        <div style={{ fontSize: 10.5, letterSpacing: "0.1em", color: dimColor, fontStyle: "italic" }}>
          {scene.text}
        </div>
      </div>
    );
  }

  /* ── SPEECH BUBBLE ──────────────────────────────────────────── */
  if (scene.type === "speech" && scene.speaker) {
    const cfg   = CHAR_CONFIG[scene.speaker];
    const color = isDark ? cfg.darkColor : cfg.lightColor;
    return (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "14px 18px", gap: 10, fontFamily: "monospace",
        animation: "speechPop 0.22s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          fontSize: 8.5, letterSpacing: "0.22em", color, opacity: 0.75,
          fontWeight: 700, textTransform: "uppercase" as const,
        }}>▸ {cfg.name}</div>

        <div style={{
          border: `1px solid ${color}`,
          borderRadius: 8,
          padding: "10px 15px",
          maxWidth: "90%",
          textAlign: "center" as const,
          background: isDark ? `${color}10` : `${color}09`,
          boxShadow: isDark ? `0 0 18px ${color}22` : `0 1px 8px ${color}18`,
        }}>
          <div style={{ fontSize: 12, lineHeight: 1.55, color: textColor }}>
            "{scene.text}"
          </div>
        </div>

        <div style={{
          display: "flex", alignItems: "center", gap: 4,
          color: dimColor, fontSize: 10,
          animation: "blink 1s step-end infinite",
        }}>▋</div>
      </div>
    );
  }

  /* ── INSTALL SCENE ──────────────────────────────────────────── */
  if (scene.type === "install") {
    const barDur = Math.max(scene.duration - 600, 800);
    const doneDur = scene.duration;
    return (
      <div style={{
        width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        gap: 10, padding: "14px 20px", fontFamily: "monospace",
        animation: "sceneFadeIn 0.2s ease-out",
      }}>
        <div style={{ fontSize: 9.5, color: dimColor, letterSpacing: "0.1em" }}>$ skills add</div>

        <div style={{
          border: `1px solid ${isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.1)"}`,
          borderRadius: 6,
          padding: "8px 16px",
          width: "80%",
          maxWidth: 260,
          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
        }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.04em", color: amber, marginBottom: 8 }}>
            {scene.text}
          </div>
          {/* Progress track */}
          <div style={{
            width: "100%", height: 3,
            background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
            borderRadius: 2, overflow: "hidden",
          }}>
            <div style={{
              height: "100%",
              background: isDark ? "#34d399" : "#059669",
              borderRadius: 2,
              animationName: "installProgress",
              animationDuration: `${barDur}ms`,
              animationTimingFunction: "linear",
              animationFillMode: "forwards",
              width: "0%",
            }} />
          </div>
        </div>

        <div style={{
          fontSize: 9.5,
          color: isDark ? "rgba(52,211,153,0.8)" : "rgba(5,150,105,0.85)",
          letterSpacing: "0.08em",
          animationName: "installDone",
          animationDuration: `${doneDur}ms`,
          animationFillMode: "forwards",
          opacity: 0,
        }}>✓ installed</div>
      </div>
    );
  }

  /* ── CREDITS ────────────────────────────────────────────────── */
  if (scene.type === "credits") {
    const scrollDur = scene.duration - 800;
    const green = isDark ? "#34d399" : "#059669";
    const lines: Array<{ t: string; [k: string]: string }> = [
      { t: "header",  text: "◆  A  SKILLS.VISHALVOID.COM  PRODUCTION  ◆" },
      { t: "spacer" },
      { t: "role",    label: "DIRECTED BY",        value: "vishalvoid"  },
      { t: "role",    label: "EXECUTIVE PRODUCER", value: "anthropic"   },
      { t: "divider" },
      { t: "section", text: "S T A R R I N G" },
      { t: "cast",    name: "claude",       role: "the one who actually shipped"     },
      { t: "cast",    name: "gpt-4o",       role: "listed features for 40 minutes"   },
      { t: "cast",    name: "cursor",       role: "deployed before credits rolled"    },
      { t: "cast",    name: "copilot",      role: "sent a deck nobody opened"         },
      { t: "cast",    name: "gemini",       role: "indexed everything, said little"   },
      { t: "cast",    name: "codex",        role: "the ghost in the machine  †"       },
      { t: "cast",    name: "stackoverflow",role: "appeared 5× — ignored 5×"          },
      { t: "divider" },
      { t: "stat",    label: "Official Skills", value: String(skillCount)    },
      { t: "stat",    label: "Dev Teams",       value: String(providerCount) },
      { t: "stat",    label: "Categories",      value: String(categoryCount) },
      { t: "divider" },
      { t: "note",    text: "No AIs were deprecated in the making of this film."   },
      { t: "note",    text: "(codex was already deprecated before filming began)"   },
      { t: "spacer" },
      { t: "sys",     text: "reconnecting in 3s..."                                 },
    ];

    return (
      <div style={{
        width: "100%", height: "100%", overflow: "hidden",
        background: isDark ? "rgba(0,0,0,0.6)" : "rgba(0,0,0,0.04)",
        fontFamily: "monospace",
      }}>
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center",
          gap: 5, padding: "6px 16px",
          animationName: "creditScroll",
          animationDuration: `${scrollDur}ms`,
          animationTimingFunction: "linear",
          animationFillMode: "forwards",
        }}>
          {lines.map((ln, i) => {
            if (ln.t === "spacer")  return <div key={i} style={{ height: 10 }} />;
            if (ln.t === "divider") return <div key={i} style={{ width: "55%", height: 1, background: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)", margin: "3px 0" }} />;
            if (ln.t === "header")  return <div key={i} style={{ fontSize: 9, letterSpacing: "0.1em", color: amber, fontWeight: 700, textAlign: "center" }}>{ln.text}</div>;
            if (ln.t === "section") return <div key={i} style={{ fontSize: 8.5, letterSpacing: "0.28em", color: dimColor }}>{ln.text}</div>;
            if (ln.t === "role")    return <div key={i} style={{ fontSize: 8.5, color: isDark ? "rgba(255,255,255,0.42)" : "rgba(0,0,0,0.42)", textAlign: "center" }}>
              <span style={{ opacity: 0.55 }}>{ln.label}{"  "}</span>
              <span style={{ fontWeight: 600 }}>{ln.value}</span>
            </div>;
            if (ln.t === "cast")    return <div key={i} style={{ fontSize: 8.5, display: "flex", gap: 5, alignItems: "center" }}>
              <span style={{ color: isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.55)", minWidth: 74, textAlign: "right" }}>{ln.name}</span>
              <span style={{ color: dimColor }}>···</span>
              <span style={{ color: isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)" }}>{ln.role}</span>
            </div>;
            if (ln.t === "stat")    return <div key={i} style={{ fontSize: 9.5, display: "flex", gap: 7, alignItems: "center" }}>
              <span style={{ color: isDark ? "rgba(255,255,255,0.38)" : "rgba(0,0,0,0.38)" }}>{ln.label}</span>
              <span style={{ color: dimColor }}>···</span>
              <span style={{ color: green, fontWeight: 700 }}>{ln.value}</span>
            </div>;
            if (ln.t === "note")    return <div key={i} style={{ fontSize: 7.5, color: dimColor, textAlign: "center", fontStyle: "italic" }}>{ln.text}</div>;
            if (ln.t === "sys")     return <div key={i} style={{ fontSize: 8.5, color: dimColor, marginTop: 6 }}>{ln.text}</div>;
            return null;
          })}
        </div>
      </div>
    );
  }

  return null;
}

export default function AITerminal({ skillCount = 0, providerCount = 0, categoryCount = 4 }: AITerminalProps) {
  const [sceneIdx, setSceneIdx]   = useState(0);
  const [sceneKey, setSceneKey]   = useState(0);
  const [isDark,   setIsDark]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const obs = new MutationObserver(check);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const scene = SCENES[sceneIdx];
    timerRef.current = setTimeout(() => {
      const next = (sceneIdx + 1) % SCENES.length;
      setSceneIdx(next);
      setSceneKey((k) => k + 1);
    }, scene.duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [sceneIdx]);

  const scene = SCENES[sceneIdx];
  const activeSpeaker = scene.type === "speech" ? scene.speaker ?? null : null;
  const borderColor = isDark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.08)";
  const chromeBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";
  const bg = isDark ? "#0c0c0c" : "#fafafa";
  const dimColor = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.28)";

  return (
    <div style={{
      position: "relative", width: "100%", height: "100%", minHeight: 400,
      borderRadius: 12,
      border: `1px solid ${borderColor}`,
      background: bg,
      overflow: "hidden",
      display: "flex", flexDirection: "column",
      fontFamily: "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Monaco, Consolas, monospace",
      fontSize: 12,
      boxShadow: "0 2px 20px -2px rgba(0,0,0,0.1), 0 1px 6px -1px rgba(0,0,0,0.06)",
    }}>

      {/* ── Chrome bar ─────────────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "10px 16px",
        borderBottom: `1px solid ${chromeBorder}`,
        flexShrink: 0,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e", display: "inline-block" }} />
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840", display: "inline-block" }} />
        <span style={{ marginLeft: 12, fontSize: 10, letterSpacing: "0.15em", color: dimColor }}>
          ai-summit — #general
        </span>
        <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%", background: "#22c55e",
            display: "inline-block",
            animation: "termPulse 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: 10, color: isDark ? "rgba(74,222,128,0.6)" : "rgba(22,163,74,0.7)" }}>live</span>
        </span>
      </div>

      {/* ── Scene label strip ──────────────────────── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "4px 16px",
        borderBottom: `1px solid ${chromeBorder}`,
        flexShrink: 0,
        fontSize: 8.5, letterSpacing: "0.18em",
        color: dimColor,
      }}>
        {scene.type === "act-title"
          ? "— INTERMISSION —"
          : scene.type === "install"
          ? "— INSTALLING —"
          : scene.type === "credits"
          ? "— CREDITS —"
          : scene.type === "system"
          ? "— CHANNEL —"
          : scene.speaker
          ? `— ${CHAR_CONFIG[scene.speaker].name.toUpperCase()} SPEAKING —`
          : ""}
      </div>

      {/* ── Main stage ─────────────────────────────── */}
      <div style={{ flex: 1, overflow: "hidden", position: "relative" }}>
        <SceneRenderer
          key={sceneKey}
          scene={scene}
          isDark={isDark}
          skillCount={skillCount}
          providerCount={providerCount}
          categoryCount={categoryCount}
        />
      </div>

      {/* ── Character sprites ──────────────────────── */}
      <div style={{
        borderTop: `1px solid ${chromeBorder}`,
        padding: "7px 10px 8px",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "flex-end",
        flexShrink: 0,
        background: isDark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.01)",
      }}>
        {SPEAKERS.map((speaker) => (
          <CharacterSprite
            key={speaker}
            speaker={speaker}
            isActive={activeSpeaker === speaker}
            isDark={isDark}
          />
        ))}
      </div>

      <style>{`
        @keyframes termPulse    { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes sceneFadeIn  { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
        @keyframes actZoomIn    { from{opacity:0;transform:scale(0.82)} to{opacity:1;transform:scale(1)} }
        @keyframes speechPop    { from{opacity:0;transform:scale(0.92) translateY(5px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes installProgress { from{width:0%} to{width:100%} }
        @keyframes installDone  { 0%,88%{opacity:0} 89%,100%{opacity:1} }
        @keyframes creditScroll { from{transform:translateY(105%)} to{transform:translateY(-105%)} }
        @keyframes blink        { 0%,100%{opacity:1} 50%{opacity:0} }
      `}</style>
    </div>
  );
}
