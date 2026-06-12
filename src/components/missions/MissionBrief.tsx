"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { Mission } from "@/types/mission";
import { DataPanel } from "@/components/ui/DataPanel";
import { HudButton } from "@/components/ui/HudButton";
import { audioEngine } from "@/lib/audio-engine";

interface MissionBriefProps {
  mission: Mission;
  onClose: () => void;
}

export function MissionBrief({ mission, onClose }: MissionBriefProps) {
  const statusColor =
    mission.status === "COMPLETE"
      ? "text-green"
      : mission.status === "ACTIVE"
        ? "text-amber"
        : "text-purple";

  useEffect(() => {
    audioEngine.play("panelOpen");
  }, []);

  function handleClose() {
    audioEngine.play("panelClose");
    onClose();
  }

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[55] bg-void/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      />
      {/* Panel */}
      <motion.div
        className="fixed inset-y-0 right-0 z-[60] w-full max-w-md bg-deep-space border-l border-cyan/20 flex flex-col"
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Sticky header with prominent close — always reachable on mobile */}
        <div className="flex items-center justify-between gap-3 h-12 px-4 border-b border-cyan/20 bg-deep-space/95 backdrop-blur-sm shrink-0">
          <span className="text-[10px] font-mono text-cyan/70 tracking-[0.2em]">
            MISSION BRIEF
          </span>
          <button
            onClick={handleClose}
            aria-label="Close mission brief"
            className="flex items-center gap-2 h-10 px-3 -mr-2 text-text-dim hover:text-cyan transition-colors"
          >
            <span className="text-[10px] font-mono tracking-wider">CLOSE</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto p-6">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-[10px] font-mono ${statusColor} tracking-wider`}>
              {mission.status}
            </span>
            <span className="text-text-dim/30">|</span>
            <span className="text-[10px] font-mono text-text-dim">{mission.date}</span>
          </div>
          <h2 className="text-xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
            {mission.codename}
          </h2>
        </div>

        {/* Objective */}
        <DataPanel title="OBJECTIVE" className="mb-4">
          <p className="text-xs font-mono text-text leading-relaxed">
            {mission.objective}
          </p>
        </DataPanel>

        {/* Description */}
        <DataPanel title="MISSION REPORT" className="mb-4">
          <p className="text-xs font-mono text-text-dim leading-relaxed">
            {mission.description}
          </p>
        </DataPanel>

        {/* Tech deployed */}
        <DataPanel title="TECH DEPLOYED" className="mb-4">
          <div className="flex flex-wrap gap-2">
            {mission.techDeployed.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono text-cyan border border-cyan/20 bg-cyan/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </DataPanel>

        {/* Visual intel */}
        <DataPanel title="VISUAL INTEL" className="mb-6">
          {mission.images.length > 0 ? (
            <div className="relative aspect-video bg-panel border border-cyan/10 overflow-hidden">
              <Image
                src={mission.images[0]}
                alt={`${mission.codename} screenshot`}
                fill
                sizes="(max-width: 768px) 100vw, 28rem"
                className="object-cover object-top"
              />
              {/* HUD corner accents */}
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/50" />
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/50" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/50" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/50" />
            </div>
          ) : (
            <div className="relative aspect-video bg-void border border-cyan/10 overflow-hidden flex flex-col items-center justify-center gap-2.5">
              {/* CRT scanline texture */}
              <div
                className="absolute inset-0 opacity-20 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, transparent 0 2px, rgba(0,240,255,0.22) 2px 3px)",
                }}
              />
              {/* Sweeping scan line */}
              <div
                className="absolute left-0 w-full h-px bg-cyan/40 pointer-events-none"
                style={{ animation: "scan-feed 4s linear infinite" }}
              />
              {/* No-signal glyph */}
              <svg
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-cyan/40 relative"
              >
                <rect x="2" y="4" width="20" height="13" rx="1" />
                <path d="M8 21h8M12 17v4" />
                <path d="M5 11h2.5l1.5-2.5L11 14l2-4 1 1.5h4.5" />
              </svg>
              <div className="relative flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-amber"
                  style={{ animation: "pulse-glow 1.5s ease-in-out infinite" }}
                />
                <span className="text-[10px] font-mono text-cyan/50 tracking-[0.3em]">
                  NO VISUAL FEED
                </span>
              </div>
              <span className="relative text-[8px] font-mono text-text-dim/40 tracking-[0.15em]">
                {mission.repoUrl
                  ? "ACCESS SOURCE FOR SCHEMATICS"
                  : "TELEMETRY UNAVAILABLE"}
              </span>
            </div>
          )}
        </DataPanel>

        {/* Actions */}
        <div className="flex gap-3">
          {mission.liveUrl && (
            <HudButton href={mission.liveUrl} variant="primary">
              VIEW LIVE
            </HudButton>
          )}
          {mission.repoUrl && (
            <HudButton href={mission.repoUrl} variant="secondary">
              SOURCE CODE
            </HudButton>
          )}
        </div>
      </div>
    </motion.div>
    </>
  );
}
