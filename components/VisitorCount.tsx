"use client";

import { useEffect, useRef, useState } from "react";

export default function VisitorCount() {
  const [count, setCount] = useState<number | null>(() => {
    if (typeof window === "undefined") return null;
    const cached = sessionStorage.getItem("skills_count");
    return cached ? Number(cached) : null;
  });
  const called = useRef(false);

  useEffect(() => {
    if (called.current) return;
    called.current = true;

    const alreadyCounted = sessionStorage.getItem("skills_visited");

    const persist = (n: number) => {
      sessionStorage.setItem("skills_count", String(n));
      setCount(n);
    };

    if (alreadyCounted) {
      fetch("/api/views")
        .then((r) => r.json())
        .then((data) => persist(data.count))
        .catch(() => {});
    } else {
      sessionStorage.setItem("skills_visited", "1");
      fetch("/api/views", { method: "POST" })
        .then((r) => r.json())
        .then((data) => persist(data.count))
        .catch(() => {});
    }
  }, []);

  if (count === null) return null;

  return (
    <div className="flex items-center justify-between py-3 border-b border-black/6 dark:border-white/6">
      <span className="font-mono text-[11px] tracking-widest uppercase text-black/30 dark:text-white/25">
        Visitors
      </span>
      <span className="font-mono text-sm text-black dark:text-white tabular-nums">
        {count.toLocaleString()}
      </span>
    </div>
  );
}
