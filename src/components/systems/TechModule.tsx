"use client";

import { motion } from "framer-motion";
import type { TechSystem } from "@/types/system";
import { StatusIndicator } from "@/components/hud/StatusIndicator";

interface TechModuleProps {
  system: TechSystem;
  index: number;
  isActive: boolean;
  onClick: () => void;
}

export function TechModule({ system, index, isActive, onClick }: TechModuleProps) {
  const statusMap = {
    ONLINE: "online" as const,
    STANDBY: "standby" as const,
    TRAINING: "offline" as const,
  };

  return (
    <motion.div
      className={`relative border p-4 cursor-pointer transition-all duration-300 ${
        isActive
          ? "border-cyan/50 bg-cyan/5 shadow-[0_0_15px_rgba(0,240,255,0.1)]"
          : "border-cyan/10 bg-panel/30 hover:border-cyan/30 hover:bg-panel/50"
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      onClick={onClick}
      data-system-id={system.id}
      whileHover={{ scale: 1.02 }}
    >
      {/* Status light */}
      <div className="flex items-center justify-between mb-3">
        <StatusIndicator status={statusMap[system.status]} />
        <span className="text-[9px] font-mono text-text-dim/50 tracking-wider">
          {system.category.toUpperCase()}
        </span>
      </div>

      {/* Name */}
      <h3 className="text-sm font-display text-text tracking-wider mb-1">
        {system.name}
      </h3>

      {/* Level bar */}
      <div className="relative h-1 bg-panel mt-3 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan/40 to-cyan"
          initial={{ width: "0%" }}
          animate={{ width: `${system.level}%` }}
          transition={{ delay: index * 0.05 + 0.3, duration: 1, ease: "easeOut" }}
        />
      </div>

      {/* Level text */}
      <div className="flex items-center justify-between mt-2">
        <span className="text-[9px] font-mono text-text-dim">{system.status}</span>
        <span className="text-[10px] font-mono text-cyan tabular-nums">
          {system.level}%
        </span>
      </div>

      {/* Active glow corner */}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan" />
        </div>
      )}
    </motion.div>
  );
}
