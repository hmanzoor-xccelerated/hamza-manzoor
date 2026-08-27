import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects & Systems Architecture Gallery | Hamza Manzoor",
  description:
    "Browse the architectural specifications, systems case studies, and engineering solutions designed by Hamza Manzoor — featuring Next.js, NestJS, BullMQ, PostgreSQL Advisory Locks, and AWS.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects & Systems Architecture Gallery | Hamza Manzoor",
    description:
      "Architectural specifications and engineering case studies including Voxbee.ai, SalonX/TheQube, Romingo, Xeurix, WhatsHush, and Logaura.",
    url: "https://hamza-manzoor.vercel.app/projects",
    siteName: "Hamza Manzoor Portfolio",
    type: "website",
    images: [
      {
        url: "/images/hamza-portraitfull.jpg",
        width: 1200,
        height: 630,
        alt: "Hamza Manzoor - Systems & Architecture Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects & Systems Architecture Gallery | Hamza Manzoor",
    description:
      "Browse architectural specifications and case studies designed by Hamza Manzoor.",
    images: ["/images/hamza-portraitfull.jpg"],
  },
};

const allProjects = [
  {
    id: "voxbee",
    name: "Voxbee.ai",
    category: "AI Voice & Translation SaaS",
    description:
      "Challenge: High-volume media upload compute overhead and audio-video sync latency. Solution: Designed secure direct-to-S3 NestJS uploads via presigned URLs and dynamic time-warping speech alignments. Outcome: Reduced content localization cycles by 85%.",
    specs: [
      "Secure direct S3 uploads via NestJS presigned URLs",
      "Managed containerized AI GPU worker nodes via BullMQ",
      "Integrated voice cloning & speech synthesis pipelines",
    ],
    tech: "NestJS, React, Python, AWS (EC2, S3), Docker, PostgreSQL, BullMQ",
    image: "/images/voxbee.png",
  },
  {
    id: "romingo",
    name: "Romingo",
    category: "Multilingual SaaS Platform",
    description:
      "Challenge: Ingesting localized content schemas and tracking user progress across multilingual environments. Solution: Designed localized content ingestion and user progression tracking database architectures. Outcome: Reduced page loads by 40%.",
    specs: [
      "Localized content ingestion systems",
      "Scalable user progression tracking architecture",
      "Responsive Next.js & React dashboards",
    ],
    tech: "React, Next.js, Node.js, MongoDB, AWS",
    image: "/images/romingo.png",
  },
  {
    id: "theqube",
    name: "SalonX & TheQube",
    category: "Multi-Tenant SaaS Engine",
    description:
      "Challenge: Concurrency database locks on shared schedules and tenant isolation. Solution: Implemented white-label SaaS architectures using PostgreSQL Row-Level Security (RLS) and advisory locks. Outcome: Achieved zero double-booking concurrency conflicts.",
    specs: [
      "White-label multi-tenant SaaS architecture",
      "Row-Level Security (RLS) database isolation",
      "PostgreSQL advisory locks to prevent double-bookings",
    ],
    tech: "React, NestJS, PostgreSQL, Node.js, Stripe",
    image: "/images/qube.jpg",
  },
  {
    id: "xeurix",
    name: "Xeurix",
    category: "Enterprise Recruitment SaaS",
    description:
      "Challenge: Semantic search latency over 100k+ candidate records and code governance. Solution: Engineered windowed frontend rendering and optimized PostgreSQL query indexes. Outcome: Reduced search latency by 70%.",
    specs: [
      "Windowed data rendering on React",
      "Optimized PostgreSQL queries & indexes",
      "Established code review & branch protection rules",
    ],
    tech: "React.js, Node.js, PostgreSQL, TypeScript",
    image: "/images/xeurix.png",
  },
  {
    id: "lartigiano",
    name: "L'Artigiano",
    category: "Gourmet Food Delivery",
    description:
      "Challenge: Slow checkout performance (over 3s) & cart loss. Solution: Built optimized Next.js checkout cache. Outcome: Dropped load time to <800ms and reduced cart abandonment by 30%.",
    specs: [
      "Dynamic client checkout caching",
      "Menu grids optimized for layout loads",
      "Secured payment gateways",
    ],
    tech: "React, Next.js, Node.js, Express, Stripe",
    image: "/images/lartigiano.png",
  },
  {
    id: "camperoni",
    name: "Camperoni",
    category: "Logistics Dispatch Portal",
    description:
      "Challenge: Live tracking latency & unoptimized dispatch logs. Solution: Developed FastAPI + Redis transit cache and Mapbox integration. Outcome: Halved transit delivery tracking lag.",
    specs: [
      "Live vehicle geolocation mapping",
      "Automated routing optimization",
      "High-concurrency updates",
    ],
    tech: "React, FastAPI, Python, PostgreSQL, Redis",
    image: "/images/camperoni.png",
  },
  {
    id: "whatshush",
    name: "WhatsHush",
    category: "Privacy Chrome Extension",
    description:
      "Challenge: Screen-peeping / shoulder-surfing in public spaces. Solution: Engineered a canvas privacy blur Chrome extension overlay. Outcome: Secured active screen visual states with 100% blur protection.",
    specs: [
      "Canvas element-blurring filters",
      "Chrome Extension runtime triggers",
      "Instant toggle keyboard hotkeys",
    ],
    tech: "JavaScript, HTML, CSS, Chrome Extension API",
    image: "/images/whatshush.png",
  },
  {
    id: "logaura",
    name: "Logaura",
    category: "NPM Logging Library",
    description:
      "Challenge: Logging engine overhead & poor CLI display tags. Solution: Built custom color filters & high-frequency file writers. Outcome: Enhanced log processing efficiency with zero runtime lag.",
    specs: [
      "Pre-configured color themes",
      "High-performance file rotators",
      "Minimal runtime execution overhead",
    ],
    tech: "Node.js, TypeScript, NPM package",
    image: "/images/logaura.png",
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
            href="/"
            className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
          >
            ← Dashboard
          </Link>
        </div>
      </header>

      {/* Page Title */}
      <main className="mx-auto w-full max-w-6xl px-6">
        <div className="mb-12">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80 font-mono">
            Portfolio Index
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
            Systems & Architecture Gallery
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
            A comprehensive catalog of enterprise integrations, AI engines, and
            backend frameworks built with performance-first engineering. Click
            any card to inspect its full case study.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {allProjects.map((project) => (
            <article
              key={project.name}
              className="flex flex-col rounded-2xl border border-cyan-300/15 bg-slate-950/40 p-6 backdrop-blur transition-all duration-300 hover:border-cyan-400/30 hover:shadow-2xl hover:translate-y-[-2px] shadow-xl group"
            >
              <Link
                href={`/projects/${project.id}`}
                className="block cursor-pointer"
              >
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
                  <h2 className="mt-1 text-xl font-semibold text-white group-hover:text-cyan-300 transition">
                    {project.name}
                  </h2>
                </div>
              </Link>

              {/* Description */}
              <p className="text-xs leading-6 text-slate-300 mb-5 flex-grow">
                {project.description}
              </p>

              {/* Bulleted Specifications */}
              <div className="border-t border-cyan-500/5 pt-4 mb-5 space-y-2">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Architecture Specs:
                </p>
                <ul className="list-inside list-disc space-y-1 text-[11px] text-slate-400 leading-5">
                  {project.specs.map((spec, i) => (
                    <li key={i}>{spec}</li>
                  ))}
                </ul>
              </div>

              {/* Technology Stack */}
              <div className="border-t border-cyan-500/5 pt-4">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                  Tech Stack:
                </p>
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
