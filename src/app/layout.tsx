import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Script from "next/script";
import "./globals.css";
import GlobalBackgroundScene from "@/components/scene/GlobalBackgroundScene";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamza-manzoor.vercel.app"),
  title: {
    default: "Hamza Manzoor | Senior Full-Stack Engineer & Solutions Architect",
    template: "%s | Hamza Manzoor",
  },
  description:
    "Official portfolio & architecture log of Hamza Manzoor — Senior Full-Stack Engineer & Solutions Architect with 6+ years of experience in Next.js, NestJS, high-concurrency event queues, AWS cloud deployments, and enterprise AI orchestration.",
  keywords: [
    "Hamza Manzoor",
    "Hamza Manzoor Full-Stack Engineer",
    "Hamza Manzoor Solutions Architect",
    "Hamza Manzoor Lahore",
    "Hamza Manzoor Pakistan",
    "Hamza Manzoor Software Engineer",
    "Hamza Manzoor Portfolio",
    "Full-Stack Engineer",
    "Solutions Architect",
    "Next.js Developer Pakistan",
    "NestJS Backend",
    "AI Orchestration Systems",
    "SaaS Architecture",
    "High-Concurrency Web Applications",
  ],
  openGraph: {
    title: "Hamza Manzoor | Senior Full-Stack Engineer & Solutions Architect",
    description:
      "Official portfolio & architecture log of Hamza Manzoor — Senior Full-Stack Engineer & Solutions Architect specializing in Next.js, NestJS, high-concurrency event queues, and AI orchestration.",
    url: "https://hamza-manzoor.vercel.app",
    siteName: "Hamza Manzoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Manzoor | Senior Full-Stack Engineer & Solutions Architect",
    description:
      "Official portfolio & architecture log of Hamza Manzoor — Senior Full-Stack Engineer & Solutions Architect specializing in Next.js, NestJS, high-concurrency event queues, and AI orchestration.",
  },
  alternates: {
    canonical: "https://hamza-manzoor.vercel.app",
  },
};

const personProfilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  mainEntity: {
    "@type": "Person",
    name: "Hamza Manzoor",
    alternateName: "Hamza Manzoor Solutions Architect",
    jobTitle: "Senior Full-Stack Engineer & Solutions Architect",
    description:
      "Senior Full-Stack Engineer & Solutions Architect with 6+ years of experience in Next.js, NestJS microservices, PostgreSQL advisory locking, BullMQ event queues, AWS cloud infrastructure, and AI orchestration.",
    url: "https://hamza-manzoor.vercel.app",
    image: "https://hamza-manzoor.vercel.app/images/hamza-portraitfull.jpg",
    email: "hamzamanzoor8234@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Lahore",
      addressRegion: "Punjab",
      addressCountry: "PK",
    },
    sameAs: [
      "https://github.com/hamzamanzoor8234",
      "https://www.linkedin.com/in/hamzamanzoor8234",
      "https://www.npmjs.com/package/logaura",
      "https://chromewebstore.google.com/detail/whatshush/kfkhoepldonalkpldnffaeanoffkgbkh",
    ],
    knowsAbout: [
      "Solutions Architecture",
      "Full-Stack Software Engineering",
      "Next.js App Router & React",
      "NestJS & Node.js Microservices",
      "PostgreSQL Concurrency & Advisory Locks",
      "PostgreSQL Row-Level Security (RLS)",
      "BullMQ Queue Systems & Redis",
      "AWS Cloud Infrastructure & Docker",
      "Enterprise AI Orchestration & Media Localization",
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <GoogleTagManager gtmId="GTM-WQVCKKXP" />
      <body className="min-h-full flex flex-col bg-transparent overflow-x-clip">
        <Script
          id="global-person-profilepage-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personProfilePageSchema),
          }}
        />
        <GlobalBackgroundScene />
        {children}
        <GoogleAnalytics gaId="G-BGLY6F2P8J" />
      </body>
    </html>
  );
}
