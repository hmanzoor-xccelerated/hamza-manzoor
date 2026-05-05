"use client";

import Image from "next/image";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

const projectSlides = [
  {
    title: "Voxbee AI",
    description:
      "Multimodal pipeline for dubbing, TTS orchestration, and avatar generation with production-ready architecture.",
    tech: "Next.js, FastAPI, RAG, Whisper",
  },
  {
    title: "Marketing.biz",
    description:
      "AI analytics platform combining cross-channel social data to drive lead intelligence and organic growth.",
    tech: "React, Node.js, PostgreSQL, Python",
  },
  {
    title: "Romingo",
    description:
      "Enterprise hotel system with role-based workflows, internal automations, and operational dashboards.",
    tech: "React, NestJS, MongoDB, AWS",
  },
  {
    title: "TheQube & Xeurix",
    description:
      "Recruitment and workflow platforms with complex permissions, optimized APIs, and scalable data handling.",
    tech: "Next.js, NestJS, PostgreSQL, Docker",
  },
];

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
  const trackX = useSpring(useTransform(projectsProgress, [0, 1], ["0%", "-74%"]), {
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
                      Senior Full-Stack Developer & AI Systems Architect
                    </p>
                    <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-6xl">
                      Futuristic portfolio with performance-first engineering.
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

      <section id="projects" ref={projectsRef} className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          <div className="mx-auto flex h-full w-full max-w-7xl items-center">
            <motion.div style={{ x: trackX }} className="projects-track">
              {projectSlides.map((slide) => (
                <article key={slide.title} className="project-slide">
                  <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Project</p>
                  <h2 className="mt-3 text-3xl font-semibold text-white md:text-4xl">
                    {slide.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-slate-300">{slide.description}</p>
                  <p className="mt-6 text-sm text-cyan-200/90">{slide.tech}</p>
                </article>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section id="end" className="mx-auto flex min-h-screen w-full max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">End Screen</p>
        <h2 className="mt-3 text-4xl font-semibold text-white md:text-5xl">
          Journey complete
        </h2>
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
          Horizontal scrolling stops here. Use the button below to smoothly return to the top.
        </p>
        <button
          type="button"
          onClick={() => globalThis.window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-8 rounded-full border border-cyan-300/50 px-6 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-200 hover:text-cyan-50"
        >
          Scroll To Top
        </button>
      </section>
    </main>
  );
}
