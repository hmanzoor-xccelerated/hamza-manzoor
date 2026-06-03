"use client";

import DeveloperTerminal from "@/components/sections/DeveloperTerminal";

export function About() {
  return (
    <section id="about" className="mx-auto w-full max-w-6xl px-6 py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Profile</p>
      <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">About the Architect</h2>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 mb-10">
        Bridging the gap between robust systems engineering and cutting-edge artificial intelligence platforms.
      </p>

      <div className="grid gap-8 lg:grid-cols-2 items-start">
        {/* Left Side: Bio description card */}
        <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-7 backdrop-blur">
          <h3 className="text-xl font-semibold text-cyan-100">Core Engineering Principles</h3>
          <p className="mt-4 text-sm leading-7 text-slate-300">
            I specialize in designing production-grade SaaS platforms and orchestrating multimodal AI pipelines 
            (including voice cloning, TTS systems, and RAG architectures). I focus on minimizing infrastructure 
            costs, maintaining high test coverage, and optimizing API response metrics.
          </p>
          <div className="mt-6 space-y-3 font-mono text-xs text-cyan-200/90 border-t border-cyan-500/10 pt-5">
            <p className="flex justify-between">
              <span>Primary Focus:</span>
              <span className="text-slate-100 font-sans font-semibold">High-Scale Backend & AI Integration</span>
            </p>
            <p className="flex justify-between">
              <span>Global Architecture:</span>
              <span className="text-slate-100 font-sans font-semibold">Microservices & Serverless Mesh</span>
            </p>
            <p className="flex justify-between">
              <span>Core Stack:</span>
              <span className="text-slate-100 font-sans font-semibold">React/Next, Python/FastAPI, Node/Nest, AWS</span>
            </p>
          </div>
        </div>

        {/* Right Side: Interactive CLI Terminal */}
        <div className="flex justify-center w-full">
          <DeveloperTerminal />
        </div>
      </div>
    </section>
  );
}
