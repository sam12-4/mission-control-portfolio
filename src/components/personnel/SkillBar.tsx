"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SkillBarProps {
  name: string;
  level: number;
  status: string;
  delay?: number;
}

export function SkillBar({ name, level, status, delay = 0 }: SkillBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const statusColor =
    status === "ONLINE"
      ? "text-green"
      : status === "STANDBY"
        ? "text-amber"
        : "text-cyan";

  return (
    <div ref={ref} className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[11px] font-mono text-text tracking-wider">
          {name}
        </span>
        <div className="flex items-center gap-2">
          <span className={`text-[9px] font-mono ${statusColor}`}>{status}</span>
          <span className="text-[10px] font-mono text-cyan tabular-nums">
            {level}%
          </span>
        </div>
      </div>
      <div className="relative h-1.5 bg-panel border border-cyan/10 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan/60 to-cyan"
          initial={{ width: "0%" }}
          animate={inView ? { width: `${level}%` } : { width: "0%" }}
          transition={{ delay: delay + 0.2, duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
