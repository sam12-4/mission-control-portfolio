"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { DataPanel } from "@/components/ui/DataPanel";
import { StatusIndicator } from "@/components/hud/StatusIndicator";
import { missions } from "@/data/missions";
import { systems } from "@/data/systems";
import { profile } from "@/data/profile";

const subsystems = [
  {
    id: "personnel",
    label: "PERSONNEL FILE",
    description: "Operator dossier, credentials, and system proficiency ratings",
    href: "/personnel",
    status: "online" as const,
    stats: [
      { label: "CLEARANCE", value: "ALPHA" },
      { label: "SYSTEMS", value: `${systems.length}` },
    ],
  },
  {
    id: "missions",
    label: "MISSION LOG",
    description: "Complete archive of completed, active, and classified operations",
    href: "/missions",
    status: "online" as const,
    stats: [
      { label: "TOTAL", value: `${missions.length}` },
      { label: "ACTIVE", value: `${missions.filter((m) => m.status === "ACTIVE").length}` },
    ],
  },
  {
    id: "systems",
    label: "TECH SYSTEMS",
    description: "Operational status of all deployed technologies and subsystems",
    href: "/systems",
    status: "online" as const,
    stats: [
      { label: "ONLINE", value: `${systems.filter((s) => s.status === "ONLINE").length}` },
      { label: "STANDBY", value: `${systems.filter((s) => s.status === "STANDBY").length}` },
    ],
  },
  {
    id: "comms",
    label: "OPEN COMMS",
    description: "Establish a direct communication link via encrypted transmission",
    href: "/comms",
    status: "standby" as const,
    stats: [
      { label: "CHANNELS", value: "4" },
      { label: "STATUS", value: "OPEN" },
    ],
  },
];

export function StationOverview() {
  return (
    <section className="relative px-4 md:px-8 py-20">
      {/* Section header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center gap-3 justify-center mb-3">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-cyan/40" />
          <span className="text-[10px] font-mono text-amber tracking-[0.3em]">
            STATION SUBSYSTEMS
          </span>
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-cyan/40" />
        </div>
        <h2 className="text-xl md:text-2xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
          SYSTEM DIRECTORY
        </h2>
        <p className="text-[11px] font-mono text-text-dim mt-2 max-w-md mx-auto tracking-wider">
          Navigate to any subsystem to access detailed operational data
        </p>
      </motion.div>

      {/* Subsystem cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
        {subsystems.map((sub, i) => (
          <motion.div
            key={sub.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link href={sub.href}>
              <div className="border border-cyan/15 bg-panel/20 backdrop-blur-sm p-5 hover:border-cyan/40 hover:bg-panel/40 transition-all duration-300 group cursor-pointer h-full">
                {/* Top row */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <StatusIndicator status={sub.status} />
                    <span className="text-[9px] font-mono text-text-dim/50 tracking-wider">
                      0{i + 1}
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-cyan/30 group-hover:text-cyan/60 tracking-wider transition-colors">
                    ACCESS &rarr;
                  </span>
                </div>

                {/* Label */}
                <h3 className="text-sm font-display text-text group-hover:text-cyan tracking-[0.1em] transition-colors mb-2">
                  {sub.label}
                </h3>

                {/* Description */}
                <p className="text-[10px] font-mono text-text-dim leading-relaxed mb-4">
                  {sub.description}
                </p>

                {/* Stats */}
                <div className="flex gap-6 pt-3 border-t border-cyan/10">
                  {sub.stats.map((stat) => (
                    <div key={stat.label}>
                      <span className="text-[8px] font-mono text-text-dim/50 tracking-wider block">
                        {stat.label}
                      </span>
                      <span className="text-xs font-mono text-cyan tabular-nums">
                        {stat.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick profile section */}
      <motion.div
        className="mt-16 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <DataPanel title="STATION COMMANDER">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Profile photo */}
            <div className="relative w-20 h-20 flex-shrink-0 border border-cyan/20 bg-panel overflow-hidden">
              <Image
                src={profile.profileImage}
                alt={profile.name}
                fill
                className="object-cover object-top"
              />
              <div className="absolute inset-0 bg-cyan/5 mix-blend-overlay" />
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan/40 z-10" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan/40 z-10" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan/40 z-10" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan/40 z-10" />
            </div>

            <div className="flex-1">
              <h3 className="text-lg font-display text-cyan tracking-wider">
                {profile.name}
              </h3>
              <p className="text-[10px] font-mono text-amber tracking-wider mt-0.5">
                {profile.callsign} &bull; {profile.title}
              </p>
              <p className="text-[11px] font-mono text-text-dim leading-relaxed mt-3 max-w-lg">
                {profile.bio}
              </p>

              {/* Quick stats */}
              <div className="flex flex-wrap gap-6 mt-4 pt-3 border-t border-cyan/10">
                {profile.stats.map((stat) => (
                  <div key={stat.label}>
                    <span className="text-lg font-display text-cyan tabular-nums">
                      {stat.value.toLocaleString()}
                    </span>
                    <span className="text-[8px] font-mono text-text-dim/50 tracking-wider block mt-0.5">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DataPanel>
      </motion.div>

      {/* Bottom decoration */}
      <div className="flex items-center justify-center mt-16 gap-3">
        <div className="w-20 h-[1px] bg-gradient-to-r from-transparent to-cyan/20" />
        <span className="text-[9px] font-mono text-text-dim/30 tracking-[0.3em]">
          END OF TRANSMISSION
        </span>
        <div className="w-20 h-[1px] bg-gradient-to-l from-transparent to-cyan/20" />
      </div>
    </section>
  );
}
