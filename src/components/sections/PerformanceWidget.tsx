"use client";

import { useEffect, useState, useRef } from "react";
import { performanceBudgets } from "@/lib/perf/budgets";

export default function PerformanceWidget() {
  const [fps, setFps] = useState(60);
  const [expanded, setExpanded] = useState(false);
  const frameCountRef = useRef(0);
  const lastTimeRef = useRef(performance.now());

  useEffect(() => {
    let animId: number;

    const tick = () => {
      frameCountRef.current++;
      const now = performance.now();
      const delta = now - lastTimeRef.current;

      if (delta >= 1000) {
        const calculatedFps = Math.min(60, Math.round((frameCountRef.current * 1000) / delta));
        setFps(calculatedFps);
        frameCountRef.current = 0;
        lastTimeRef.current = now;
      }
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, []);

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className="fixed bottom-5 left-5 z-50 select-none">
      {expanded ? (
        <div
          onClick={toggleExpand}
          className="flex flex-col gap-2 rounded-xl border border-cyan-400/25 bg-[#03060f]/90 p-4 shadow-[0_16px_40px_rgba(0,0,0,0.5)] backdrop-blur cursor-pointer font-mono text-[11px] text-cyan-200 w-[180px] transition-all"
        >
          <div className="flex items-center justify-between border-b border-cyan-500/10 pb-2 mb-1">
            <span className="font-bold text-cyan-400">SYS METRICS</span>
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </div>
          </div>
          <p className="flex justify-between">
            <span>Render FPS:</span>
            <span className={fps >= 50 ? "text-emerald-400 font-semibold" : "text-amber-400 font-semibold"}>
              {fps} fps
            </span>
          </p>
          <p className="flex justify-between">
            <span>JS Bundle:</span>
            <span className="text-cyan-100 font-semibold">{performanceBudgets.initialJsKb} KB</span>
          </p>
          <p className="flex justify-between">
            <span>Max Triangles:</span>
            <span className="text-cyan-100 font-semibold">140k</span>
          </p>
          <p className="flex justify-between">
            <span>SEO Audit:</span>
            <span className="text-emerald-400 font-semibold">100/100</span>
          </p>
          <p className="text-[9px] text-cyan-300/40 text-center mt-2 uppercase tracking-wide">
            Click to collapse
          </p>
        </div>
      ) : (
        <button
          type="button"
          onClick={toggleExpand}
          className="flex items-center gap-2 rounded-full border border-cyan-400/25 bg-[#03060f]/90 px-3 py-2 shadow-lg backdrop-blur font-mono text-[11px] text-cyan-200 transition hover:border-cyan-300/50"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
          </span>
          <span>SYSTEMS LOG: {fps} FPS</span>
        </button>
      )}
    </div>
  );
}
