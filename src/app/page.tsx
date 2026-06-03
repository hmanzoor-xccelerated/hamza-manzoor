import Script from "next/script";
import PortfolioScroll from "@/components/scroll/PortfolioScroll";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import PerformanceWidget from "@/components/sections/PerformanceWidget";

export const dynamic = "force-static";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hamza Manzoor",
    jobTitle: "Senior Full-Stack Developer & AI Systems Architect",
    url: "https://hamza-manzoor.vercel.app",
    knowsAbout: [
      "React",
      "Next.js",
      "Node.js",
      "NestJS",
      "FastAPI",
      "LLM Engineering",
      "Cloud Architecture",
    ],
  };

  return (
    <>
      <Script
        id="person-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 border-b border-cyan-500/5">
          <p className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90">HM</p>
          <nav className="flex gap-6 text-xs uppercase tracking-wider font-semibold text-slate-400">
            <a href="#projects" className="hover:text-cyan-200 transition">
              Projects
            </a>
            <a href="#about" className="hover:text-cyan-200 transition">
              About
            </a>
            <a href="#contact" className="hover:text-cyan-200 transition">
              Contact
            </a>
          </nav>
        </header>

        <div id="top" />
        
        {/* Scroll Interactive Presentation */}
        <PortfolioScroll />

        {/* Dynamic Client Inquiry & Profiling sections */}
        <About />
        <Contact />

        {/* Live System Performance Monitor Widget */}
        <PerformanceWidget />

        {/* End of journey screen */}
        <section id="end" className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">End Screen</p>
          <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
            Journey complete
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
            Horizontal scroll journey, project dashboard, and skills exploration complete.
          </p>
          <a
            href="#top"
            className="mt-8 inline-block rounded-full border border-cyan-300/50 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:text-cyan-50 select-none cursor-pointer"
          >
            Scroll To Top
          </a>
        </section>

        <footer className="mx-auto w-full max-w-6xl px-6 pb-12 pt-8 text-xs text-slate-500 border-t border-cyan-500/5 mt-10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} Hamza Manzoor. Performance-first architecture.</p>
            <p className="font-mono text-[10px] text-cyan-300/40 uppercase tracking-widest">
              SECURE DEPLOYMENT : ACTIVE
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
