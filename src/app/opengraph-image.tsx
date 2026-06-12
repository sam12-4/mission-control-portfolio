import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { profile } from "@/data/profile";

export const alt = `${profile.name} — Mission Control Portfolio`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand palette (mirrors src/lib/constants.ts)
const CYAN = "#00f0ff";
const AMBER = "#ffb800";
const VOID = "#0a0a14";
const TEXT_DIM = "#5a6e82";

export default async function Image() {
  const [orbitron, jetbrains] = await Promise.all([
    readFile(join(process.cwd(), "public/fonts/Orbitron-Bold.woff")),
    readFile(join(process.cwd(), "public/fonts/JetBrainsMono-Regular.woff")),
  ]);

  // Reusable HUD corner bracket
  const bracket = (pos: Record<string, number>, borders: string[]) => ({
    position: "absolute" as const,
    width: 48,
    height: 48,
    ...pos,
    ...Object.fromEntries(borders.map((b) => [b, `2px solid ${CYAN}`])),
    opacity: 0.6,
  });

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px 90px",
          position: "relative",
          backgroundColor: VOID,
          backgroundImage:
            "radial-gradient(900px 500px at 78% 18%, rgba(61,31,92,0.55), transparent 60%), radial-gradient(700px 500px at 8% 92%, rgba(0,240,255,0.10), transparent 55%)",
          fontFamily: "JetBrains",
          color: "#c8d6e5",
        }}
      >
        {/* HUD corner brackets */}
        <div style={bracket({ top: 44, left: 44 }, ["borderTop", "borderLeft"])} />
        <div style={bracket({ top: 44, right: 44 }, ["borderTop", "borderRight"])} />
        <div style={bracket({ bottom: 44, left: 44 }, ["borderBottom", "borderLeft"])} />
        <div style={bracket({ bottom: 44, right: 44 }, ["borderBottom", "borderRight"])} />

        {/* Status line */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            fontSize: 22,
            letterSpacing: 6,
            color: "#00ff88",
          }}
        >
          <div style={{ width: 10, height: 10, borderRadius: 10, backgroundColor: "#00ff88" }} />
          STATION ONLINE
          <span style={{ color: TEXT_DIM, marginLeft: 10 }}>{profile.stationDesignation}</span>
        </div>

        {/* Name */}
        <div
          style={{
            display: "flex",
            marginTop: 30,
            fontFamily: "Orbitron",
            fontSize: 104,
            letterSpacing: 4,
            color: CYAN,
            textShadow: `0 0 30px rgba(0,240,255,0.55)`,
            lineHeight: 1.05,
          }}
        >
          {profile.name.toUpperCase()}
        </div>

        {/* Title */}
        <div style={{ display: "flex", marginTop: 18, fontSize: 36, letterSpacing: 4, color: AMBER }}>
          {`// ${profile.title.toUpperCase()}`}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", marginTop: 36, width: 520, height: 1, backgroundColor: "rgba(0,240,255,0.35)" }} />

        {/* Tagline */}
        <div style={{ display: "flex", marginTop: 28, fontSize: 28, color: TEXT_DIM, letterSpacing: 1 }}>
          React · Next.js · Vue · Node · Python — web, mobile, AI/ML & blockchain
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Orbitron", data: orbitron, weight: 700, style: "normal" },
        { name: "JetBrains", data: jetbrains, weight: 400, style: "normal" },
      ],
    }
  );
}
