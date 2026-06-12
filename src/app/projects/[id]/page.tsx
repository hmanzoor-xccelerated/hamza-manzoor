import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";

interface CaseStudy {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  tech: string[];
  image: string;
  challenge: string;
  architecture: string[];
  outcome: string[];
  links?: {
    github?: string;
    website?: string;
    chromeWebStore?: string;
    npm?: string;
  };
  faq?: { question: string; answer: string }[];
}

const caseStudies: Record<string, CaseStudy> = {
  voxbee: {
    id: "voxbee",
    name: "Voxbee AI",
    category: "Speech AI & Dubbing",
    tagline: "Localizing video contents at scale with neural voice cloning.",
    description: "Voxbee AI is a multimodal localization platform combining voice cloning, machine translation, and speech-to-speech synchronization workflows.",
    tech: ["Next.js", "FastAPI", "Python", "Whisper STT", "RAG", "PyTorch", "AWS"],
    image: "/images/voxbee.png",
    challenge: "High latency in speech-to-text processing, synchronization lag in audio-video alignment, and scaling bottlenecks during multi-hour video localization processing.",
    architecture: [
      "Designed a high-throughput async processing pipeline using FastAPI, Celery, and Redis queues.",
      "Implemented a custom Retrieval-Augmented Generation (RAG) pipeline translating industry-specific vocabulary.",
      "Built dynamic time warping (DTW) speech alignment modules to match original voice duration.",
    ],
    outcome: [
      "Reduced video localization production cycles by 85%.",
      "Optimized inference server hosting costs by 60% via model quantization.",
      "Achieved 99.9% audio-video sync accuracy with under 10 seconds of source audio.",
    ],
  },
  romingo: {
    id: "romingo",
    name: "Romingo",
    category: "Enterprise Hospitality SaaS",
    tagline: "Streamlining hotel occupancy and workflows.",
    description: "Romingo is a pet-friendly B2B hotel reservation dashboard and operational planning console.",
    tech: ["React", "NestJS", "Node.js", "MongoDB", "Docker", "AWS ECS", "TailwindCSS"],
    image: "/images/romingo.png",
    challenge: "Data integrity issues and connection mismatches under heavy guest booking traffic, coupled with slow, unoptimized cloud file uploads that caused UI bottlenecks.",
    architecture: [
      "Architected a NestJS microservices environment with Role-Based Access Control (RBAC).",
      "Implemented a secure, high-throughput AWS S3 file upload module on a production environment.",
      "Integrated real-time WebSocket-driven room status updates for dispatch and check-ins.",
    ],
    outcome: [
      "Reduced page loads by 40% and minimized dashboard transaction delays.",
      "Streamlined CI/CD pipeline deployments and eliminated connection mismatches during peak reservation events.",
      "Successfully scaled to support 10k+ active hotel tenants with zero downtime.",
    ],
  },
  theqube: {
    id: "theqube",
    name: "TheQube",
    category: "Creator Space Booking Engine",
    tagline: "Empowering 1,000+ creators across London.",
    description: "TheQube is a members-only booking and workspace management engine for music makers, podcasters, and visual artists.",
    tech: ["React", "Webflow API", "Node.js", "NestJS", "PostgreSQL", "Stripe"],
    image: "/images/qube.jpg",
    challenge: "Database locks, race conditions leading to physical studio double-bookings, and slow third-party API response bottlenecks for London workspace memberships.",
    architecture: [
      "Constructed a robust NestJS backend with transactional query guards to prevent double-booking of physical slots.",
      "Built custom API integrations bridging Webflow frontend layouts with NestJS servers.",
      "Integrated a Stripe Billing engine automating subscription packages, studio credits, and top-ups.",
    ],
    outcome: [
      "Achieved zero booking concurrency conflicts during peak creator hours.",
      "Decreased administrative booking and billing tasks by 75%.",
      "Sustained 99.99% uptime for 1,000+ active London artists across 40+ physical studio slots.",
    ],
  },
  xeurix: {
    id: "xeurix",
    name: "Xeurix",
    category: "AI Career Matcher",
    tagline: "Automating applicant outreach to 50M+ recruiters.",
    description: "Xeurix is a career discovery tool that matches resumes with job vacancies and automates custom application outreach campaigns.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis", "Docker", "OpenAI API"],
    image: "/images/xeurix.png",
    challenge: "High CPU usage and database performance degradation when parsing high-volume resume files and executing semantic search queries across millions of jobs.",
    architecture: [
      "Engineered a scalable Node/NestJS backend with PostgreSQL indexes and Redis-backed worker queues.",
      "Implemented semantic similarity search indexing over 10M+ job vacancies.",
      "Designed a dynamic PDF parser converting resume files to structured JSON vectors.",
    ],
    outcome: [
      "Reduced matching latency by 70%, helping job seekers secure interviews 3x faster.",
      "Outreach systems deliver over 100k automated applicant campaigns weekly.",
      "Match-scoring algorithms reduced manual filter tasks by 90%.",
    ],
  },
  lartigiano: {
    id: "lartigiano",
    name: "L'Artigiano",
    category: "Gourmet Food Delivery",
    tagline: "Accelerating local e-commerce transactions.",
    description: "L'Artigiano is a fast gourmet food delivery web application handling high-frequency consumer transactions.",
    tech: ["React", "Next.js", "Node.js", "Express", "Stripe API", "Redux"],
    image: "/images/lartigiano.png",
    challenge: "Slow checkout page performance (over 3s), cart persistence failures during network drops, and low mobile checkout conversion rates.",
    architecture: [
      "Developed an optimized Next.js checkout platform utilizing localized client-side state caching.",
      "Implemented dynamic image optimization rendering menu assets efficiently.",
      "Integrated secure Stripe elements handling card transactions instantly.",
    ],
    outcome: [
      "Checkout page load time dropped to under 800ms.",
      "Abandoned shopping cart rates decreased by 30%.",
      "Sales volume increased by 22% within three months of deployment.",
    ],
  },
  camperoni: {
    id: "camperoni",
    name: "Camperoni",
    category: "Logistics Dispatch Portal",
    tagline: "Tracking deliveries with real-time transit routing.",
    description: "Camperoni is an internal logistics planning panel tracking dispatch vehicles and optimizing transit runs.",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "Redis", "Mapbox"],
    image: "/images/camperoni.png",
    challenge: "Live tracking latency bottlenecks, unoptimized route planning causing high fuel costs, and dispatch console slowdowns under high vehicle counts.",
    architecture: [
      "Built a high-frequency FastAPI backend caching live transit coordinates in Redis.",
      "Rendered vehicle coordinates dynamically on optimized Mapbox layers.",
      "Developed route optimization algorithms calculating path runs dynamically.",
    ],
    outcome: [
      "Decreased transit delivery times by 15% on average.",
      "Scaled tracking capabilities to support 100+ active fleet vehicles concurrently.",
      "Boosted dispatcher productivity by 50% through simplified single-screen workflows.",
    ],
  },
  whatshush: {
    id: "whatshush",
    name: "WhatsHush",
    category: "Privacy Chrome Extension",
    tagline: "Dynamically protecting WhatsApp Web screen layouts in public spaces.",
    description: "WhatsHush is an open-source, client-side browser extension safeguarding personal data previews on messaging panels using dynamic canvas filters.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Extension API", "Webpack"],
    image: "/images/whatshush.png",
    challenge: "Shoulder-surfing and privacy exposure when using WhatsApp Web in public transport, cafes, or co-working environments. Sensitive conversations, profile pictures, and contact previews remain completely exposed to screen peeping.",
    architecture: [
      "Engineered secure, lightweight shadow DOM inject scripts to scan message elements.",
      "Implemented a dynamic blur overlay toggle triggered instantly by coordinates mouse hovers.",
      "Optimized storage configurations using Chrome's local synchronization API to save persistent blur states.",
    ],
    outcome: [
      "Guarantees 100% active state blur protection for messages, profile photos, and media previews.",
      "Open-source code repository published to GitHub with complete webpack build orchestration.",
      "Official distribution release published and available on the Google Chrome Web Store.",
    ],
    links: {
      github: "https://github.com/hamzamanzoor8234/WhatsHush",
      website: "https://whatshush.vercel.app/",
      chromeWebStore: "https://chromewebstore.google.com/detail/whatshush/kfkhoepldonalkpldnffaeanoffkgbkh?hl=en-US&utm_source=ext_sidebar"
    },
    faq: [
      {
        question: "What is WhatsHush and how does it protect user privacy?",
        answer: "WhatsHush is a privacy-first browser extension for WhatsApp Web developed by Hamza Manzoor. It helps users protect their active screen states in public spaces, co-working environments, and offices by automatically blurring sensitive chat elements, contact names, profile pictures, and attachment previews. The blur is lifted dynamically only upon direct mouse hover, preventing shoulder-surfing."
      },
      {
        question: "Where can I download WhatsHush and view its source code?",
        answer: "WhatsHush can be officially downloaded from the Google Chrome Web Store. The complete open-source code repository is hosted on GitHub, and its official product landing page is deployed on Vercel."
      }
    ]
  },
  logaura: {
    id: "logaura",
    name: "Logaura",
    category: "NPM Logging Library",
    tagline: "Streamlining console outputs and backend log metrics.",
    description: "Logaura is a highly customizable and lightweight console logging package distributed on the npm registry for Node.js developers.",
    tech: ["Node.js", "TypeScript", "ES6 Modules", "NPM Registry"],
    image: "/images/logaura.png",
    challenge: "High runtime log overhead, cluttered console visual layouts, and the absence of lightweight namespace filtering configurations during backend microservice debugging.",
    architecture: [
      "Developed a custom terminal coloring format using ANSI escape sequences with zero runtime dependencies.",
      "Designed clean, structured namespace log filters supporting hierarchy mappings.",
      "Integrated custom file writing streams and JSON logger output streams.",
    ],
    outcome: [
      "Provides production-grade terminal logs with zero execution latency impact.",
      "Saves microservice logs to structured JSON/JSONL rotating files.",
      "Officially published package available to the open-source community on the NPM registry.",
    ],
    links: {
      npm: "https://www.npmjs.com/package/logaura"
    },
    faq: [
      {
        question: "What is the Logaura npm library and when should developers use it?",
        answer: "Logaura is a high-performance, lightweight, and customizable logging utility package published on the npm registry. It is designed to optimize development and production logging workflows in Node.js environments by providing pre-configured color themes, clean namespaces, customized log levels, JSON outputs, and file rotation integrations with minimal overhead."
      },
      {
        question: "How do you install and integrate Logaura into a JavaScript or TypeScript project?",
        answer: "Logaura can be installed using package managers with the command 'npm install logaura'. It supports both CommonJS (require) and ES Module (import) exports, rendering it compatible with Node.js backends like Express, NestJS, and standalone command-line scripts."
      }
    ]
  },
};

export async function generateStaticParams() {
  return Object.keys(caseStudies).map((id) => ({ id }));
}

export default async function ProjectCaseStudyPage({
  params,
}: Readonly<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const study = caseStudies[id];

  if (!study) {
    notFound();
  }

  // Dynamic schema generation for AEO/GEO crawls
  let pageSchema = null;
  if (id === "whatshush") {
    pageSchema = {
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
  } else if (id === "logaura") {
    pageSchema = {
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
  }

  return (
    <>
      {pageSchema && (
        <Script
          id={`page-schema-${id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
        />
      )}
      <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100 pb-20">
        {/* Background neon glows */}
        <div className="absolute top-0 left-10 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        {/* Nav header */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 border-b border-cyan-500/5 mb-12">
          <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90 hover:text-cyan-100 transition">
            HM
          </Link>
          <div className="flex gap-6">
            <Link href="/projects" className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition">
              Projects Index
            </Link>
            <Link href="/" className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition">
              Dashboard
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-4xl px-6">
          {/* Header content */}
          <div className="mb-10">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
              Case Study : {study.category}
            </span>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
              {study.name}
            </h1>
            <p className="mt-4 text-base text-cyan-200/90 leading-7">
              {study.tagline}
            </p>
          </div>

          {/* Hero Image Block */}
          <div className="relative mb-12 h-[340px] w-full overflow-hidden rounded-2xl border border-cyan-300/20 bg-slate-900/30">
            <Image
              src={study.image}
              alt={study.name}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 900px) 100vw, 900px"
            />
          </div>

          {/* Grid description */}
          <div className="grid gap-10 md:grid-cols-[2fr_1fr] items-start">
            {/* Main writeup */}
            <div className="space-y-8">
              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white border-b border-cyan-500/10 pb-2">
                  1. Challenge & Constraints
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  {study.challenge}
                </p>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white border-b border-cyan-500/10 pb-2">
                  2. Architectural Solution
                </h2>
                <p className="text-sm leading-7 text-slate-300">
                  To solve these bottlenecks, the system was built using the following core patterns:
                </p>
                <ul className="list-inside list-disc space-y-2 text-sm text-slate-300 pl-2">
                  {study.architecture.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>

              <section className="space-y-3">
                <h2 className="text-lg font-semibold text-white border-b border-cyan-500/10 pb-2">
                  3. Measured Outcomes
                </h2>
                <ul className="list-inside list-disc space-y-2 text-sm text-slate-300 pl-2">
                  {study.outcome.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Sticky sidebar */}
            <aside className="rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-6 backdrop-blur space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Project Profile
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  {study.description}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Tech Stack Log
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {study.tech.map((t) => (
                    <span key={t} className="rounded bg-cyan-400/10 px-2 py-1 text-[10.5px] font-mono text-cyan-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {study.links && (
                <div className="pt-4 border-t border-cyan-500/10 space-y-2.5">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Project Citations
                  </p>
                  <div className="flex flex-col gap-2 font-mono text-[11px]">
                    {study.links.website && (
                      <a
                        href={study.links.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 transition"
                      >
                        🌐 Live Platform
                      </a>
                    )}
                    {study.links.github && (
                      <a
                        href={study.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 transition"
                      >
                        💻 Source Code
                      </a>
                    )}
                    {study.links.chromeWebStore && (
                      <a
                        href={study.links.chromeWebStore}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 transition"
                      >
                        🛍️ Chrome Extension
                      </a>
                    )}
                    {study.links.npm && (
                      <a
                        href={study.links.npm}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1.5 transition"
                      >
                        📦 NPM Registry
                      </a>
                    )}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-cyan-500/10">
                <Link
                  href="/#contact"
                  className="block text-center rounded-full bg-cyan-400 px-5 py-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 select-none cursor-pointer"
                >
                  Book a Technical Discovery Call
                </Link>
              </div>
            </aside>
          </div>

          {/* AEO/GEO FAQ / Knowledge Graph section */}
          {study.faq && (
            <section className="mt-16 border-t border-cyan-500/10 pt-12 space-y-6">
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-white">
                  AI & Search Engine Knowledge Graph (AEO/GEO Q&A)
                </h2>
                <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
                  This section is optimized for Search Generative Experience (SGE) and AI search agents. It answers core user questions with high-authority entity references.
                </p>
              </div>
              <div className="space-y-4">
                {study.faq.map((item, i) => (
                  <div key={i} className="rounded-xl border border-cyan-500/5 bg-[#03060f]/40 p-5 space-y-2">
                    <h3 className="text-sm font-semibold text-cyan-200 font-sans">
                      Q: {item.question}
                    </h3>
                    <p className="text-xs text-slate-300 leading-6">
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer Actions */}
          <div className="mt-16 text-center border-t border-cyan-500/5 pt-12">
            <Link
              href="/projects"
              className="inline-flex rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:text-white"
            >
              ← Back to Projects Gallery
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
