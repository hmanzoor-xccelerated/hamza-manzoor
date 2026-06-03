"use client";

import { useState, useEffect } from "react";
import type { FormEvent, ChangeEvent } from "react";
import Script from "next/script";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "$10k - $25k",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [activeTab, setActiveTab] = useState<"scheduler" | "message">("scheduler");

  useEffect(() => {
    if (activeTab === "scheduler") {
      const initCalendly = () => {
        try {
          const elem = document.querySelector(".calendly-inline-widget");
          if ((window as any).Calendly && elem && elem.children.length === 0) {
            (window as any).Calendly.initInlineWidget({
              url: "https://calendly.com/hamzamanzoor/15min?hide_event_type_details=1&hide_gdpr_banner=1",
              parentElement: elem,
            });
          }
        } catch (err) {
          console.error("Failed to initialize Calendly widget:", err);
        }
      };

      if ((window as any).Calendly) {
        initCalendly();
      } else {
        const interval = setInterval(() => {
          if ((window as any).Calendly) {
            initCalendly();
            clearInterval(interval);
          }
        }, 100);
        return () => clearInterval(interval);
      }
    }
  }, [activeTab]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", budget: "$10k - $25k", message: "" });
    }, 1500);
  };

  return (
    <section id="contact" className="mx-auto w-full max-w-4xl px-6 py-16">
      <div className="rounded-2xl border border-cyan-300/20 bg-slate-950/50 p-8 backdrop-blur shadow-2xl">
        <div className="text-center mb-8">
          <p className="text-xs uppercase tracking-[0.24em] text-cyan-200/80">Lead Funnel & Strategy</p>
          <h2 className="mt-3 text-3xl font-semibold text-cyan-100 md:text-4xl">Get a Free Architecture Review</h2>
          <p className="mt-2 text-sm text-slate-300">
            Let's discuss your project constraints, architecture scaling goals, and how we can optimize your tech stack.
          </p>
        </div>

        {/* Tab Selection Switcher */}
        <div className="flex border border-cyan-500/10 mb-8 p-1 bg-[#03060f]/60 rounded-full max-w-md mx-auto select-none">
          <button
            type="button"
            onClick={() => setActiveTab("scheduler")}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeTab === "scheduler"
                ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/10"
                : "text-slate-400 hover:text-cyan-200"
            }`}
          >
            Book Discovery Call
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("message")}
            className={`flex-1 py-2 text-xs font-semibold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
              activeTab === "message"
                ? "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/10"
                : "text-slate-400 hover:text-cyan-200"
            }`}
          >
            Submit Project Specs
          </button>
        </div>

        {activeTab === "scheduler" ? (
          <div className="relative w-full overflow-hidden rounded-xl bg-[#03060f]/40 border border-cyan-500/5 min-h-[700px] flex items-center justify-center">
            <Script
              src="https://assets.calendly.com/assets/external/widget.js"
              strategy="lazyOnload"
            />
            {/* Calendly inline widget begin */}
            <div
              className="calendly-inline-widget w-full"
              data-url="https://calendly.com/hamzamanzoor/15min?hide_event_type_details=1&hide_gdpr_banner=1"
              style={{ minWidth: "320px", height: "700px" }}
            />
            {/* Calendly inline widget end */}
          </div>
        ) : status === "success" ? (
          <div className="flex flex-col items-center justify-center py-10 space-y-4 font-mono text-cyan-200 text-sm">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 text-xl font-bold">
              ✓
            </div>
            <p className="text-emerald-400 font-bold uppercase tracking-wider">Transmission Successful</p>
            <p className="text-slate-300 text-center max-w-sm">
              Your inquiry payload has been queued on my systems. I will review and respond within 24 hours.
            </p>
            <button
              type="button"
              onClick={() => setStatus("idle")}
              className="mt-6 rounded-full border border-cyan-300/40 px-5 py-2.5 hover:border-cyan-200 hover:text-white transition text-xs font-semibold cursor-pointer"
            >
              Send Another Payload
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                  Client/Company Name
                </label>
                <input
                  id="name-input"
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="E.g., Jane Doe / Acme Corp"
                  className="w-full rounded-lg border border-cyan-400/15 bg-[#03060f]/60 px-4 py-3 text-sm text-cyan-100 placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                />
              </div>

              <div>
                <label htmlFor="email-input" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                  Secure Return Email
                </label>
                <input
                  id="email-input"
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full rounded-lg border border-cyan-400/15 bg-[#03060f]/60 px-4 py-3 text-sm text-cyan-100 placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
                />
              </div>
            </div>

            <div>
              <label htmlFor="budget-select" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                Estimated Project Scope / Budget
              </label>
              <select
                id="budget-select"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="w-full rounded-lg border border-cyan-400/15 bg-[#03060f]/60 px-4 py-3 text-sm text-cyan-100 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20"
              >
                <option value="<$10k">Less than $10k</option>
                <option value="$10k - $25k">$10k - $25k (SaaS Launch / MVP)</option>
                <option value="$25k - $50k">$25k - $50k (Custom Architecture)</option>
                <option value="$50k+">$50k+ (Enterprise Scaling & AI Integrations)</option>
              </select>
            </div>

            <div>
              <label htmlFor="message-textarea" className="block text-xs font-semibold text-slate-300 uppercase tracking-wide mb-2">
                System Payload Specifications / Message
              </label>
              <textarea
                id="message-textarea"
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={4}
                placeholder="Outline features required, tech stack, and timeframe..."
                className="w-full rounded-lg border border-cyan-400/15 bg-[#03060f]/60 px-4 py-3 text-sm text-cyan-100 placeholder-slate-500 outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/20 resize-none"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-cyan-500/10">
              <span className="text-xs text-slate-400 font-mono">
                Fallback: <a href="mailto:hello@hamzamanzoor.dev" className="text-cyan-400 hover:underline">hello@hamzamanzoor.dev</a>
              </span>
              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full sm:w-auto rounded-full bg-cyan-400 px-7 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:opacity-50 select-none flex items-center justify-center gap-2 cursor-pointer"
              >
                {status === "submitting" ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full" />
                    Transmitting...
                  </>
                ) : (
                  "Book a Technical Discovery Call"
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}
