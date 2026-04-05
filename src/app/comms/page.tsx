"use client";

import { motion } from "framer-motion";
import { TransmissionForm } from "@/components/comms/TransmissionForm";
import { FrequencyChannels } from "@/components/comms/FrequencyChannels";
import { DataPanel } from "@/components/ui/DataPanel";

export default function CommsPage() {
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
          <span className="text-[10px] font-mono text-green tracking-[0.3em]">
            CHANNEL OPEN
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-display text-cyan tracking-[0.1em] text-glow-cyan">
          OPEN COMMS
        </h1>
        <p className="text-[11px] font-mono text-text-dim mt-2 tracking-wider">
          ESTABLISH A DIRECT COMMUNICATION LINK
        </p>
      </motion.div>

      <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Form */}
        <motion.div
          className="lg:col-span-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <DataPanel title="NEW TRANSMISSION">
            <TransmissionForm />
          </DataPanel>
        </motion.div>

        {/* Channels */}
        <motion.div
          className="lg:col-span-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <DataPanel title="QUICK CHANNELS">
            <FrequencyChannels />
          </DataPanel>
        </motion.div>
      </div>
    </div>
  );
}
