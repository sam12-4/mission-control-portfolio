"use client";

import { motion } from "framer-motion";
import type { Mission } from "@/types/mission";
import { DataPanel } from "@/components/ui/DataPanel";
import { HudButton } from "@/components/ui/HudButton";

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

  return (
    <motion.div
      className="fixed inset-y-0 right-0 z-40 w-full max-w-md bg-deep-space/95 backdrop-blur-md border-l border-cyan/20 overflow-y-auto"
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="p-6">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-text-dim hover:text-cyan text-xs font-mono tracking-wider"
        >
          [CLOSE]
        </button>

        {/* Header */}
        <div className="mb-6 pt-2">
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

        {/* Image placeholder */}
        <DataPanel title="VISUAL INTEL" className="mb-6">
          <div className="aspect-video bg-panel border border-cyan/10 flex items-center justify-center">
            <span className="text-[10px] font-mono text-text-dim/40">
              SCREENSHOT PENDING
            </span>
          </div>
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
  );
}
