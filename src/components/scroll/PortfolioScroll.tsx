"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import type { CSSProperties, MouseEvent } from "react";

const projectSlides = [
  {
    id: "voxbee",
    title: "Voxbee.ai",
    description:
      "Challenge: High-volume media upload latency and audio-video localization sync. Solution: Built secure NestJS direct-to-S3 presigned URLs, BullMQ workers, and dynamic time-warping speech alignments. Outcome: Reduced localization cycles by 85%.",
    tech: "NestJS, React, Python, AWS (EC2, S3), Docker, PostgreSQL",
    image: "/images/voxbee.png",
  },
  {
    id: "romingo",
    title: "Romingo",
    description:
      "Challenge: Slow progress tracking and unoptimized localized content pipelines. Solution: Designed a modular content localization schema and optimized user progression tracking. Outcome: Reduced page loads by 40%.",
    tech: "React, Next.js, Node.js, MongoDB, AWS",
    image: "/images/romingo.png",
  },
  {
    id: "theqube",
    title: "SalonX & TheQube",
    description:
      "Challenge: Concurrency database locks and security isolation across tenant spaces. Solution: Implemented white-label SaaS architectures using PostgreSQL Row-Level Security (RLS) and advisory locks. Outcome: Achieved 99.99% uptime with zero slot scheduling conflicts.",
    tech: "React, NestJS, PostgreSQL, Stripe, Node.js",
    image: "/images/qube.jpg",
  },
  {
    id: "xeurix",
    title: "Xeurix",
    description:
      "Challenge: High CPU usage on semantic queries across 100k+ candidate records. Solution: Optimized PostgreSQL indexes, scaled background workers, and implemented windowed rendering. Outcome: Reduced query latency by 70%.",
    tech: "React.js, Node.js, PostgreSQL, TypeScript",
    image: "/images/xeurix.png",
  },
  {
    id: "whatshush",
    title: "WhatsHush",
    description:
      "Challenge: Screen-peeping / shoulder-surfing in public spaces. Solution: Engineered a canvas privacy blur Chrome extension overlay. Outcome: Secured active screen visual states with 100% blur protection.",
    tech: "JavaScript, HTML, CSS, Chrome Extension API",
    image: "/images/whatshush.png",
  },
  {
    id: "logaura",
    title: "Logaura",
    description:
      "Challenge: Logging engine overhead & poor CLI display tags. Solution: Built custom color filters & high-frequency file writers. Outcome: Enhanced log processing efficiency with zero runtime lag.",
    tech: "Node.js, TypeScript, NPM package",
    image: "/images/logaura.png",
  },
];

const PROJECT_SLIDE_COUNT = projectSlides.length + 1;

function estimateProjectsTravel() {
  if (typeof window === "undefined") return 0;
  const slideWidth = Math.min(window.innerWidth * 0.78, 560);
  const gap = 28;
  const paddingInline = Math.max(24, (window.innerWidth - 1200) / 2) * 2;
  const trackWidth =
    paddingInline + PROJECT_SLIDE_COUNT * slideWidth + (PROJECT_SLIDE_COUNT - 1) * gap;
  return Math.max(0, trackWidth - window.innerWidth);
}

interface SkillItem {
  id: string;
  category: "frontend" | "backend" | "cloud";
  name: string;
  level: string;
  value: number;
  color: string;
  glow: string;
  badge: string;
  tags: string[];
  icon: React.ReactNode;
}

const skills: SkillItem[] = [
  {
    id: "react",
    category: "frontend",
    name: "React.js / Frontend",
    level: "Mastery Level",
    value: 95,
    color: "#38bdf8",
    glow: "#7dd3fc",
    badge: "FRONTEND",
    tags: ["React 19", "Hooks & Fiber", "Zustand / Redux", "Tailwind CSS"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="2" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
      </svg>
    ),
  },
  {
    id: "nextjs",
    category: "frontend",
    name: "Next.js (App Router)",
    level: "Production Lead",
    value: 94,
    color: "#f8fafc",
    glow: "#e2e8f0",
    badge: "FRAMEWORK",
    tags: ["App Router", "SSR / ISR", "Turbopack", "SEO / AEO"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
  },
  {
    id: "nestjs",
    category: "backend",
    name: "Node.js & NestJS",
    level: "Architect",
    value: 93,
    color: "#fb7185",
    glow: "#fda4af",
    badge: "MICROSERVICES",
    tags: ["Microservices", "REST & GraphQL", "TypeScript", "TypeORM / Prisma"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" />
        <circle cx="6" cy="18" r="1" />
      </svg>
    ),
  },
  {
    id: "python",
    category: "backend",
    name: "Python & FastAPI",
    level: "Advanced",
    value: 90,
    color: "#60a5fa",
    glow: "#93c5fd",
    badge: "BACKEND API",
    tags: ["FastAPI", "Pydantic", "AsyncIO", "Celery Workers"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    id: "ai",
    category: "backend",
    name: "AI & LLM Orchestration",
    level: "Solutions Lead",
    value: 92,
    color: "#c084fc",
    glow: "#e879f9",
    badge: "AI PIPELINES",
    tags: ["RAG Pipelines", "Whisper TTS", "LangChain", "Vector DBs"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 3" />
      </svg>
    ),
  },
  {
    id: "postgres",
    category: "cloud",
    name: "PostgreSQL (RLS & Locks)",
    level: "Expert",
    value: 91,
    color: "#38bdf8",
    glow: "#7dd3fc",
    badge: "DATABASE",
    tags: ["Row-Level Security", "Advisory Locks", "pgvector", "Index Tuning"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      </svg>
    ),
  },
  {
    id: "queues",
    category: "backend",
    name: "High-Concurrency Queues",
    level: "Specialist",
    value: 90,
    color: "#4ade80",
    glow: "#86efac",
    badge: "EVENT MESH",
    tags: ["BullMQ", "Redis Pub/Sub", "RabbitMQ", "Event Streams"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    id: "cloud",
    category: "cloud",
    name: "Cloud & DevOps (AWS/Docker)",
    level: "Senior",
    value: 89,
    color: "#fbbf24",
    glow: "#fde047",
    badge: "DEVOPS",
    tags: ["AWS ECS / S3", "Docker Mesh", "GitHub Actions", "Terraform"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" />
      </svg>
    ),
  },
  {
    id: "security",
    category: "cloud",
    name: "Security & Testing (RBAC/JWT)",
    level: "Architect",
    value: 90,
    color: "#2dd4bf",
    glow: "#5eead4",
    badge: "SECURITY",
    tags: ["RBAC / ABAC", "JWT / OAuth2", "Jest / Cypress", "AES-256"],
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

function SkillCard({ skill }: Readonly<{ skill: SkillItem }>) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    setRotate({
      x: -(y - yc) / 10,
      y: (x - xc) / 10,
    });
    setMousePos({ x, y });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.15s ease-out, border-color 0.3s, box-shadow 0.3s",
        borderColor: isHovered ? `${skill.color}60` : "rgba(34, 211, 238, 0.12)",
        boxShadow: isHovered
          ? `0 16px 40px -12px ${skill.color}30`
          : "0 8px 30px -10px rgba(0, 0, 0, 0.6)",
      }}
      className="relative flex flex-col justify-between p-6 rounded-2xl border bg-slate-950/80 backdrop-blur-xl overflow-hidden group select-none transition-all duration-300 min-h-[260px]"
    >
      {/* Dynamic Cursor Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${mousePos.x}px ${mousePos.y}px, ${skill.color}18, transparent 60%)`,
        }}
      />

      {/* Top Ambient Corner Glow */}
      <div
        className="absolute -right-10 -top-10 h-32 w-32 rounded-full filter blur-3xl opacity-15 group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
        style={{ backgroundColor: skill.glow }}
      />

      <div>
        {/* Header Row: Icon + Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-slate-900/90 shadow-md transition-transform duration-300 group-hover:scale-110"
            style={{ color: skill.color }}
          >
            {skill.icon}
          </div>
          <span
            className="px-2.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest font-semibold border"
            style={{
              color: skill.color,
              borderColor: `${skill.color}35`,
              backgroundColor: `${skill.color}12`,
            }}
          >
            {skill.badge}
          </span>
        </div>

        {/* Title & Level */}
        <h3 className="text-base font-semibold text-white tracking-tight group-hover:text-cyan-200 transition-colors">
          {skill.name}
        </h3>
        <p className="mt-1 text-xs text-slate-400 font-mono flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: skill.color }} />
          <span>{skill.level}</span>
        </p>

        {/* Sub-skill Tech Pills */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-md text-[10px] font-mono text-slate-300 bg-slate-900/80 border border-slate-800 group-hover:border-slate-700 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Progress Bar & Proficiency Indicator */}
      <div className="mt-6 pt-4 border-t border-slate-800/80">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="font-mono text-[11px] text-slate-400 uppercase tracking-wider">
            Proficiency Rating
          </span>
          <span className="font-mono font-bold text-sm" style={{ color: skill.color }}>
            {skill.value}%
          </span>
        </div>

        {/* Glowing Progress Bar Track */}
        <div className="h-2 w-full rounded-full bg-slate-900/90 overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out relative"
            style={{
              width: `${skill.value}%`,
              backgroundColor: skill.color,
              boxShadow: `0 0 12px ${skill.color}`,
            }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-2 bg-white rounded-full opacity-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "frontend" | "backend" | "cloud">("all");

  const categories = [
    { id: "all", label: "All Stack", count: skills.length },
    { id: "frontend", label: "Frontend & UI", count: skills.filter((s) => s.category === "frontend").length },
    { id: "backend", label: "Backend & AI", count: skills.filter((s) => s.category === "backend").length },
    { id: "cloud", label: "Database & Cloud", count: skills.filter((s) => s.category === "cloud").length },
  ];

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  return (
    <section id="skills" className="mx-auto w-full max-w-6xl px-6 pb-24 pt-4">
      {/* Top Badge & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-400/25 bg-cyan-400/10 text-cyan-300 text-xs font-mono tracking-wider uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping" />
            <span>Production Tech Matrix</span>
          </div>
          <h2 className="text-4xl font-semibold text-white md:text-5xl tracking-tight">
            Skills & Capabilities
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Interactive, glow-accented 3D matrix featuring active cursor spotlights, sub-system frameworks, and core SLA proficiency metrics.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl border border-cyan-500/15 bg-slate-950/80 backdrop-blur select-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                activeCategory === cat.id
                  ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/20"
                  : "text-slate-400 hover:text-cyan-200 hover:bg-slate-900/60"
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                  activeCategory === cat.id ? "bg-slate-950/20 text-slate-950" : "bg-slate-800 text-slate-400"
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Tech Stack Metrics Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-5 rounded-2xl border border-cyan-500/10 bg-slate-950/40 backdrop-blur">
        <div className="border-r border-slate-800/60 pr-4">
          <p className="text-2xl font-mono font-bold text-cyan-300">6+ YRS</p>
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Production Exp</p>
        </div>
        <div className="border-r border-slate-800/60 md:border-r pr-4 pl-0 md:pl-4">
          <p className="text-2xl font-mono font-bold text-purple-300">100%</p>
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Type-Safe Code</p>
        </div>
        <div className="border-r border-slate-800/60 pr-4 pl-0 md:pl-4">
          <p className="text-2xl font-mono font-bold text-emerald-300">&lt;50ms</p>
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">API Latency SLA</p>
        </div>
        <div className="pl-0 md:pl-4">
          <p className="text-2xl font-mono font-bold text-amber-300">99.99%</p>
          <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Uptime Record</p>
        </div>
      </div>

      {/* 3D Skill Cards Grid */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSkills.map((skill) => (
          <SkillCard key={skill.id} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export default function PortfolioScroll() {
  const heroRef = useRef<HTMLElement | null>(null);
  const projectsRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroRotateX = useSpring(useTransform(heroProgress, [0, 1], [0, 38]), {
    stiffness: 95,
    damping: 22,
    mass: 0.25,
  });
  const heroDepth = useSpring(useTransform(heroProgress, [0, 1], [0, -260]), {
    stiffness: 95,
    damping: 24,
    mass: 0.28,
  });
  const heroScale = useSpring(useTransform(heroProgress, [0, 1], [1, 0.92]), {
    stiffness: 90,
    damping: 20,
    mass: 0.25,
  });
  const heroSectionY = useSpring(useTransform(heroProgress, [0, 1], [0, -72]), {
    stiffness: 95,
    damping: 24,
    mass: 0.25,
  });
  const heroSlipY = useSpring(useTransform(heroProgress, [0, 0.7, 1], [0, -80, -220]), {
    stiffness: 105,
    damping: 24,
    mass: 0.22,
  });
  const heroSlipOpacity = useSpring(useTransform(heroProgress, [0, 0.62, 1], [1, 0.9, 0]), {
    stiffness: 95,
    damping: 22,
    mass: 0.2,
  });
  const heroSlipBlur = useTransform(heroProgress, [0, 0.72, 1], [0, 1.5, 6]);
  const heroSlipFilter = useTransform(heroSlipBlur, (v) => `blur(${v}px)`);
  const layerBackY = useSpring(useTransform(heroProgress, [0, 1], [0, -140]), {
    stiffness: 80,
    damping: 20,
    mass: 0.3,
  });
  const layerFrontY = useSpring(useTransform(heroProgress, [0, 1], [0, -52]), {
    stiffness: 100,
    damping: 24,
    mass: 0.25,
  });

  const { scrollYProgress: projectsProgress } = useScroll({
    target: projectsRef,
    offset: ["start start", "end end"],
  });

  const trackRef = useRef<HTMLDivElement>(null);
  const limit = useMotionValue(estimateProjectsTravel());
  const [projectsScrollHeight, setProjectsScrollHeight] = useState(
    () => (typeof window !== "undefined" ? window.innerHeight + estimateProjectsTravel() : 0),
  );

  useLayoutEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const syncScrollDistance = () => {
      const measured = Math.max(0, track.scrollWidth - window.innerWidth);
      const travel = Math.max(measured, estimateProjectsTravel());
      limit.set(travel);
      setProjectsScrollHeight(window.innerHeight + travel);
    };

    syncScrollDistance();
    requestAnimationFrame(syncScrollDistance);

    const observer = new ResizeObserver(syncScrollDistance);
    observer.observe(track);
    for (const slide of track.querySelectorAll(".project-slide")) {
      observer.observe(slide);
    }

    window.addEventListener("resize", syncScrollDistance);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", syncScrollDistance);
    };
  }, [limit]);

  const trackXRaw = useTransform([projectsProgress, limit], ([progress, maxTravel]) => {
    return -(progress as number) * (maxTravel as number);
  });
  const trackX = useSpring(trackXRaw, {
    stiffness: 110,
    damping: 26,
    mass: 0.25,
  });

  return (
    <main>
      <section ref={heroRef} className="relative h-[170vh]">
        <div className="sticky top-0 flex h-screen items-center">
          <motion.div className="parallax-layer parallax-back" style={{ y: layerBackY }} />
          <motion.div className="parallax-layer parallax-front" style={{ y: layerFrontY }} />
          <div className="hero-slip-mask">
            <motion.div
              className="mx-auto w-full max-w-6xl"
              style={{
                transformPerspective: 1450,
                transformOrigin: "50% 36%",
                rotateX: heroRotateX,
                z: heroDepth,
                scale: heroScale,
                y: heroSectionY,
              }}
            >
              <motion.div
                style={{ y: heroSlipY, opacity: heroSlipOpacity, filter: heroSlipFilter }}
              >
                <div className="grid items-center gap-10 px-6 md:grid-cols-2">
                  <div>
                    <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">
                      Portfolio & Systems Architecture
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-6xl">
                      Hamza Manzoor
                    </h1>
                    <p className="mt-2 text-base font-semibold text-cyan-300">
                      Senior Full-Stack Engineer & Solutions Architect
                    </p>
                    <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                      Scroll down to rotate the whole hero section in 3D, then enter a pinned
                      horizontal project journey from left to right.
                    </p>
                    <a
                      href="#projects"
                      className="mt-7 inline-flex rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
                    >
                      Explore Projects
                    </a>
                  </div>
                  <div className="perspective-wrap">
                    <div className="hero-card">
                      <Image
                        src="/images/hamza-portrait.jpg"
                        alt="Hamza Manzoor portrait"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 90vw, 40vw"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section
        id="projects"
        ref={projectsRef}
        className="relative"
        style={{
          height: projectsScrollHeight > 0 ? projectsScrollHeight : "calc(100vh + 220vh)",
        }}
      >
        <div className="sticky top-0 z-20 flex h-svh w-full items-center overflow-hidden">
          <motion.div
            ref={trackRef}
            style={{ x: trackX }}
            className="projects-track min-w-max shrink-0"
          >
            {projectSlides.map((slide) => (
              <article key={slide.title} className="project-slide">
                <Link href={`/projects/${slide.id}`} className="block group cursor-pointer">
                  <div className="relative mb-5 h-[220px] w-full overflow-hidden rounded-2xl border border-cyan-400/20 bg-slate-900/30">
                    <Image
                      src={slide.image}
                      alt={slide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 80vw, 40vw"
                    />
                  </div>
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Project</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl group-hover:text-cyan-300 transition">
                    {slide.title}
                  </h2>
                </Link>
                <p className="mt-3 text-sm leading-7 text-slate-300">{slide.description}</p>
                <p className="mt-5 text-xs text-cyan-200/90 font-mono">{slide.tech}</p>
              </article>
            ))}

            {/* View More Projects Slide Card */}
            <article className="project-slide flex flex-col justify-between border border-cyan-400/30 bg-slate-950/70 p-8">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400 font-bold text-xl mb-6">
                  +
                </div>
                <h2 className="text-3xl font-semibold text-white">Explore More Projects</h2>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  Discover further systems designed, including enterprise billing APIs,
                  E-Commerce architectures, logistics tracking dashboards, and consulting integrations.
                </p>
              </div>
              <div className="mt-8">
                <Link
                  href="/projects"
                  className="inline-flex rounded-full bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 select-none cursor-pointer"
                >
                  View Gallery Grid →
                </Link>
              </div>
            </article>
          </motion.div>
        </div>
      </section>

      {/* High-Tech 3D Interactive Skills & Capabilities Matrix */}
      <SkillsSection />
    </main>
  );
}

