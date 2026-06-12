"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { profile } from "@/data/profile";
import { systems } from "@/data/systems";
import { DataPanel } from "@/components/ui/DataPanel";
import { CountUp } from "@/components/ui/CountUp";
import { TypewriterText } from "./TypewriterText";
import { SkillBar } from "./SkillBar";

export function Dossier() {
  const [previewOpen, setPreviewOpen] = useState(false);

  // ESC closes the resume preview
  useEffect(() => {
    if (!previewOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setPreviewOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [previewOpen]);

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      {/* Header */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[1px] bg-cyan/50" />
          <span className="text-[10px] font-mono text-amber tracking-[0.3em]">
            CLASSIFIED
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
          PERSONNEL FILE
        </h1>
        <p className="text-[11px] font-mono text-text-dim mt-2 tracking-wider">
          CLEARANCE LEVEL: ALPHA &bull; FILE #{profile.stationDesignation}
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl">
        {/* Left Column: Profile */}
        <div className="space-y-6">
          {/* Profile card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <DataPanel title="IDENTITY">
              <div className="flex items-start gap-4">
                {/* Holographic frame placeholder */}
                <div className="relative w-24 h-24 flex-shrink-0 border border-cyan/30 bg-panel overflow-hidden">
                  <Image
                    src={profile.profileImage}
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                  />
                  {/* Scan line over image */}
                  <div
                    className="absolute left-0 w-full h-[1px] bg-cyan/30 z-10"
                    style={{ animation: "scanline 3s linear infinite" }}
                  />
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/50 z-10" />
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/50 z-10" />
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/50 z-10" />
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/50 z-10" />
                  {/* Holographic tint overlay */}
                  <div className="absolute inset-0 bg-cyan/5 mix-blend-overlay z-10" />
                </div>

                <div>
                  <h2 className="text-lg font-display text-cyan tracking-wider">
                    {profile.name}
                  </h2>
                  <p className="text-[11px] font-mono text-amber tracking-wider mt-1">
                    {profile.callsign}
                  </p>
                  <p className="text-[11px] font-mono text-text-dim mt-1">
                    {profile.title}
                  </p>
                  <p className="text-[10px] font-mono text-text-dim/60 mt-2">
                    {profile.coordinates}
                  </p>
                </div>
              </div>

              {/* Resume / dossier actions */}
              <div className="mt-4 flex gap-2.5">
                {/* View — opens in-page preview */}
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="group relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-cyan/50 text-cyan text-[11px] font-mono tracking-[0.15em] uppercase hover:bg-cyan/10 hover:border-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)] transition-all duration-300"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                  View
                  <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current" />
                  <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current" />
                  <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current" />
                  <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current" />
                </button>
                {/* Download */}
                <a
                  href={profile.resumeUrl}
                  download
                  className="group relative flex-1 flex items-center justify-center gap-2 px-3 py-2.5 border border-text-dim/30 text-text-dim text-[11px] font-mono tracking-[0.15em] uppercase hover:text-cyan hover:border-cyan/50 transition-all duration-300"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download
                </a>
              </div>
            </DataPanel>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <DataPanel title="MISSION BRIEF">
              <TypewriterText
                text={profile.bio}
                className="text-xs font-mono text-text leading-relaxed"
                speed={15}
              />
            </DataPanel>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <DataPanel title="OPERATIONAL STATS">
              <div className="grid grid-cols-2 gap-4">
                {profile.stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <CountUp
                      end={stat.value}
                      className="text-xl font-display text-cyan text-glow-cyan"
                      duration={2500}
                      suffix={stat.value > 1000 ? "+" : ""}
                    />
                    <p className="text-[9px] font-mono text-text-dim mt-1 tracking-wider">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </DataPanel>
          </motion.div>
        </div>

        {/* Right Column: Skills */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <DataPanel title="SYSTEM PROFICIENCY">
            <div className="space-y-1">
              {systems.map((sys, i) => (
                <SkillBar
                  key={sys.id}
                  name={sys.name}
                  level={sys.level}
                  status={sys.status}
                  delay={i * 0.08}
                />
              ))}
            </div>
          </DataPanel>
        </motion.div>
      </div>

      {/* Resume preview modal */}
      <AnimatePresence>
        {previewOpen && (
          <motion.div
            className="fixed inset-0 z-[70] bg-void/90 backdrop-blur-md flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewOpen(false)}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between gap-3 h-12 px-4 shrink-0 border-b border-cyan/20 bg-deep-space/80"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-[10px] font-mono text-cyan/70 tracking-[0.2em] truncate">
                {profile.name.toUpperCase()} <span className="text-text-dim/40">// DOSSIER</span>
              </span>
              <div className="flex items-center gap-1">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 h-9 px-2.5 text-text-dim hover:text-cyan text-[10px] font-mono tracking-wider transition-colors"
                >
                  OPEN
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  </svg>
                </a>
                <a
                  href={profile.resumeUrl}
                  download
                  aria-label="Download resume"
                  className="flex items-center h-9 px-2.5 text-text-dim hover:text-cyan transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </a>
                <button
                  onClick={() => setPreviewOpen(false)}
                  aria-label="Close preview"
                  className="flex items-center gap-2 h-10 px-3 -mr-1 text-text-dim hover:text-cyan transition-colors"
                >
                  <span className="text-[10px] font-mono tracking-wider">CLOSE</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
            {/* PDF preview */}
            <div className="flex-1 overflow-hidden p-2 sm:p-4" onClick={(e) => e.stopPropagation()}>
              <iframe
                src={`${profile.resumeUrl}#view=FitH`}
                title={`${profile.name} resume`}
                className="w-full h-full bg-white border border-cyan/20"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
