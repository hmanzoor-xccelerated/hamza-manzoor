import Script from "next/script";
import PortfolioScroll from "@/components/scroll/PortfolioScroll";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import PerformanceWidget from "@/components/sections/PerformanceWidget";

export const dynamic = "force-static";

export default function Home() {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Hamza Manzoor - Software Development Services",
    "image": "https://hamza-manzoor.vercel.app/og-image.png",
    "url": "https://hamza-manzoor.vercel.app/",
    "priceRange": "$$$",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Lahore",
      "addressRegion": "Punjab",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "31.5204",
      "longitude": "74.3587"
    },
    "description": "Production-ready full-stack software engineering, specializing in Next.js, TypeScript, NestJS microservices, cloud deployments, and AI integrations.",
    "knowsAbout": [
      "Software Engineering",
      "Full-Stack Web Development",
      "Next.js Development",
      "NestJS Backend Architecture",
      "Cloud Infrastructure & DevOps",
      "AI Agent Workflows"
    ]
  };

  const whatsHushSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "WhatsHush",
    "operatingSystem": "ChromeOS, Windows, macOS, Linux",
    "applicationCategory": "BrowserApplication",
    "downloadUrl": "https://chromewebstore.google.com/detail/whatshush/kfkhoepldonalkpldnffaeanoffkgbkh?hl=en-US&utm_source=ext_sidebar",
    "offers": {
      "@type": "Offer",
      "price": "0.00",
      "priceCurrency": "USD"
    },
    "description": "WhatsHush is a privacy-first Google Chrome extension designed by Hamza Manzoor to blur sensitive chat details and profiles on WhatsApp Web dynamically on hover.",
    "author": {
      "@type": "Person",
      "name": "Hamza Manzoor",
      "url": "https://hamza-manzoor.vercel.app/"
    }
  };

  const logauraSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": "Logaura",
    "codeRepository": "https://www.npmjs.com/package/logaura",
    "programmingLanguage": "TypeScript, JavaScript",
    "runtimePlatform": "Node.js",
    "description": "Logaura is a highly optimized, custom console logging utility on the npm registry authored by Hamza Manzoor to streamline terminal outputs in microservices.",
    "author": {
      "@type": "Person",
      "name": "Hamza Manzoor",
      "url": "https://hamza-manzoor.vercel.app/"
    }
  };

  return (
    <>
      <Script
        id="professional-service-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
      />
      <Script
        id="whatshush-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(whatsHushSchema) }}
      />
      <Script
        id="logaura-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(logauraSchema) }}
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
