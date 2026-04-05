"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  delay?: number;
  duration?: number;
}

export function ProgressBar({ delay = 0, duration = 1.5 }: ProgressBarProps) {
  return (
    <div className="my-3">
      <div className="flex items-center gap-2 text-[10px] font-mono text-text-dim mb-1">
        <span>LOADING CORE SYSTEMS</span>
      </div>
      <div className="relative h-2 bg-panel border border-cyan/20 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan/80 to-cyan"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ delay, duration, ease: "easeInOut" }}
        />
        {/* Scan effect on bar */}
        <motion.div
          className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ left: "-10%" }}
          animate={{ left: "110%" }}
          transition={{ delay: delay + 0.5, duration: 1, ease: "linear", repeat: 1 }}
        />
      </div>
    </div>
  );
}
