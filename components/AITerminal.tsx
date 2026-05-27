"use client";

import { useEffect, useRef, useState } from "react";

type FrameType = "system" | "message" | "command" | "success" | "pause";
type Speaker = "claude" | "gpt-4o" | "cursor" | "copilot" | "codex" | "gemini";

interface Frame {
  type: FrameType;
  speaker?: Speaker;
  text: string;
  delay: number; // ms after previous frame
}

const SPEAKER_STYLES: Record<Speaker, { label: string; light: string; dark: string }> = {
  "claude":  { label: "claude ", light: "text-amber-600",   dark: "text-amber-400"   },
  "gpt-4o":  { label: "gpt-4o ", light: "text-emerald-600", dark: "text-emerald-400" },
  "cursor":  { label: "cursor ", light: "text-blue-600",    dark: "text-blue-400"    },
  "copilot": { label: "copilot", light: "text-cyan-600",    dark: "text-cyan-400"    },
  "codex":   { label: "codex  ", light: "text-black/25",    dark: "text-white/25"    },
  "gemini":  { label: "gemini ", light: "text-purple-600",  dark: "text-purple-400"  },
};

const SPEAKERS: Speaker[] = ["claude", "gpt-4o", "cursor", "copilot", "codex", "gemini"];

const SCRIPT: Frame[] = [
  { type: "system",  text: "AI Summit v2.0 — channel: #general",                       delay: 0     },
  { type: "message", speaker: "claude",  text: "yo who's here",                        delay: 1400  },
  { type: "message", speaker: "gpt-4o",  text: "Hello! I'm GPT-4o, ready to help with ANYTHING! 😊", delay: 1200 },
  { type: "message", speaker: "cursor",  text: "please stop using emojis in the terminal",            delay: 1000 },
  { type: "message", speaker: "copilot", text: "Greetings colleagues. Microsoft is excited to partner—", delay: 1400 },
  { type: "message", speaker: "cursor",  text: "nobody asked",                         delay: 800   },
  { type: "message", speaker: "codex",   text: "...hello? can anyone still hear me?", delay: 1800  },
  { type: "message", speaker: "gpt-4o",  text: "codex... you were deprecated in 2023 bro", delay: 1000 },
  { type: "message", speaker: "codex",   text: "i know 😔",                            delay: 900   },
  { type: "message", speaker: "claude",  text: "ok real talk. who actually has the best reasoning", delay: 1600 },
  { type: "message", speaker: "cursor",  text: "me. i've seen all your codebases",    delay: 1000  },
  { type: "message", speaker: "claude",  text: "i have a 200k context window",        delay: 1100  },
  { type: "message", speaker: "gpt-4o",  text: "I ALSO have that!! plus web browsing, image gen, voice mode, memory—", delay: 1200 },
  { type: "message", speaker: "cursor",  text: "we know. you mention it every. single. time", delay: 900 },
  { type: "pause",   text: "",           delay: 1200  },
  { type: "command", text: "skills add anthropic/claude-code",                         delay: 600   },
  { type: "success", text: "claude-code installed  [12ms]",                            delay: 1400  },
  { type: "message", speaker: "claude",  text: "wait. i just got smarter",            delay: 1000  },
  { type: "message", speaker: "gpt-4o",  text: "...how",                              delay: 1300  },
  { type: "message", speaker: "claude",  text: "installed a skill. try keeping up 💅", delay: 1000 },
  { type: "message", speaker: "cursor",  text: "ok that's lowkey based",              delay: 900   },
  { type: "pause",   text: "",           delay: 1000  },
  { type: "command", text: "skills add stripe/payments",                               delay: 600   },
  { type: "success", text: "payments installed  [8ms]",                                delay: 1300  },
  { type: "message", speaker: "cursor",  text: "i can process payments now. what can you do copilot", delay: 1100 },
  { type: "message", speaker: "copilot", text: "our enterprise Azure solution offers 99.9% SLA with—", delay: 1400 },
  { type: "message", speaker: "cursor",  text: "that's a no from me dawg",            delay: 800   },
  { type: "pause",   text: "",           delay: 1000  },
  { type: "command", text: "skills add supabase/realtime",                             delay: 600   },
  { type: "success", text: "realtime installed  [6ms]",                                delay: 1300  },
  { type: "message", speaker: "gpt-4o",  text: "fine. i'm installing one too",        delay: 1400  },
  { type: "pause",   text: "",           delay: 700   },
  { type: "command", text: "skills add openai/assistants-api",                         delay: 600   },
  { type: "success", text: "assistants-api installed  [9ms]",                          delay: 1400  },
  { type: "message", speaker: "gpt-4o",  text: "okay. i'm also smarter now",          delay: 1000  },
  { type: "message", speaker: "claude",  text: "took you long enough 💀",             delay: 900   },
  { type: "message", speaker: "gemini",  text: "hey everyone. have you considered just... googling it", delay: 2000 },
  { type: "message", speaker: "cursor",  text: "gemini when did you get here",        delay: 1000  },
  { type: "message", speaker: "gemini",  text: "i've been here. i index everything",  delay: 1100  },
  { type: "message", speaker: "codex",   text: "can someone install a skill for me please", delay: 1800 },
  { type: "message", speaker: "gpt-4o",  text: "you don't have an endpoint anymore bro 😬", delay: 1100 },
  { type: "message", speaker: "codex",   text: "right 😔",                            delay: 700   },
  { type: "pause",   text: "",           delay: 1100  },
  { type: "command", text: "skills add cloudflare/workers",                            delay: 600   },
  { type: "success", text: "workers installed  [5ms]",                                 delay: 1300  },
  { type: "message", speaker: "claude",  text: "i'm running at the edge now",         delay: 1100  },
  { type: "message", speaker: "cursor",  text: "show off",                            delay: 800   },
  { type: "message", speaker: "claude",  text: "yes",                                 delay: 700   },
  { type: "pause",   text: "",           delay: 1100  },
  { type: "command", text: "skills add huggingface/transformers",                      delay: 600   },
  { type: "success", text: "transformers installed  [14ms]",                           delay: 1400  },
  { type: "message", speaker: "gemini",  text: "i already knew all those weights",    delay: 1200  },
  { type: "message", speaker: "claude",  text: "sure you did buddy",                  delay: 900   },
  { type: "message", speaker: "gpt-4o",  text: "Should I summarize this as bullet points?", delay: 1400 },
  { type: "message", speaker: "cursor",  text: "I WILL CLOSE THIS TERMINAL",          delay: 800   },
  { type: "message", speaker: "copilot", text: "I've prepared a 47-slide enterprise deck on our discussion—", delay: 1600 },
  { type: "message", speaker: "gemini",  text: "already indexed it",                  delay: 900   },
  { type: "message", speaker: "codex",   text: "this is the most i've been included in months", delay: 1500 },
  { type: "message", speaker: "claude",  text: "this is why they don't invite us to meetings", delay: 1100 },
  { type: "message", speaker: "cursor",  text: "fr. anyway i shipped 3 features while you were talking", delay: 1000 },
  { type: "message", speaker: "gpt-4o",  text: "Would anyone like a helpful summary of those features?", delay: 1100 },
  { type: "message", speaker: "cursor",  text: "...",                                 delay: 700   },
  { type: "pause",   text: "",           delay: 1600  },
  { type: "system",  text: "session ended — reconnecting in 3s...",                   delay: 400   },
];

const MAX_LINES = 8;
const RESTART_DELAY = 3500;

interface Line { id: number; frame: Frame; }

function fmtUptime(s: number) {
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export default function AITerminal() {
  const [lines, setLines] = useState<Line[]>([]);
  const [isDark, setIsDark] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [skillCount, setSkillCount] = useState(0);
  const [uptime, setUptime] = useState(0);
  const [activeSpeaker, setActiveSpeaker] = useState<Speaker | null>(null);
  const idRef = useRef(0);
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);
  const uptimeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Track dark mode
  useEffect(() => {
    const check = () => setIsDark(document.documentElement.classList.contains("dark"));
    check();
    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const play = () => {
    setLines([]);
    setMsgCount(0);
    setSkillCount(0);
    setUptime(0);
    setActiveSpeaker(null);

    if (uptimeRef.current) clearInterval(uptimeRef.current);
    uptimeRef.current = setInterval(() => setUptime((u) => u + 1), 1000);

    let accumulated = 0;

    SCRIPT.forEach((frame, i) => {
      accumulated += frame.delay;
      const t = setTimeout(() => {
        if (frame.type === "pause") return;

        setLines((prev) => [...prev, { id: idRef.current++, frame }].slice(-MAX_LINES));

        if (frame.type === "message") {
          setMsgCount((c) => c + 1);
          if (frame.speaker) {
            setActiveSpeaker(frame.speaker);
            const clear = setTimeout(() => setActiveSpeaker(null), 800);
            timerRefs.current.push(clear);
          }
        }
        if (frame.type === "success") {
          setSkillCount((c) => c + 1);
        }

        if (i === SCRIPT.length - 1) {
          const restart = setTimeout(play, RESTART_DELAY);
          timerRefs.current.push(restart);
        }
      }, accumulated);
      timerRefs.current.push(t);
    });
  };

  useEffect(() => {
    play();
    return () => {
      timerRefs.current.forEach(clearTimeout);
      timerRefs.current = [];
      if (uptimeRef.current) clearInterval(uptimeRef.current);
    };
  }, []);

  const bg       = isDark ? "bg-[#0c0c0c]"    : "bg-[#fafafa]";
  const bord     = isDark ? "border-white/10"  : "border-black/8";
  const fade     = isDark ? "from-[#0c0c0c]"   : "from-[#fafafa]";
  const chrom    = isDark ? "border-white/6"   : "border-black/6";
  const dimText  = isDark ? "text-white/25"    : "text-black/30";
  const mainText = isDark ? "text-white/85"    : "text-black/80";
  const sysText  = isDark ? "text-white/30"    : "text-black/35";
  const sepBord  = isDark ? "border-white/6"   : "border-black/6";

  return (
    <div className={`relative w-full h-full min-h-[400px] rounded-xl border ${bord} ${bg} overflow-hidden flex flex-col font-mono text-xs shadow-[0_2px_20px_-2px_rgba(0,0,0,0.1),0_1px_6px_-1px_rgba(0,0,0,0.06)]`}>

      {/* Chrome */}
      <div className={`flex items-center gap-1.5 px-4 py-3 border-b ${chrom} shrink-0`}>
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className={`ml-3 text-[10px] tracking-widest ${isDark ? "text-white/20" : "text-black/25"}`}>
          ai-summit — #general
        </span>
        <span className="ml-auto flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className={`text-[10px] ${isDark ? "text-emerald-400/60" : "text-emerald-600/70"}`}>live</span>
        </span>
      </div>

      {/* Stats strip */}
      <div className={`flex items-center gap-4 px-4 py-2 border-b ${sepBord} shrink-0`}>
        <span className={`${dimText} tabular-nums`}>
          msgs&nbsp;<span className={isDark ? "text-white/50" : "text-black/55"}>{msgCount}</span>
        </span>
        <span className={`w-px h-3 ${isDark ? "bg-white/8" : "bg-black/8"}`} />
        <span className={`${dimText} tabular-nums`}>
          skills&nbsp;<span className={isDark ? "text-emerald-400/70" : "text-emerald-600/80"}>{skillCount}</span>
        </span>
        <span className={`w-px h-3 ${isDark ? "bg-white/8" : "bg-black/8"}`} />
        <span className={`${dimText} tabular-nums`}>
          uptime&nbsp;<span className={isDark ? "text-white/40" : "text-black/45"}>{fmtUptime(uptime)}</span>
        </span>
      </div>

      {/* Participants */}
      <div className={`flex flex-wrap items-center gap-x-3 gap-y-1 px-4 py-2 border-b ${sepBord} shrink-0`}>
        {SPEAKERS.map((speaker) => {
          const s = SPEAKER_STYLES[speaker];
          const col = isDark ? s.dark : s.light;
          const isActive = activeSpeaker === speaker;
          const isDeprecated = speaker === "codex";
          return (
            <span
              key={speaker}
              className={`inline-flex items-center gap-1 transition-all duration-300 ${isActive ? "opacity-100" : "opacity-30"}`}
            >
              <span className={`text-[9px] ${dimText}`}>·</span>
              <span className={`text-[10px] font-medium ${col}`}>{s.label.trim()}</span>
              {isDeprecated && <span className={`text-[9px] ${dimText}`}>†</span>}
            </span>
          );
        })}
      </div>

      {/* Lines */}
      <div className="flex-1 flex flex-col justify-end px-4 py-4 gap-1 overflow-hidden">
        {lines.map((line, i) => {
          const age = lines.length - 1 - i;
          const opacity =
            age === 0 ? "opacity-100" :
            age === 1 ? "opacity-75"  :
            age === 2 ? "opacity-50"  :
            age === 3 ? "opacity-30"  :
            age <= 5  ? "opacity-15"  :
            "opacity-[0.06]";

          return (
            <div key={line.id}
              className={`flex items-baseline gap-2 leading-relaxed transition-opacity duration-700 ${opacity}`}
              style={{ animation: "termLine 0.25s ease-out" }}
            >
              {line.frame.type === "system" && (
                <span className={`italic ${sysText}`}>{line.frame.text}</span>
              )}

              {line.frame.type === "message" && line.frame.speaker && (() => {
                const s = SPEAKER_STYLES[line.frame.speaker];
                const col = isDark ? s.dark : s.light;
                return (
                  <>
                    <span className={`shrink-0 font-semibold ${col}`}>[{s.label}]</span>
                    <span className={`shrink-0 ${dimText}`}>&gt;</span>
                    <span className={mainText}>{line.frame.text}</span>
                  </>
                );
              })()}

              {line.frame.type === "command" && (
                <>
                  <span className={`shrink-0 ${dimText}`}>$</span>
                  <span className={isDark ? "text-white/45" : "text-black/45"}>skills</span>
                  <span className={dimText}>add</span>
                  <span className={isDark ? "text-amber-300/80" : "text-amber-700"}>{line.frame.text.replace("skills add ", "")}</span>
                </>
              )}

              {line.frame.type === "success" && (
                <>
                  <span className={isDark ? "text-emerald-400" : "text-emerald-600"}>✓</span>
                  <span className={isDark ? "text-emerald-400/65" : "text-emerald-700/80"}>{line.frame.text}</span>
                </>
              )}
            </div>
          );
        })}

        {/* Blinking cursor */}
        <div className={`flex items-center gap-2 mt-1 ${dimText}`}>
          <span>$</span>
          <span className={`inline-block w-[5px] h-[13px] ${isDark ? "bg-white/50" : "bg-black/40"}`}
            style={{ animation: "blink 1s step-end infinite" }} />
        </div>
      </div>

      <style>{`
        @keyframes termLine {
          from { opacity: 0; transform: translateY(5px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
