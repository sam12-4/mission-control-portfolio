"use client";

import { motion } from "framer-motion";

interface MissionFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const filters = [
  { id: "all", label: "ALL MISSIONS" },
  { id: "fullstack", label: "FULL STACK" },
  { id: "frontend", label: "FRONTEND" },
  { id: "backend", label: "BACKEND" },
  { id: "ai", label: "AI / ML" },
];

export function MissionFilter({ filter, onFilterChange }: MissionFilterProps) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {filters.map((f) => (
        <button
          key={f.id}
          onClick={() => onFilterChange(f.id)}
          className="relative"
        >
          <span
            className={`text-[10px] font-mono tracking-[0.15em] px-3 py-1.5 border transition-all duration-300 ${
              filter === f.id
                ? "text-cyan border-cyan/50 bg-cyan/10"
                : "text-text-dim border-text-dim/20 hover:border-text-dim/40 hover:text-text"
            }`}
          >
            {f.label}
          </span>
          {filter === f.id && (
            <motion.div
              className="absolute -bottom-[1px] left-0 right-0 h-[1px] bg-cyan"
              layoutId="filter-indicator"
            />
          )}
        </button>
      ))}
    </div>
  );
}
