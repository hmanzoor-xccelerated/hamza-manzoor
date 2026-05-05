export function Contact() {
  return (
    <section id="contact" className="mx-auto w-full max-w-6xl px-6 py-14">
      <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-6 md:flex-row md:items-center">
        <div>
          <h2 className="text-2xl font-semibold text-cyan-100">Let us build something great</h2>
          <p className="mt-2 text-sm text-slate-300">
            Available for high-impact SaaS, AI, and architecture consulting engagements.
          </p>
        </div>
        <a
          href="mailto:hello@hamzamanzoor.dev"
          className="rounded-full bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
        >
          Contact Hamza
        </a>
      </div>
    </section>
  );
}
