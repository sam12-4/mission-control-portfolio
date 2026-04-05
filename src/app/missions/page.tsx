"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { missions } from "@/data/missions";
import { RadarMap } from "@/components/missions/RadarMap";
import { MissionBrief } from "@/components/missions/MissionBrief";
import { MissionFilter } from "@/components/missions/MissionFilter";
import { MissionCard } from "@/components/missions/MissionCard";
import type { Mission } from "@/types/mission";
import { useIsMobile } from "@/hooks/useMediaQuery";

export default function MissionsPage() {
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [filter, setFilter] = useState("all");
  const isMobile = useIsMobile();

  const filteredMissions =
    filter === "all"
      ? missions
      : missions.filter((m) => m.category === filter);

  return (
    <div className="min-h-screen px-4 md:px-8 lg:pr-12 py-12">
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
            {missions.length} RECORDS
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
          MISSION LOG
        </h1>
      </motion.div>

      {/* Filter */}
      <MissionFilter filter={filter} onFilterChange={setFilter} />

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl">
        {/* Radar / Card grid */}
        {!isMobile ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <div className="border border-cyan/15 bg-panel/20 p-4">
              <div className="text-[9px] font-mono text-cyan/40 tracking-[0.2em] mb-3">
                TACTICAL RADAR
              </div>
              <RadarMap
                onSelectMission={setSelectedMission}
                selectedMission={selectedMission}
                filter={filter}
              />
            </div>
          </motion.div>
        ) : null}

        {/* Card grid */}
        <div className="space-y-3">
          <div className="text-[9px] font-mono text-cyan/40 tracking-[0.2em] mb-3">
            MISSION INDEX
          </div>
          {filteredMissions.map((mission, i) => (
            <MissionCard
              key={mission.slug}
              mission={mission}
              index={i}
              onClick={() => setSelectedMission(mission)}
            />
          ))}
        </div>
      </div>

      {/* Mission Brief overlay */}
      <AnimatePresence>
        {selectedMission && (
          <MissionBrief
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
