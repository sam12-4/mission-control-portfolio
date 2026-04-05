"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { navItems } from "@/data/navigation";
import { useState } from "react";
import { useSound } from "@/hooks/useSound";

export function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { play } = useSound();

  const currentSection = navItems.find((item) => {
    if (item.href === "/") return pathname === "/";
    return pathname.startsWith(item.href);
  });

  return (
    <>
      {/* Desktop nav - left side vertical */}
      <nav className="fixed left-0 top-10 bottom-0 z-30 w-48 hidden lg:flex flex-col justify-center pl-4">
        <div className="space-y-1">
          {navItems.map((item, i) => {
            const isActive = currentSection?.id === item.id;
            return (
              <Link key={item.id} href={item.href} onClick={() => play("navClick")}>
                <motion.div
                  className={`relative flex items-center gap-3 px-3 py-2.5 text-[11px] font-mono tracking-wider transition-colors group ${
                    isActive
                      ? "text-cyan"
                      : "text-text-dim hover:text-text"
                  }`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.4 }}
                >
                  {/* Active indicator line */}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan shadow-[0_0_8px_rgba(0,240,255,0.5)]"
                      layoutId="nav-indicator"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  {/* Nav number */}
                  <span className={`text-[9px] ${isActive ? "text-cyan" : "text-text-dim/50"}`}>
                    0{i + 1}
                  </span>
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </div>

        {/* Corner decoration */}
        <div className="absolute bottom-4 left-4 w-16 h-16">
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan/30 to-transparent" />
          <div className="absolute bottom-0 left-0 w-[1px] h-full bg-gradient-to-t from-cyan/30 to-transparent" />
        </div>
      </nav>

      {/* Mobile nav toggle */}
      <button
        onClick={() => { setIsOpen(!isOpen); play("navClick"); }}
        className="fixed top-0 right-0 z-50 lg:hidden h-10 w-10 flex items-center justify-center text-cyan"
        aria-label="Toggle navigation"
      >
        <div className="flex flex-col items-center justify-center gap-[5px]">
          <motion.div
            className="w-[18px] h-[2px] bg-cyan origin-center"
            animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-[18px] h-[2px] bg-cyan"
            animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.div
            className="w-[18px] h-[2px] bg-cyan origin-center"
            animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </button>

      {/* Mobile nav overlay */}
      <motion.div
        className="fixed inset-0 z-40 bg-void/95 backdrop-blur-md flex flex-col items-center justify-center overflow-y-auto lg:hidden"
        initial={false}
        animate={isOpen ? { opacity: 1, pointerEvents: "auto" as const } : { opacity: 0, pointerEvents: "none" as const }}
        transition={{ duration: 0.3 }}
      >
        <nav className="space-y-4">
          {navItems.map((item, i) => {
            const isActive = currentSection?.id === item.id;
            return (
              <Link key={item.id} href={item.href} onClick={() => { setIsOpen(false); play("navClick"); }}>
                <motion.div
                  className={`text-center py-3 text-sm font-mono tracking-[0.3em] ${
                    isActive ? "text-cyan text-glow-cyan" : "text-text-dim"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: i * 0.08, duration: 0.3 }}
                >
                  <span className="text-[10px] text-text-dim/40 mr-3">0{i + 1}</span>
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </>
  );
}
