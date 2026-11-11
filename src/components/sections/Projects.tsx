const projects = [
  {
    name: "Voxbee AI",
    description:
      "AI campaign orchestration platform with built-in studios for image, video, voice, and dubbing.",
    stack: "Next.js, NestJS, FastAPI, Whisper, RAG",
  },
  {
    name: "Marketing.biz",
    description:
      "AI analytics engine aggregating social channels for lead intelligence and growth strategy.",
    stack: "React, Node.js, Python, PostgreSQL",
  },
  {
    name: "Romingo",
    description:
      "Pet-friendly hotel and vacation rental booking platform; optimized SEO, speed, and database queries.",
    stack: "React, Node.js, Sequelize, SQL",
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-6xl px-6 py-14">
      <h2 className="text-2xl font-semibold text-cyan-100">Featured Projects</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {projects.map((project) => (
          <article
            key={project.name}
            className="rounded-xl border border-cyan-300/20 bg-slate-950/50 p-5 backdrop-blur"
          >
            <h3 className="text-lg font-semibold text-white">{project.name}</h3>
            <p className="mt-2 text-sm text-slate-300">{project.description}</p>
            <p className="mt-4 text-xs text-cyan-200/80">{project.stack}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
