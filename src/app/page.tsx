import Script from "next/script";
import PortfolioScroll from "@/components/scroll/PortfolioScroll";

export default function Home() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Hamza Manzoor",
    jobTitle: "Senior Full-Stack Developer & AI Systems Architect",
    url: "https://hamzamanzoor.dev",
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
      <div className="relative min-h-screen bg-[#05070f] text-slate-100">
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
          <p className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90">HM</p>
          <nav className="flex gap-4 text-sm text-slate-300">
            <a href="#projects" className="hover:text-cyan-200">
              Projects
            </a>
            <a href="#end" className="hover:text-cyan-200">
              End
            </a>
            <a href="#top" className="hover:text-cyan-200">
              Top
            </a>
          </nav>
        </header>
        <div id="top" />
        <PortfolioScroll />

        <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-3 text-xs text-slate-400">
          © {new Date().getFullYear()} Hamza Manzoor. Built with Next.js.
        </footer>
      </div>
    </>
  );
}
