import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    default: "Senior Full-Stack Developer & SaaS Architect | Hamza Manzoor",
    template: "%s | Hamza Manzoor",
  },
  description:
    "Enterprise-grade full-stack web application development specializing in Next.js, NestJS, and AI automation. Building scalable software solutions for businesses globally and across major tech hubs like Lahore and Faisalabad.",
  keywords: [
    "Hamza Manzoor",
    "Full-Stack Developer",
    "SaaS Architect",
    "Software Development Lahore",
    "Next.js Developer Pakistan",
    "NestJS Backend",
    "AI Automation Systems",
    "Custom Software Development",
  ],
  openGraph: {
    title: "Senior Full-Stack Developer & SaaS Architect | Hamza Manzoor",
    description:
      "Enterprise-grade full-stack web application development specializing in Next.js, NestJS, and AI automation. Building scalable software solutions for businesses globally and across major tech hubs like Lahore and Faisalabad.",
    url: "https://hamza-manzoor.vercel.app",
    siteName: "Hamza Manzoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Senior Full-Stack Developer & SaaS Architect | Hamza Manzoor",
    description:
      "Enterprise-grade full-stack web application development specializing in Next.js, NestJS, and AI automation. Building scalable software solutions for businesses globally and across major tech hubs like Lahore and Faisalabad.",
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
      </body>
    </html>
  );
}

