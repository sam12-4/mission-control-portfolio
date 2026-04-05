"use client";

import { motion } from "framer-motion";

interface CommandInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "email" | "textarea";
  required?: boolean;
}

export function CommandInput({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}: CommandInputProps) {
  const baseClasses =
    "w-full bg-transparent text-text font-mono text-xs outline-none placeholder:text-text-dim/30";

  return (
    <motion.div
      className="border border-cyan/15 bg-panel/20 focus-within:border-cyan/40 focus-within:shadow-[0_0_10px_rgba(0,240,255,0.1)] transition-all duration-300"
      whileFocus={{ scale: 1.01 }}
    >
      <div className="px-3 py-1.5 border-b border-cyan/10">
        <label
          htmlFor={name}
          className="text-[9px] font-mono text-cyan/50 tracking-[0.2em] uppercase"
        >
          {label}
        </label>
      </div>
      <div className="px-3 py-2 flex items-start gap-2">
        <span className="text-cyan/40 text-xs font-mono select-none mt-0.5">&gt;</span>
        {type === "textarea" ? (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            rows={4}
            className={`${baseClasses} resize-none`}
            placeholder="Enter payload..."
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            required={required}
            className={baseClasses}
            placeholder={`Enter ${label.toLowerCase()}...`}
          />
        )}
      </div>
    </motion.div>
  );
}
