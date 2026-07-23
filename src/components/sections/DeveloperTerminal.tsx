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
    "Role: Senior Full-Stack Engineer & Solutions Architect",
    "Bio: 6+ years of experience designing, building, and scaling",
    "     high-concurrency web apps, multi-tenant SaaS, and",
    "     enterprise AI orchestration pipelines (RAG, TTS, Voice).",
  ],
  stack: [
    "LOG: Initializing tech stack scanner...",
    "Frontend: React.js, Next.js (App Router), TypeScript, Redux, Tailwind CSS",
    "Backend: NestJS, Node.js, FastAPI, Microservices, REST, GraphQL, BullMQ",
    "Databases: PostgreSQL (RLS, Locks), pgvector, MongoDB, Redis, Pinecone, S3",
    "AI/LLM: OpenAI, Anthropic Claude, Gemini, RAG, ElevenLabs TTS, Voice Cloning",
    "Cloud & DevOps: AWS (EC2, S3, Lambda, SageMaker), Docker, GitHub Actions, Nginx",
    "Security & Testing: IDOR, JWT Auth, RBAC, Playwright, Jest",
  ],
  projects: [
    "Deployed systems:",
    "  * Voxbee.ai      - Enterprise AI-driven audio & voice intelligence platform",
    "  * Romingo        - Multilingual SaaS and localized learning platform",
    "  * SalonX/TheQube - Multi-tenant white-label SaaS booking engines",
    "  * Xeurix         - Recruitment SaaS with windowed rendering queries",
  ],
  contact: [
    "Connecting to secure mail servers...",
    "Email: hamzamanzoor8234@gmail.com",
    "Status: Available for high-impact roles & core architecture design.",
  ],
};

export default function DeveloperTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<HistoryLine[]>([
    { text: "Hamza Manzoor Core Terminal [Version 2.0.0]", type: "output" },
    { text: "Type 'help' to scan available interface commands.", type: "output" },
    { text: "", type: "output" },
  ]);
  const [isMaximized, setIsMaximized] = useState(false);

  const consoleRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new entries (scoped locally to the terminal scroll container)
  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [history]);

  // Lock background body scroll when terminal is maximized
  useEffect(() => {
    if (isMaximized) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMaximized]);

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
      e.preventDefault(); // Stop default action (prevents keypress page scroll shift)
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

  const toggleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);
    setTimeout(() => focusInput(), 50);
  };

  return (
    <div
      onClick={focusInput}
      className={`rounded-xl border border-cyan-400/25 bg-[#03060f]/95 p-5 shadow-[0_24px_55px_rgba(0,0,0,0.6)] backdrop-blur font-mono text-sm text-cyan-100 transition-all duration-300 ${
        isMaximized
          ? "fixed inset-4 z-50 flex flex-col max-w-none h-[calc(100vh-32px)]"
          : "w-full max-w-2xl"
      }`}
    >
      {/* OS Terminal Title Bar */}
      <div className="mb-4 flex items-center justify-between border-b border-cyan-500/10 pb-3">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setIsMaximized(false)}
            className="h-3 w-3 rounded-full bg-rose-500/80 hover:bg-rose-400 transition cursor-pointer border-none outline-none"
            title="Close / Restore normal size"
            aria-label="Restore terminal size"
          />
          <button
            type="button"
            onClick={() => setIsMaximized(false)}
            className="h-3 w-3 rounded-full bg-amber-500/80 hover:bg-amber-400 transition cursor-pointer border-none outline-none"
            title="Minimize"
            aria-label="Minimize terminal"
          />
          <button
            type="button"
            onClick={toggleMaximize}
            className="h-3 w-3 rounded-full bg-emerald-500/80 hover:bg-emerald-400 transition cursor-pointer border-none outline-none"
            title={isMaximized ? "Restore size" : "Maximize"}
            aria-label={isMaximized ? "Restore size" : "Maximize terminal"}
          />
        </div>
        <p className="text-[11px] tracking-wide text-cyan-300/40 uppercase">dev-terminal</p>
        <span className="w-8" />
      </div>

      {/* Terminal Screen Console */}
      <div
        ref={consoleRef}
        className={`overflow-y-auto pr-2 space-y-2 no-scrollbar select-text ${
          isMaximized ? "flex-1" : "h-[250px]"
        }`}
      >
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
