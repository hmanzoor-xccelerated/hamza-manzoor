"use client";

import { useState, useRef, useEffect } from "react";
import type { KeyboardEvent, ChangeEvent } from "react";

interface HistoryLine {
  text: string;
  type: "input" | "output" | "error" | "prompt";
}

const COMMAND_OUTPUTS: Record<string, string[]> = {
  help: [
    "Available commands:",
    "  bio      - Read brief professional biography",
    "  stack    - Output system architecture stack logs",
    "  projects - Print portfolio product specifications",
    "  contact  - Display secure channels to reach me",
    "  clear    - Flush terminal console screen",
  ],
  bio: [
    "Name: Hamza Manzoor",
    "Role: Senior Full-Stack Developer & AI Systems Architect",
    "Bio: I build high-concurrency SaaS platforms, automate",
    "     multimodal AI translation pipelines, and deploy robust",
    "     AWS/GCP architectures with performance-first execution.",
  ],
  stack: [
    "LOG: Initializing tech stack scanner...",
    "Frontend: React, Next.js (App Router), TailwindCSS, Framer Motion",
    "Backend: Node.js, NestJS, Python, FastAPI, NestJS, REST, GraphQL",
    "AI/LLM: Retrieval-Augmented Generation (RAG), Speech-to-Text (STT), Whisper",
    "Databases: PostgreSQL, MongoDB, Redis, vector stores",
    "Cloud & Infra: AWS (S3, EC2, ECS, Lambda), Docker, GitHub Actions CI/CD",
  ],
  projects: [
    "Deployed systems:",
    "  * Voxbee AI      - Multimodal AI platform for video dubbing & speech cloning",
    "  * Romingo        - Enterprise B2B hotel suite & operational SaaS",
    "  * TheQube        - Members' studio space community platform in London",
    "  * Xeurix         - Intelligent AI job matching & automated applicant outreach",
  ],
  contact: [
    "Connecting to secure mail servers...",
    "Email: hello@hamzamanzoor.dev",
    "Status: Available for high-impact consulting & core architect roles.",
  ],
};

export default function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: "Hamza Manzoor Core Terminal [Version 2.0.0]", type: "output" },
    { text: "Type 'help' to scan available interface commands.", type: "output" },
    { text: "", type: "output" },
  ]);

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new entries (scoped locally to the terminal scroll container)
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history];

    newHistory.push({
      text: `visitor@hamzamanzoor:~$ ${cmd}`,
      type: "prompt",
    });

    if (trimmed === "") {
      setHistory(newHistory);
      return;
    }

    if (trimmed === "clear") {
      setHistory([]);
      return;
    }

    const output = COMMAND_OUTPUTS[trimmed];
    if (output) {
      output.forEach((line) => {
        newHistory.push({ text: line, type: "output" });
      });
    } else {
      newHistory.push({
        text: `Command not found: '${trimmed}'. Type 'help' for options.`,
        type: "error",
      });
    }

    setHistory(newHistory);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(input);
      setInput("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <div
      onClick={focusInput}
      className="w-full max-w-2xl rounded-xl border border-cyan-400/25 bg-[#03060f]/90 p-5 shadow-[0_24px_55px_rgba(0,0,0,0.6)] backdrop-blur cursor-text font-mono text-sm text-cyan-100"
    >
      {/* OS Terminal Title Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-cyan-500/10 pb-3">
        <div className="flex gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500/80" />
          <span className="h-3 w-3 rounded-full bg-amber-500/80" />
          <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
        </div>
        <p className="text-[11px] tracking-wide text-cyan-300/40 uppercase">dev-terminal</p>
        <span className="w-8" />
      </div>

      {/* Terminal Screen Console */}
      <div ref={consoleRef} className="h-[250px] overflow-y-auto pr-2 space-y-2 no-scrollbar select-text">
        {history.map((line, index) => {
          let colorClass = "text-slate-300";
          if (line.type === "prompt") colorClass = "text-cyan-400 font-semibold";
          if (line.type === "error") colorClass = "text-rose-400 font-semibold";
          if (line.type === "output") colorClass = "text-cyan-100/90";

          return (
            <p key={index} className={`leading-6 whitespace-pre-wrap ${colorClass}`}>
              {line.text}
            </p>
          );
        })}
      </div>

      {/* Input Prompt Line */}
      <div className="mt-3 flex items-center gap-2 border-t border-cyan-500/10 pt-3">
        <span className="text-cyan-400 font-semibold select-none">visitor@hamzamanzoor:~$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-cyan-200 outline-none border-none caret-cyan-400 p-0"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck="false"
          aria-label="Terminal input query"
        />
      </div>
    </div>
  );
}
