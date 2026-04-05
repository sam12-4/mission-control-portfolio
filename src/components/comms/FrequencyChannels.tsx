"use client";

import { motion } from "framer-motion";

const channels = [
  { label: "GITHUB", frequency: "142.7 MHz", url: "https://github.com/sam12-4" },
  { label: "LINKEDIN", frequency: "88.3 MHz", url: "https://linkedin.com/in/sameer-hussain-75313023b" },
  { label: "EMAIL", frequency: "67.9 MHz", url: "mailto:sameerh64h@gmail.com" },
  { label: "DINNOVA AG", frequency: "104.1 MHz", url: "https://dinnova.io" },
];

export function FrequencyChannels() {
  return (
    <div className="space-y-2">
      <span className="text-[9px] font-mono text-cyan/40 tracking-[0.2em]">
        FREQUENCY CHANNELS
      </span>
      {channels.map((channel, i) => (
        <motion.a
          key={channel.label}
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2.5 border border-cyan/10 bg-panel/20 hover:border-cyan/30 hover:bg-panel/40 transition-all duration-300 group"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
          whileHover={{ x: 4 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-[9px] font-mono text-text-dim/40">
              FREQ 0{i + 1}
            </span>
            <span className="text-[11px] font-mono text-text group-hover:text-cyan tracking-wider transition-colors">
              {channel.label}
            </span>
          </div>
          <span className="text-[10px] font-mono text-text-dim/40 tabular-nums">
            {channel.frequency}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
