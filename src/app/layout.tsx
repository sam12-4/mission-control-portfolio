import type { Metadata } from "next";
import { Orbitron, JetBrains_Mono } from "next/font/google";
import { StationProvider } from "@/providers/StationProvider";
import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { HudShell } from "@/components/hud/HudShell";
import "./globals.css";

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
  title: "Mission Control | Sameer Hussain",
  description:
    "Space station command center portfolio — Full Stack Developer specializing in high-performance web applications.",
  keywords: ["developer", "portfolio", "full stack", "react", "next.js"],
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
