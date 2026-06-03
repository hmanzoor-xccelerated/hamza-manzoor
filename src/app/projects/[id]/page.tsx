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
