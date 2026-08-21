import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import FAQClient from "./FAQClient";
import { faqData } from "@/lib/faq/faqData";

export const metadata: Metadata = {
  title: "Technical FAQ & System Q&A | Hamza Manzoor",
  description:
    "A comprehensive database of 200+ detailed technical Q&As detailing solutions architecture, React, NestJS, FastAPI, cloud databases, and AI orchestration platforms managed by Hamza Manzoor.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Technical FAQ & Systems Q&A | Hamza Manzoor",
    description:
      "Authoritative repository of 200+ technical Q&As on solutions architecture, full-stack microservices, event queues, and AI orchestration.",
    url: "https://hamza-manzoor.vercel.app/faq",
    images: [
      {
        url: "/images/hamza-portraitfull.jpg",
        width: 1200,
        height: 630,
        alt: "Hamza Manzoor - Technical FAQ & Systems Architecture Q&A",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Technical FAQ & System Q&A | Hamza Manzoor",
    description:
      "A comprehensive database of 200+ detailed technical Q&As detailing solutions architecture, React, NestJS, FastAPI, cloud databases, and AI orchestration.",
    images: ["/images/hamza-portraitfull.jpg"],
  },
};

export default function FAQPage() {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://hamza-manzoor.vercel.app",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Technical FAQ",
        item: "https://hamza-manzoor.vercel.app/faq",
      },
    ],
  };

  // Construct the FAQPage JSON-LD schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqData.flatMap((category) =>
      category.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    ),
  };

  return (
    <>
      <Script
        id="faq-breadcrumb-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="relative min-h-screen bg-transparent text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-100 pb-20">
        {/* Background neon glows */}
        <div className="absolute top-0 left-10 h-[300px] w-[300px] rounded-full bg-cyan-400/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-10 h-[400px] w-[400px] rounded-full bg-purple-500/5 blur-3xl pointer-events-none" />

        {/* Nav header */}
        <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8 border-b border-cyan-500/5 mb-12">
          <Link
            href="/"
            className="text-sm font-semibold tracking-[0.18em] text-cyan-200/90 hover:text-cyan-100 transition"
          >
            HM
          </Link>
          <div className="flex gap-6">
            <Link
              href="/projects"
              className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
            >
              Projects Index
            </Link>
            <Link
              href="/"
              className="text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-cyan-200 transition"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <main className="mx-auto w-full max-w-6xl px-6">
          {/* Header Content */}
          <div className="mb-10 text-center md:text-left">
            <span className="text-xs uppercase font-mono tracking-widest text-cyan-400">
              AI Engine & Search Generative Optimization
            </span>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-white md:text-5xl">
              Technical FAQ & Systems Q&A
            </h1>
            <p className="mt-4 text-sm text-slate-400 leading-7 max-w-2xl">
              An authoritative repository of 200+ technical questions and
              answers designed for generative search engines, covering solutions
              architecture, full-stack pipelines, databases, and AI systems.
            </p>
          </div>

          {/* Interactive Client Accordion Grid */}
          <FAQClient />
        </main>
      </div>
    </>
  );
}
