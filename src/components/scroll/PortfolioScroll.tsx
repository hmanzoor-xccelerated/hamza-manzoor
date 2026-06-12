"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform, useMotionValue } from "framer-motion";
import { useRef, useState, useLayoutEffect } from "react";
import type { CSSProperties, MouseEvent } from "react";

const projectSlides = [
  {
    id: "voxbee",
    title: "Voxbee AI",
    description:
      "Challenge: High sync latency in audio-video localization. Solution: Built dynamic time-warping speech alignments. Outcome: Reduced localization processing cycles by 85%.",
    tech: "Next.js, FastAPI, RAG, Whisper",
    image: "/images/voxbee.png",
  },
  {
    id: "romingo",
    title: "Romingo",
    description:
      "Challenge: Connection bottlenecks & unoptimized file uploads. Solution: Architected high-throughput NestJS microservices. Outcome: Reduced page loads by 40%.",
    tech: "React, NestJS, MongoDB, AWS",
    image: "/images/romingo.png",
  },
  {
    id: "theqube",
    title: "TheQube",
    description:
      "Challenge: Concurrency database locks on studio slots. Solution: Implemented transactional queries & Stripe bridges. Outcome: Sustained 99.99% uptime with zero slot conflicts.",
    tech: "React, Webflow, Node.js, NestJS",
    image: "/images/qube.jpg",
  },
  {
    id: "xeurix",
    title: "Xeurix",
    description:
      "Challenge: High semantic-query CPU bottlenecks. Solution: Scaled worker queue clusters with PostgreSQL indexes. Outcome: Processed 100k+ campaigns weekly with 70% latency reduction.",
    tech: "Next.js, NestJS, PostgreSQL, Docker",
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

const skills = [
  { name: "React.js / Frontend", value: 95, color: "#61dafb", glow: "#7dd3fc" },
  { name: "Next.js (App Router)", value: 92, color: "#ffffff", glow: "#f3f4f6" },
  { name: "Node.js Platform", value: 93, color: "#68a063", glow: "#86efac" },
  { name: "NestJS Framework", value: 90, color: "#e0234e", glow: "#fb7185" },
  { name: "Python Systems", value: 90, color: "#3776ab", glow: "#93c5fd" },
  { name: "FastAPI Engine", value: 88, color: "#009688", glow: "#2dd4bf" },
  { name: "AI/LLM Engineering", value: 92, color: "#a855f7", glow: "#c084fc" },
  { name: "Cloud & Devops (AWS/Docker)", value: 88, color: "#f59e0b", glow: "#fbbf24" },
  { name: "Data (Postgres/Mongo)", value: 89, color: "#336791", glow: "#93c5fd" },
];

function SkillCard({
  skill,
}: Readonly<{
  skill: { name: string; value: number; color: string; glow: string };
}>) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;
    setRotate({
      x: -(y - yc) / 5,
      y: (x - xc) / 5,
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
        transition: "transform 0.12s ease-out",
      }}
      className="relative flex flex-col justify-between p-6 rounded-2xl border border-cyan-300/15 bg-slate-950/40 backdrop-blur shadow-lg overflow-hidden group select-none cursor-pointer"
    >
      <div
        className="absolute -right-10 -top-10 h-24 w-24 rounded-full filter blur-2xl opacity-15 group-hover:opacity-35 transition-opacity duration-300 pointer-events-none"
        style={{ backgroundColor: skill.glow }}
      />
      <div>
        <h3 className="text-sm font-semibold text-slate-200">{skill.name}</h3>
        <p className="mt-1 text-[11px] text-slate-400">Expertise Log</p>
      </div>
      <div className="mt-8 flex items-baseline justify-between border-t border-cyan-500/5 pt-4">
        <span className="text-2xl font-bold tracking-tight text-white font-mono">{skill.value}%</span>
        <span
          className="h-2 w-2 rounded-full"
          style={{
            backgroundColor: skill.color,
            boxShadow: `0 0 12px ${skill.glow}`,
          }}
        />
      </div>
    </div>
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
                      Senior Full-Stack Developer & SaaS Architect
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-6xl">
                      Senior Full-Stack Developer & Technical Lead
                    </h1>
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
                        src="/images/hamza-portrait.png"
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

      {/* Modern 3D Card Grid Skills layout (replaces the scroll-pinned progress bars) */}
      <section id="skills" className="mx-auto w-full max-w-6xl px-6 pb-20 pt-0">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Expertise</p>
        <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">Skills & Capabilities</h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 mb-12">
          Glow-accented 3D cards that dynamically tilt on mouse move, representing specialized development stack elements.
        </p>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3">
          {skills.map((skill) => (
            <SkillCard key={skill.name} skill={skill} />
          ))}
        </div>
      </section>

    </main>
  );
}

