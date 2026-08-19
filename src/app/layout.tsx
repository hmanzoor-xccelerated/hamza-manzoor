import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
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
        <GlobalBackgroundScene />
        {children}
        <GoogleAnalytics gaId="G-BGLY6F2P8J" />
      </body>
    </html>
  );
}

