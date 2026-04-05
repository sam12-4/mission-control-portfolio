"use client";

import { motion } from "framer-motion";
import type { BootMessage } from "@/types";

interface TerminalLineProps {
  message: BootMessage;
  index: number;
}

export function TerminalLine({ message, index }: TerminalLineProps) {
  const colorMap = {
    header: "text-cyan font-display text-sm tracking-[0.2em]",
    info: "text-text-dim",
    success: "text-green",
    warning: "text-amber",
    error: "text-red",
    welcome: "text-cyan text-lg font-display tracking-[0.15em] text-glow-cyan",
  };

  const prefixMap = {
    header: "",
    info: "> ",
    success: "  ",
    warning: "! ",
    error: "X ",
    welcome: "\n  ",
  };

  return (
    <motion.div
      className={`font-mono text-xs leading-relaxed ${colorMap[message.type]}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.15,
        delay: index * 0.15,
        ease: "easeOut",
      }}
    >
      <span className="text-text-dim/40">{prefixMap[message.type]}</span>
      {message.text}
    </motion.div>
  );
}
