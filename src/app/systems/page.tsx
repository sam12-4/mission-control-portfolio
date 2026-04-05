"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { systems } from "@/data/systems";
import { TechModule } from "@/components/systems/TechModule";
import { CircuitLines } from "@/components/systems/CircuitLines";
import { DataPanel } from "@/components/ui/DataPanel";
import type { TechSystem } from "@/types/system";

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

        {/* Detail panel */}
        <div>
          {activeSystem ? (
            <motion.div
              key={activeSystem.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <DataPanel title="SYSTEM READOUT">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-display text-cyan tracking-wider">
                      {activeSystem.name}
                    </h3>
                    <span className="text-[9px] font-mono text-text-dim tracking-wider">
                      {activeSystem.category.toUpperCase()} MODULE
                    </span>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-text-dim/60 tracking-wider">
                      DESCRIPTION
                    </span>
                    <p className="text-xs font-mono text-text leading-relaxed mt-1">
                      {activeSystem.description}
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
                          animate={{ width: `${activeSystem.level}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                      <span className="text-sm font-mono text-cyan tabular-nums">
                        {activeSystem.level}%
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-[9px] font-mono text-text-dim/60 tracking-wider">
                      CONNECTED SYSTEMS
                    </span>
                    <div className="flex flex-wrap gap-1.5 mt-1">
                      {activeSystem.connections.map((conn) => {
                        const connected = systems.find((s) => s.id === conn);
                        return connected ? (
                          <button
                            key={conn}
                            className="text-[10px] font-mono text-cyan/60 px-2 py-0.5 border border-cyan/15 hover:border-cyan/40 transition-colors"
                            onClick={() => setActiveSystem(connected)}
                          >
                            {connected.name}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                </div>
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
    </div>
  );
}
