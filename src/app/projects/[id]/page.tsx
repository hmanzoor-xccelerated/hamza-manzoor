import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Script from "next/script";
import type { Metadata } from "next";

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
    name: "Voxbee.ai",
    category: "AI Voice & Translation SaaS",
    tagline:
      "Localizing media content at scale with secure S3 pipelines and containerized AI workers.",
    description:
      "Voxbee.ai is an enterprise AI-driven audio, voice cloning, and media localization platform that processes real-time voice synthesis and media translations.",
    tech: [
      "NestJS",
      "React",
      "Python",
      "AWS (EC2, S3)",
      "Docker",
      "PostgreSQL",
      "BullMQ",
      "Celery",
      "Redis",
    ],
    image: "/images/voxbee.png",
    challenge:
      "Handling high-bandwidth application server overhead during raw media transfers, managing long-running voice cloning inference queues, and securing endpoints against Insecure Direct Object Reference (IDOR) attacks.",
    architecture: [
      "Designed and deployed a secure direct-to-S3 media upload module using NestJS presigned URLs, avoiding server-side bandwidth congestion.",
      "Managed containerized AI worker node execution queues using BullMQ and Redis for real-time TTS synthesis and voice cloning.",
      "Conducted comprehensive security audits and resolved critical IDOR vulnerability threats across candidate assets and user profiles.",
    ],
    outcome: [
      "Delivered an 85% reduction in content localization cycles compared to traditional workflows.",
      "Significantly reduced application server compute overhead and network bandwidth consumption.",
      "Enhanced overall system security and integrity score by resolving IDOR and authentication vulnerabilities.",
    ],
  },
  romingo: {
    id: "romingo",
    name: "Romingo",
    category: "Multilingual SaaS Platform",
    tagline: "Scaling localized education ingestion and progress tracking.",
    description:
      "Romingo is a multilingual SaaS and learning platform featuring structured progress tracking schemas and localized user environments.",
    tech: [
      "React",
      "Next.js",
      "Node.js",
      "MongoDB",
      "AWS",
      "GitHub Actions",
      "TailwindCSS",
    ],
    image: "/images/romingo.png",
    challenge:
      "Structuring scalable databases for multi-language learning content and tracking complex student progress checkpoints across dynamic courses without latency bottlenecks.",
    architecture: [
      "Designed database localized content schemas enabling easy expansion of course languages.",
      "Engineered progress-tracking APIs with sub-second response times on deep nested category lookups.",
      "Constructed responsive localized dashboards using Next.js/React and TailwindCSS.",
    ],
    outcome: [
      "Reduced progression tracker dashboard page load time by 40%.",
      "Successfully supported multilingual content translation ingestion workflows with minimal administrative oversight.",
      "Maintained zero downtime deployments via containerized CI/CD pipelines.",
    ],
  },
  theqube: {
    id: "theqube",
    name: "SalonX & TheQube",
    category: "Multi-Tenant SaaS Engine",
    tagline:
      "Enabling secure tenant isolation and conflict-free booking slots.",
    description:
      "SalonX & TheQube are white-label multi-tenant SaaS platforms providing real-time booking, scheduling, and billing workflows for creative workspaces and salons.",
    tech: [
      "React",
      "NestJS",
      "Node.js",
      "PostgreSQL",
      "Stripe",
      "Advisory Locks",
      "Row-Level Security",
    ],
    image: "/images/qube.jpg",
    challenge:
      "Preventing slot double-booking concurrency conflicts during peak user traffic and ensuring secure tenant data isolation in a shared database schema.",
    architecture: [
      "Implemented white-label tenant isolation using PostgreSQL Row-Level Security (RLS) policies.",
      "Engineered scheduling transactional guards using PostgreSQL advisory locks to guarantee zero concurrency scheduling conflicts.",
      "Integrated Stripe billing engines to automate credits, refunds, and subscription tiers.",
    ],
    outcome: [
      "Achieved zero double-booking scheduling conflicts across all tenant environments.",
      "Maintained 99.99% system uptime during high-volume booking traffic.",
      "Automated tenant billing operations, decreasing manual support tickets by 75%.",
    ],
  },
  xeurix: {
    id: "xeurix",
    name: "Xeurix",
    category: "Enterprise Recruitment SaaS",
    tagline:
      "Optimizing candidate search queries across high-volume applicant records.",
    description:
      "Xeurix is an enterprise-grade recruitment SaaS platform mapping candidates to open jobs and managing recruiter outreach campaigns.",
    tech: [
      "React.js",
      "Node.js",
      "PostgreSQL",
      "TypeScript",
      "TailwindCSS",
      "Docker",
      "ES6",
    ],
    image: "/images/xeurix.png",
    challenge:
      "Performance degradation and CPU bottlenecks when running semantic search queries over 100k+ candidate records in the PostgreSQL database.",
    architecture: [
      "Led the frontend engineering team to build modular, component-driven layouts utilizing React.js and TypeScript.",
      "Reduced DOM weight and render latency by implementing windowed lists for candidate search results.",
      "Optimized PostgreSQL database query indexes to speed up candidate match scans.",
    ],
    outcome: [
      "Reduced search query latency by 70% for large applicant databases.",
      "Established engineering code review standards and Git branch protection rules across team divisions.",
      "Scaled applicant outreach campaigns to handle high weekly volume with stable performance.",
    ],
  },
  lartigiano: {
    id: "lartigiano",
    name: "L'Artigiano",
    category: "Gourmet Food Delivery",
    tagline: "Accelerating local e-commerce transactions.",
    description:
      "L'Artigiano is a fast gourmet food delivery web application handling high-frequency consumer transactions.",
    tech: ["React", "Next.js", "Node.js", "Express", "Stripe API", "Redux"],
    image: "/images/lartigiano.png",
    challenge:
      "Slow checkout page performance (over 3s), cart persistence failures during network drops, and low mobile checkout conversion rates.",
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
    description:
      "Camperoni is an internal logistics planning panel tracking dispatch vehicles and optimizing transit runs.",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "Redis", "Mapbox"],
    image: "/images/camperoni.png",
    challenge:
      "Live tracking latency bottlenecks, unoptimized route planning causing high fuel costs, and dispatch console slowdowns under high vehicle counts.",
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
    tagline:
      "Dynamically protecting WhatsApp Web screen layouts in public spaces.",
    description:
      "WhatsHush is an open-source, client-side browser extension safeguarding personal data previews on messaging panels using dynamic canvas filters.",
    tech: ["JavaScript", "HTML", "CSS", "Chrome Extension API", "Webpack"],
    image: "/images/whatshush.png",
    challenge:
      "Shoulder-surfing and privacy exposure when using WhatsApp Web in public transport, cafes, or co-working environments. Sensitive conversations, profile pictures, and contact previews remain completely exposed to screen peeping.",
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
      chromeWebStore:
        "https://chromewebstore.google.com/detail/whatshush/kfkhoepldonalkpldnffaeanoffkgbkh?hl=en-US&utm_source=ext_sidebar",
    },
    faq: [
      {
        question: "What is WhatsHush and how does it protect user privacy?",
        answer:
          "WhatsHush is a privacy-first browser extension for WhatsApp Web developed by Hamza Manzoor. It helps users protect their active screen states in public spaces, co-working environments, and offices by automatically blurring sensitive chat elements, contact names, profile pictures, and attachment previews. The blur is lifted dynamically only upon direct mouse hover, preventing shoulder-surfing.",
      },
      {
        question: "Where can I download WhatsHush and view its source code?",
        answer:
          "WhatsHush can be officially downloaded from the Google Chrome Web Store. The complete open-source code repository is hosted on GitHub, and its official product landing page is deployed on Vercel.",
      },
    ],
  },
  logaura: {
    id: "logaura",
    name: "Logaura",
    category: "NPM Logging Library",
    tagline: "Streamlining console outputs and backend log metrics.",
    description:
      "Logaura is a highly customizable and lightweight console logging package distributed on the npm registry for Node.js developers.",
    tech: ["Node.js", "TypeScript", "ES6 Modules", "NPM Registry"],
    image: "/images/logaura.png",
    challenge:
      "High runtime log overhead, cluttered console visual layouts, and the absence of lightweight namespace filtering configurations during backend microservice debugging.",
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
      npm: "https://www.npmjs.com/package/logaura",
    },
    faq: [
      {
        question:
          "What is the Logaura npm library and when should developers use it?",
        answer:
          "Logaura is a high-performance, lightweight, and customizable logging utility package published on the npm registry. It is designed to optimize development and production logging workflows in Node.js environments by providing pre-configured color themes, clean namespaces, customized log levels, JSON outputs, and file rotation integrations with minimal overhead.",
      },
      {
        question:
          "How do you install and integrate Logaura into a JavaScript or TypeScript project?",
        answer:
          "Logaura can be installed using package managers with the command 'npm install logaura'. It supports both CommonJS (require) and ES Module (import) exports, rendering it compatible with Node.js backends like Express, NestJS, and standalone command-line scripts.",
      },
    ],
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const study = caseStudies[id];

  if (!study) {
    return {
      title: "Project Not Found | Hamza Manzoor",
    };
  }

  const pageUrl = `https://hamza-manzoor.vercel.app/projects/${id}`;
  const imageUrl = `https://hamza-manzoor.vercel.app${study.image}`;

  return {
    title: `${study.name} — Architecture & Case Study | Hamza Manzoor`,
    description: `${study.tagline} Engineered by Hamza Manzoor using ${study.tech.slice(0, 4).join(", ")}.`,
    keywords: [
      study.name,
      `${study.name} Architecture`,
      study.category,
      "Hamza Manzoor",
      ...study.tech,
    ],
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: `${study.name} | Case Study & System Architecture`,
      description: study.tagline,
      url: pageUrl,
      siteName: "Hamza Manzoor Portfolio",
      type: "article",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${study.name} - Architectural Case Study by Hamza Manzoor`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${study.name} | Hamza Manzoor`,
      description: study.tagline,
      images: [imageUrl],
    },
  };
}

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

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hamza-manzoor.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Projects",
        item: "https://hamza-manzoor.vercel.app/projects",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: study.name,
        item: `https://hamza-manzoor.vercel.app/projects/${id}`,
      },
    ],
  };

  // Dynamic schema generation for all project types
  let pageSchema: Record<string, unknown>;
  if (id === "whatshush") {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "WhatsHush",
      operatingSystem: "ChromeOS, Windows, macOS, Linux",
      applicationCategory: "BrowserApplication",
      downloadUrl:
        "https://chromewebstore.google.com/detail/whatshush/kfkhoepldonalkpldnffaeanoffkgbkh?hl=en-US&utm_source=ext_sidebar",
      offers: {
        "@type": "Offer",
        price: "0.00",
        priceCurrency: "USD",
      },
      description: study.description,
      author: {
        "@type": "Person",
        name: "Hamza Manzoor",
        url: "https://hamza-manzoor.vercel.app/",
      },
    };
  } else if (id === "logaura") {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareSourceCode",
      name: "Logaura",
      codeRepository: "https://www.npmjs.com/package/logaura",
      programmingLanguage: "TypeScript, JavaScript",
      runtimePlatform: "Node.js",
      description: study.description,
      author: {
        "@type": "Person",
        name: "Hamza Manzoor",
        url: "https://hamza-manzoor.vercel.app/",
      },
    };
  } else {
    pageSchema = {
      "@context": "https://schema.org",
      "@type": "TechArticle",
      headline: `${study.name} — Architecture & Technical Case Study`,
      description: study.tagline,
      image: `https://hamza-manzoor.vercel.app${study.image}`,
      author: {
        "@type": "Person",
        name: "Hamza Manzoor",
        url: "https://hamza-manzoor.vercel.app/",
      },
      about: {
        "@type": "SoftwareApplication",
        name: study.name,
        applicationCategory: study.category,
      },
      keywords: study.tech.join(", "),
    };
  }

  // FAQ Schema if project contains Q&A
  const faqSchema = study.faq
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: study.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      }
    : null;

  return (
    <>
      <Script
        id={`breadcrumb-schema-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id={`page-schema-${id}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      {faqSchema && (
        <Script
          id={`faq-schema-${id}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100 pb-20">
        {/* Background neon glows */}
        <div className="absolute top-0 left-10 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        {/* Nav header */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 border-b border-cyan-500/5 mb-12">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90 hover:text-cyan-100 transition"
          >
            HM
          </Link>
          <div className="flex gap-6">
            <Link
              href="/faq"
              className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
            >
              FAQ
            </Link>
            <Link
              href="/projects"
              className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
            >
              Projects Index
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
            >
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
                  To solve these bottlenecks, the system was built using the
                  following core patterns:
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
                    <span
                      key={t}
                      className="rounded bg-cyan-400/10 px-2 py-1 text-[10.5px] font-mono text-cyan-200"
                    >
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
                  This section is optimized for Search Generative Experience
                  (SGE) and AI search agents. It answers core user questions
                  with high-authority entity references.
                </p>
              </div>
              <div className="space-y-4">
                {study.faq.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-cyan-500/5 bg-[#03060f]/40 p-5 space-y-2"
                  >
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
