import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Gallery | Hamza Manzoor",
  description: "Browse the architectural specifications and engineering systems designed by Hamza Manzoor.",
};

const allProjects = [
  {
    id: "voxbee",
    name: "Voxbee AI",
    category: "Speech AI & Dubbing",
    description: "Multimodal pipeline orchestrating automated video dubbing, speech-to-speech translations, voice cloning, and digital presenter generation.",
    specs: ["High-speed Whisper STT processing", "Dynamic audio-video alignment engines", "RAG architectures for term localizations"],
    tech: "Next.js, FastAPI, Python, RAG, PyTorch",
    image: "/images/voxbee.png",
  },
  {
    id: "romingo",
    name: "Romingo",
    category: "Enterprise Hospitality SaaS",
    description: "Multi-tenant B2B hotel reservation suite with role-based dashboard permissions and automated business administration operations.",
    specs: ["Complex user-role workspace pipelines", "Secure AWS cloud microservices", "Real-time occupancy charts & calendars"],
    tech: "React, NestJS, MongoDB, Docker, AWS",
    image: "/images/romingo.png",
  },
  {
    id: "theqube",
    name: "TheQube",
    category: "Creator Space Booking Engine",
    description: "Custom space-booking platform serving a community of 1,000+ music, podcast, and photography creators in London.",
    specs: ["Interactive studio slots & calendar sync", "Webflow layout + API bridge", "Automated billing integrations"],
    tech: "React, Webflow, Node.js, NestJS, Stripe",
    image: "/images/qube.jpg",
  },
  {
    id: "xeurix",
    name: "Xeurix",
    category: "AI Career Engine",
    description: "Intelligent career candidate tool querying millions of job vacancies, matching applicants, and automating outreach templates to recruiters.",
    specs: ["Matches jobs using semantic analysis", "Outreach logging to 50M+ contacts", "High-concurrency postgres queues"],
    tech: "Next.js, NestJS, PostgreSQL, Redis, Docker",
    image: "/images/xeurix.png",
  },
  {
    id: "lartigiano",
    name: "L'Artigiano",
    category: "Gourmet Food Delivery",
    description: "High-performance consumer ordering and menu grid platform featuring lightning-fast checkouts and cart caching structures.",
    specs: ["Dynamic client checkout caching", "Menu grids optimized for layout loads", "Secured payment gateways"],
    tech: "React, Next.js, Node.js, Express, Stripe",
    image: "/images/lartigiano.png",
  },
  {
    id: "camperoni",
    name: "Camperoni",
    category: "Logistics Dispatch Portal",
    description: "Internal tracking console showing real-time truck transit routes, dispatch statuses, and parcel delivery flows.",
    specs: ["Live vehicle geolocation mapping", "Automated routing optimization", "High-concurrency updates"],
    tech: "React, FastAPI, Python, PostgreSQL, Redis",
    image: "/images/camperoni.png",
  },
];

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100 pb-20">
      {/* Background Gradient Meshes */}
      <div className="absolute top-0 left-1/4 h-[35vw] w-[35vw] max-w-[500px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 h-[40vw] w-[40vw] max-w-[600px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

      {/* Header Container */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 border-b border-cyan-500/5 mb-14">
        <Link href="/" className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90 hover:text-cyan-100 transition">
          HM
        </Link>
        <Link href="/" className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Page Title */}
      <main className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80 font-mono">Portfolio Index</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Systems & Architecture Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            A comprehensive catalog of enterprise integrations, AI engines, and backend frameworks built with performance-first engineering. Click any card to inspect its full case study.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-cyan-300/15 bg-slate-950/40 p-6 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:shadow-2xl hover:translate-y-[-2px] shadow-xl group"
            >
              <Link href={`/projects/${project.id}`} className="block cursor-pointer">
                {/* Image Frame */}
                <div className="relative mb-5 h-[180px] w-full overflow-hidden rounded-xl border border-cyan-500/10 bg-slate-900/30">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 90vw, 30vw"
                  />
                </div>

                {/* Title & Category */}
                <div className="mb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                    {project.category}
                  </span>
                  <h2 className="mt-1 text-xl font-semibold text-white group-hover:text-cyan-300 transition">{project.name}</h2>
                </div>
              </Link>

              {/* Description */}
              <p className="text-xs leading-6 text-slate-300 mb-5 flex-grow">
                {project.description}
              </p>

              {/* Bulleted Specifications */}
              <div className="border-t border-cyan-500/5 pt-4 mb-5 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Architecture Specs:</p>
                <ul className="list-inside list-disc space-y-1 text-[11px] text-slate-400 leading-5">
                  {project.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className="border-t border-cyan-500/5 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">Tech Stack:</p>
                <span className="text-[10.5px] font-mono text-cyan-200/90 leading-relaxed">
                  {project.tech}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom CTA Block */}
        <div className="mt-16 text-center border-t border-cyan-500/5 pt-12">
          <Link
            href="/"
            className="inline-flex rounded-full border border-cyan-300/40 px-6 py-3 text-sm font-semibold text-cyan-200 transition hover:border-cyan-200 hover:text-white"
          >
            ← Return to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
}
