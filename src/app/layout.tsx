import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hamzamanzoor.dev"),
  title: {
    default: "Hamza Manzoor | Senior Full-Stack Developer",
    template: "%s | Hamza Manzoor",
  },
  description:
    "Senior Full-Stack Developer and AI Systems Architect building high-performance SaaS and multimodal AI platforms.",
  keywords: [
    "Hamza Manzoor",
    "Full-Stack Developer",
    "AI Systems Architect",
    "Next.js Portfolio",
    "React",
    "Node.js",
    "NestJS",
    "FastAPI",
    "AWS",
    "GCP",
  ],
  openGraph: {
    title: "Hamza Manzoor | Senior Full-Stack Developer",
    description:
      "Building scalable SaaS and AI systems with modern web and cloud infrastructure.",
    url: "https://hamzamanzoor.dev",
    siteName: "Hamza Manzoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamza Manzoor | Senior Full-Stack Developer",
    description:
      "Building scalable SaaS and AI systems with modern web and cloud infrastructure.",
  },
  alternates: {
    canonical: "/",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
