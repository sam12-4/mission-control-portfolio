"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useSound } from "@/hooks/useSound";

interface HudButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
  href?: string;
}

export function HudButton({
  children,
  onClick,
  variant = "primary",
  className = "",
  href,
}: HudButtonProps) {
  const baseStyles =
    "relative px-6 py-2.5 text-[11px] font-mono tracking-[0.15em] uppercase transition-all duration-300";

  const variantStyles = {
    primary:
      "border border-cyan/50 text-cyan hover:bg-cyan/10 hover:border-cyan hover:shadow-[0_0_15px_rgba(0,240,255,0.2)]",
    secondary:
      "border border-text-dim/30 text-text-dim hover:text-text hover:border-text-dim/60",
  };

  const { play } = useSound();
  const Component = href ? motion.a : motion.button;

  return (
    <Component
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      onClick={() => { play("select"); onClick?.(); }}
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Corner accents */}
      <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-current" />
      <span className="absolute top-0 right-0 w-2 h-2 border-t border-r border-current" />
      <span className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-current" />
      <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-current" />
      {children}
    </Component>
  );
}
