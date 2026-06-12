import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { StationProvider } from "@/providers/StationProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { HudShell } from "@/components/hud/HudShell";
import { profile } from "@/data/profile";
import "./globals.css";

const SITE_URL = "https://mission-control-portfolio-mu.vercel.app";
const SITE_TITLE = `Mission Control | ${profile.name}`;
const SITE_DESCRIPTION =
  "Space station command center portfolio — Sameer Hussain, Full Stack Developer specializing in React, Next.js, and high-performance web applications.";

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Sameer Hussain",
    "developer",
    "portfolio",
    "full stack developer",
    "react",
    "next.js",
    "vue.js",
    "node.js",
  ],
  authors: [{ name: profile.name }],
  creator: profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_TITLE,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    // og:image is generated automatically from app/opengraph-image.tsx
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
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
      className={`${orbitron.variable} ${jetbrainsMono.variable} h-full`}
    >
      <body className="min-h-full bg-void text-text antialiased">
        <StationProvider>
          <SmoothScrollProvider>
            <HudShell>{children}</HudShell>
          </SmoothScrollProvider>
        </StationProvider>
      </body>
    </html>
  );
}
