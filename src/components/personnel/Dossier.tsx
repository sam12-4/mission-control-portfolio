"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { profile } from "@/data/profile";
import { systems } from "@/data/systems";
import { DataPanel } from "@/components/ui/DataPanel";
import { CountUp } from "@/components/ui/CountUp";
import { TypewriterText } from "./TypewriterText";
import { SkillBar } from "./SkillBar";

export function Dossier() {
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
    </div>
  );
}
