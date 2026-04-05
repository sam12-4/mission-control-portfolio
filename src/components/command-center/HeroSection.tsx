"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { FloatingPanels } from "./FloatingPanels";
import { profile } from "@/data/profile";

const SceneContainer = dynamic(
  () =>
    import("@/components/three/SceneContainer").then((m) => ({
      default: m.SceneContainer,
    })),
  { ssr: false }
);

const NebulaParticles = dynamic(
  () =>
    import("@/components/three/NebulaParticles").then((m) => ({
      default: m.NebulaParticles,
    })),
  { ssr: false }
);

const HologramText = dynamic(
  () =>
    import("@/components/three/HologramText").then((m) => ({
      default: m.HologramText,
    })),
  { ssr: false }
);

const PostEffects = dynamic(
  () =>
    import("@/components/three/PostEffects").then((m) => ({
      default: m.PostEffects,
    })),
  { ssr: false }
);

export function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 3D Scene */}
      <SceneContainer>
        <NebulaParticles count={5000} />
        <HologramText text={profile.name} subtitle={`// ${profile.title}`} />
        <PostEffects />
      </SceneContainer>

      {/* Floating HUD panels */}
      <FloatingPanels />

      {/* Bottom callsign */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-20 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <div className="text-[10px] font-mono text-text-dim tracking-[0.4em] mb-2">
          {profile.stationDesignation}
        </div>
        <div className="flex items-center gap-2 justify-center">
          <div className="w-6 md:w-12 h-[1px] bg-gradient-to-r from-transparent to-cyan/30" />
          <span className="text-[10px] font-mono text-cyan/40 tracking-[0.3em]">
            SCROLL TO EXPLORE
          </span>
          <div className="w-6 md:w-12 h-[1px] bg-gradient-to-l from-transparent to-cyan/30" />
        </div>
        {/* Animated scroll indicator */}
        <motion.div
          className="mt-3 mx-auto w-4 h-6 border border-cyan/30 rounded-full flex items-start justify-center p-1"
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, repeatType: "reverse", duration: 1.5 }}
        >
          <motion.div
            className="w-1 h-1 bg-cyan rounded-full"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

      {/* Gradient fade at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-void to-transparent z-10" />
    </section>
  );
}
