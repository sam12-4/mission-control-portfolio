"use client";

import { type ReactNode } from "react";

interface DataPanelProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export function DataPanel({ title, children, className = "" }: DataPanelProps) {
  return (
    <div
      className={`relative border border-cyan/20 bg-panel/50 backdrop-blur-sm ${className}`}
    >
      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-cyan/50" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-cyan/50" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-cyan/50" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-cyan/50" />

      {title && (
        <div className="px-4 py-2 border-b border-cyan/10">
          <span className="text-[10px] font-mono text-cyan/70 tracking-[0.2em] uppercase">
            {title}
          </span>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
