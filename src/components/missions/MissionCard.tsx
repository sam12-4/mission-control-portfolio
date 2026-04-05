"use client";

import { motion } from "framer-motion";
import type { Mission } from "@/types/mission";
import { StatusIndicator } from "@/components/hud/StatusIndicator";

interface MissionCardProps {
  mission: Mission;
  index: number;
  onClick: () => void;
}

export function MissionCard({ mission, index, onClick }: MissionCardProps) {
  const statusMap = {
    COMPLETE: "online" as const,
    ACTIVE: "standby" as const,
    CLASSIFIED: "offline" as const,
  };

  return (
    <motion.div
      className="border border-cyan/15 bg-panel/30 backdrop-blur-sm p-4 cursor-pointer hover:border-cyan/40 hover:bg-panel/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      onClick={onClick}
      whileHover={{ scale: 1.01 }}
    >
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <StatusIndicator status={statusMap[mission.status]} />
          <span className="text-[9px] font-mono text-text-dim tracking-wider">
            {mission.status}
          </span>
        </div>
        <span className="text-[9px] font-mono text-text-dim/50">{mission.date}</span>
      </div>

      {/* Codename */}
      <h3 className="text-sm font-display text-cyan tracking-wider mb-2 group-hover:text-glow-cyan transition-all">
        {mission.codename}
      </h3>

      {/* Objective */}
      <p className="text-[11px] font-mono text-text-dim leading-relaxed mb-3 line-clamp-2">
        {mission.objective}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        {mission.techDeployed.slice(0, 3).map((tech) => (
          <span
            key={tech}
            className="text-[9px] font-mono text-cyan/60 px-1.5 py-0.5 border border-cyan/10"
          >
            {tech}
          </span>
        ))}
        {mission.techDeployed.length > 3 && (
          <span className="text-[9px] font-mono text-text-dim/40">
            +{mission.techDeployed.length - 3}
          </span>
        )}
      </div>
    </motion.div>
  );
}
