import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
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
    default: "Senior Full-Stack Engineer & Solutions Architect | Hamza Manzoor",
    template: "%s | Hamza Manzoor",
  },
  description:
    "Results-driven Senior Full-Stack Engineer & Solutions Architect with 6+ years of experience designing, building, and scaling high-concurrency web applications, multi-tenant SaaS platforms, and enterprise AI orchestration architectures.",
  keywords: [
    "Hamza Manzoor",
    "Full-Stack Engineer",
    "Solutions Architect",
    "Software Development Lahore",
    "Next.js Developer Pakistan",
    "NestJS Backend",
    "AI Orchestration Systems",
    "SaaS Architecture",
    "High-Concurrency Web Applications",
  ],
  openGraph: {
    title: "Senior Full-Stack Engineer & Solutions Architect | Hamza Manzoor",
    description:
      "Results-driven Senior Full-Stack Engineer & Solutions Architect with 6+ years of experience designing, building, and scaling high-concurrency web applications, multi-tenant SaaS platforms, and enterprise AI orchestration architectures.",
    url: "https://hamza-manzoor.vercel.app",
    siteName: "Hamza Manzoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Full-Stack Engineer & Solutions Architect | Hamza Manzoor",
    description:
      "Results-driven Senior Full-Stack Engineer & Solutions Architect with 6+ years of experience designing, building, and scaling high-concurrency web applications, multi-tenant SaaS platforms, and enterprise AI orchestration architectures.",
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
      <body className="min-h-full flex flex-col bg-transparent overflow-x-clip">
        <GlobalBackgroundScene />
        {children}
        <GoogleAnalytics gaId="G-BGLY6F2P8J" />
      </body>
    </html>
  );
}

