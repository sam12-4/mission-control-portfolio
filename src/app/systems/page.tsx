"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systems } from "@/data/systems";
import { TechModule } from "@/components/systems/TechModule";
import { CircuitLines } from "@/components/systems/CircuitLines";
import { DataPanel } from "@/components/ui/DataPanel";
import { Portal } from "@/components/ui/Portal";
import type { TechSystem } from "@/types/system";

// Shared readout body — used in the desktop side panel and the mobile sheet.
function SystemReadout({
  system,
  onSelectConnected,
}: {
  system: TechSystem;
  onSelectConnected: (system: TechSystem) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-display text-cyan tracking-wider">
          {system.name}
        </h3>
        <span className="text-[9px] font-mono text-text-dim tracking-wider">
          {system.category.toUpperCase()} MODULE
        </span>
      </div>

      <div>
        <span className="text-[9px] font-mono text-text-dim/60 tracking-wider">
          DESCRIPTION
        </span>
        <p className="text-xs font-mono text-text leading-relaxed mt-1">
          {system.description}
        </p>
      </div>

      <div>
        <span className="text-[9px] font-mono text-text-dim/60 tracking-wider">
          PROFICIENCY
        </span>
        <div className="flex items-center gap-2 mt-1">
          <div className="flex-1 h-2 bg-panel border border-cyan/10 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-cyan/60 to-cyan"
              initial={{ width: "0%" }}
              animate={{ width: `${system.level}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
          <span className="text-sm font-mono text-cyan tabular-nums">
            {system.level}%
          </span>
        </div>
      </div>

      <div>
        <span className="text-[9px] font-mono text-text-dim/60 tracking-wider">
          CONNECTED SYSTEMS
        </span>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {system.connections.map((conn) => {
            const connected = systems.find((s) => s.id === conn);
            return connected ? (
              <button
                key={conn}
                className="text-[10px] font-mono text-cyan/60 px-2 py-1 border border-cyan/15 hover:border-cyan/40 transition-colors"
                onClick={() => onSelectConnected(connected)}
              >
                {connected.name}
              </button>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}

// Mobile-only bottom sheet so the readout is visible immediately on tap,
// instead of sitting far below the module grid.
function MobileReadoutSheet({
  system,
  onClose,
  onSelectConnected,
}: {
  system: TechSystem;
  onClose: () => void;
  onSelectConnected: (system: TechSystem) => void;
}) {
  return (
    <Portal>
      <motion.div
        className="lg:hidden fixed inset-0 z-[55] bg-void/70 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />
      <motion.div
        className="lg:hidden fixed inset-x-0 bottom-0 z-[60] max-h-[80vh] flex flex-col bg-deep-space border-t border-cyan/30"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
      >
        <div className="flex items-center justify-between gap-3 h-12 px-4 border-b border-cyan/20 shrink-0">
          <span className="text-[10px] font-mono text-cyan/70 tracking-[0.2em]">
            SYSTEM READOUT
          </span>
          <button
            onClick={onClose}
            aria-label="Close system readout"
            className="flex items-center gap-2 h-10 px-3 -mr-2 text-text-dim hover:text-cyan transition-colors"
          >
            <span className="text-[10px] font-mono tracking-wider">CLOSE</span>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">
          <SystemReadout system={system} onSelectConnected={onSelectConnected} />
        </div>
      </motion.div>
    </Portal>
  );
}

export default function SystemsPage() {
  const [activeSystem, setActiveSystem] = useState<TechSystem | null>(null);

  return (
    <div className="min-h-screen px-4 md:px-8 py-12">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-[1px] bg-cyan/50" />
          <span className="text-[10px] font-mono text-amber tracking-[0.3em]">
            {systems.length} SYSTEMS
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
          TECH SYSTEMS
        </h1>
        <p className="text-[11px] font-mono text-text-dim mt-2 tracking-wider">
          ACTIVE SUBSYSTEMS AND OPERATIONAL STATUS
        </p>
      </motion.div>

      <div className="max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Tech Grid */}
        <div className="lg:col-span-2 relative">
          <CircuitLines />
          <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-3">
            {systems.map((system, i) => (
              <TechModule
                key={system.id}
                system={system}
                index={i}
                isActive={activeSystem?.id === system.id}
                onClick={() =>
                  setActiveSystem(
                    activeSystem?.id === system.id ? null : system
                  )
                }
              />
            ))}
          </div>
        </div>

        {/* Detail panel — desktop only; mobile uses the bottom sheet below */}
        <div className="hidden lg:block">
          {activeSystem ? (
            <motion.div
              key={activeSystem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DataPanel title="SYSTEM READOUT">
                <SystemReadout
                  system={activeSystem}
                  onSelectConnected={setActiveSystem}
                />
              </DataPanel>
            </motion.div>
          ) : (
            <DataPanel title="SYSTEM READOUT">
              <div className="text-center py-8">
                <span className="text-[11px] font-mono text-text-dim/40">
                  SELECT A SYSTEM MODULE
                  <br />
                  TO VIEW DETAILS
                </span>
              </div>
            </DataPanel>
          )}
        </div>
      </div>

      {/* Mobile bottom sheet */}
      <AnimatePresence>
        {activeSystem && (
          <MobileReadoutSheet
            system={activeSystem}
            onClose={() => setActiveSystem(null)}
            onSelectConnected={setActiveSystem}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
