import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
    challenge: "Traditional localization is slow, costly, and lacks the speaker's original vocal nuances. The client required a platform capable of handling multi-hour video uploads, cloning voices with under 10 seconds of source audio, and automatically syncing translated voiceovers back into the video timeline.",
    architecture: [
      "Distributed queues (Celery/Redis) processing heavy video chunks asynchronously.",
      "Custom Retrieval-Augmented Generation (RAG) pipeline translating industry-specific vocabulary accurately.",
      "Speech alignment module matching voice duration using dynamic time warping (DTW).",
    ],
    outcome: [
      "Video localization production cycles reduced by 85%.",
      "Cloning accuracy rated above 94% by human evaluators.",
      "Inference server hosting costs optimized by 60% via model quantization.",
    ],
  },
  romingo: {
    id: "romingo",
    name: "Romingo",
    category: "Enterprise Hospitality SaaS",
    tagline: "Streamlining hotel occupancy and workflows.",
    description: "Romingo is a pet-friendly multi-tenant hotel reservation dashboard and B2B operational planning console.",
    tech: ["React", "NestJS", "Node.js", "MongoDB", "Docker", "AWS ECS", "TailwindCSS"],
    image: "/images/romingo.png",
    challenge: "Hoteliers struggle with disjointed software for booking adjustments, check-in operations, and policies. The client needed a secure, role-based platform that aggregates booking states, provides room dispatch checklists, and links dynamically with pet-friendly booking parameters.",
    architecture: [
      "Role-Based Access Control (RBAC) protecting workspace resource APIs.",
      "WebSocket-driven room status updates for dispatch and check-ins.",
      "Highly responsive calendar booking matrix handling concurrent edits securely.",
    ],
    outcome: [
      "Manual check-in overhead reduced by 40%.",
      "SaaS dashboard handles 10k+ active hotel tenants with zero downtime.",
      "User satisfaction rating increased to 4.8/5.0 stars.",
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
    challenge: "Managing physical studio access slots across four London sites is complex. The client required an interactive calendar system to book studio slots, handle monthly subscription plans, and manage members' accounts seamlessly.",
    architecture: [
      "API integrations bridging Webflow frontend templates with NestJS servers.",
      "Stripe Billing system automating subscription packages, studio credits, and top-ups.",
      "Optimized query structures preventing double-booking of physical slots.",
    ],
    outcome: [
      "Booking engine runs with 99.99% uptime during peak creator hours.",
      "Supports over 1,000 active London artists across 40+ physical studio slots.",
      "Administrative booking tasks decreased by 75%.",
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
    challenge: "Applicants spend hours matching resumes to job criteria and looking up recruiters on LinkedIn. The client needed a platform to process job postings, rank them, and automate customized outreach drafts.",
    architecture: [
      "Semantic similarity search indexing over 10M+ job vacancies.",
      "High-throughput worker queues managing recruiter outreach emails.",
      "Dynamic PDF parser converting resume files to structured JSON vectors.",
    ],
    outcome: [
      "Job seekers secure interviews 3x faster.",
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
    challenge: "Slow checkout load times and poor cart persistence cause high drop-off rates on food ordering apps. The client needed a localized, high-speed menu grid and payment interface to maximize transaction velocity.",
    architecture: [
      "Client-side checkout state caching reducing page reload friction.",
      "Dynamic image optimization rendering menu assets efficiently.",
      "Secure Stripe elements handling card transactions instantly.",
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
    description: "Camperoni is an internal logistics planning panel tracking dispatch vehicles and optimize transit runs.",
    tech: ["React", "FastAPI", "Python", "PostgreSQL", "Redis", "Mapbox"],
    // Use the real camperoni image
    image: "/images/camperoni.png",
    challenge: "Logistics dispatchers struggle with manual route planning and slow vehicle tracking logs. The client needed a live mapping console showing package statuses, vehicle assignments, and route configurations.",
    architecture: [
      "Real-time vehicle coordinates rendered on Mapbox layers.",
      "FastAPI backend caching dispatch states in Redis for fast updates.",
      "Route optimization algorithms calculating path runs dynamically.",
    ],
    outcome: [
      "Delivery dispatch workflow capacity increased by 50%.",
      "Average package transit delivery times decreased by 15%.",
      "Dispatch teams manage 100+ active fleet vehicles from a single screen.",
    ],
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

  return (
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
                1. Context & Challenge
              </h2>
              <p className="text-sm leading-7 text-slate-300">
                {study.challenge}
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-semibold text-white border-b border-cyan-500/10 pb-2">
                2. System Architecture & Engineering
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
                3. Business & Performance Outcomes
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

            <div className="pt-4 border-t border-cyan-500/10">
              <Link
                href="#contact"
                className="block text-center rounded-full bg-cyan-400 px-5 py-3 text-xs font-semibold text-slate-950 transition hover:bg-cyan-300 select-none cursor-pointer"
              >
                Inquire About System
              </Link>
            </div>
          </aside>
        </div>

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
  );
}
