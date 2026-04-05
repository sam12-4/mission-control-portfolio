"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { HudButton } from "@/components/ui/HudButton";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-void">
      <div className="text-center px-4">
        {/* Static noise effect */}
        <div className="relative inline-block mb-6">
          <motion.h1
            className="text-6xl md:text-8xl font-display text-red tracking-[0.2em]"
            style={{ animation: "flicker 3s ease-in-out infinite" }}
          >
            404
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-display text-cyan tracking-[0.15em] mb-2 text-glow-cyan">
            SIGNAL LOST
          </h2>
          <p className="text-xs font-mono text-text-dim tracking-wider mb-8">
            SECTOR NOT FOUND — NO BEACON DETECTED AT THIS COORDINATE
          </p>

          <Link href="/">
            <HudButton variant="primary">RETURN TO COMMAND CENTER</HudButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
