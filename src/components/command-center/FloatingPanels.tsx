"use client";

import { motion } from "framer-motion";
import { StatusIndicator } from "@/components/hud/StatusIndicator";

const panels = [
  {
    id: "coords",
    label: "COORDINATES",
    value: "47.6062\u00b0 N, 122.3321\u00b0 W",
    position: "top-20 right-8",
    delay: 0.2,
  },
  {
    id: "signal",
    label: "SIGNAL STRENGTH",
    value: "98.7%",
    position: "bottom-32 right-8",
    delay: 0.4,
  },
  {
    id: "missions",
    label: "ACTIVE MISSIONS",
    value: "3",
    position: "bottom-32 left-8",
    delay: 0.6,
  },
  {
    id: "uptime",
    label: "SYSTEM UPTIME",
    value: "2847:16:03",
    position: "top-20 left-8",
    delay: 0.8,
  },
];

export function FloatingPanels() {
  return (
    <>
      {panels.map((panel) => (
        <motion.div
          key={panel.id}
          className={`absolute ${panel.position} z-20 hidden lg:block`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: panel.delay + 0.5, duration: 0.5, ease: "easeOut" }}
        >
          <div className="border border-cyan/15 bg-panel/40 backdrop-blur-sm p-3 min-w-[140px]">
            <div className="flex items-center gap-2 mb-1">
              <StatusIndicator status="online" size="sm" />
              <span className="text-[9px] font-mono text-cyan/50 tracking-[0.2em]">
                {panel.label}
              </span>
            </div>
            <span className="text-sm font-mono text-text tabular-nums">
              {panel.value}
            </span>
          </div>
        </motion.div>
      ))}

      {/* Mobile compact status bar */}
      <motion.div
        className="absolute bottom-36 left-4 right-4 z-20 flex justify-between lg:hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <div className="border border-cyan/15 bg-panel/40 backdrop-blur-sm px-3 py-2">
          <span className="text-[8px] font-mono text-cyan/50 tracking-[0.15em] block">SIGNAL</span>
          <span className="text-xs font-mono text-text tabular-nums">98.7%</span>
        </div>
        <div className="border border-cyan/15 bg-panel/40 backdrop-blur-sm px-3 py-2">
          <span className="text-[8px] font-mono text-cyan/50 tracking-[0.15em] block">MISSIONS</span>
          <span className="text-xs font-mono text-text tabular-nums">3</span>
        </div>
        <div className="border border-cyan/15 bg-panel/40 backdrop-blur-sm px-3 py-2">
          <span className="text-[8px] font-mono text-cyan/50 tracking-[0.15em] block">STATUS</span>
          <span className="text-xs font-mono text-green tabular-nums">ONLINE</span>
        </div>
      </motion.div>
    </>
  );
}
