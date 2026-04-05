"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommandInput } from "./CommandInput";
import { HudButton } from "@/components/ui/HudButton";

type FormStatus = "idle" | "sending" | "sent" | "error";

export function TransmissionForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");

    // Simulate send — replace with actual API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setStatus("sent");

    setTimeout(() => {
      setStatus("idle");
      setForm({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CommandInput
        label="CALLSIGN"
        name="name"
        value={form.name}
        onChange={(v) => setForm({ ...form, name: v })}
        required
      />
      <CommandInput
        label="FREQUENCY"
        name="email"
        type="email"
        value={form.email}
        onChange={(v) => setForm({ ...form, email: v })}
        required
      />
      <CommandInput
        label="TRANSMISSION TYPE"
        name="subject"
        value={form.subject}
        onChange={(v) => setForm({ ...form, subject: v })}
        required
      />
      <CommandInput
        label="PAYLOAD"
        name="message"
        type="textarea"
        value={form.message}
        onChange={(v) => setForm({ ...form, message: v })}
        required
      />

      <div className="pt-2">
        <AnimatePresence mode="wait">
          {status === "idle" && (
            <motion.div
              key="submit"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HudButton variant="primary" onClick={() => {}}>
                TRANSMIT
              </HudButton>
            </motion.div>
          )}

          {status === "sending" && (
            <motion.div
              key="sending"
              className="flex items-center gap-3 px-4 py-3 border border-amber/30 bg-amber/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div
                className="w-2 h-2 bg-amber rounded-full"
                style={{ animation: "pulse-glow 0.5s ease-in-out infinite" }}
              />
              <span className="text-[11px] font-mono text-amber tracking-wider">
                ENCRYPTING PAYLOAD... TRANSMITTING...
              </span>
            </motion.div>
          )}

          {status === "sent" && (
            <motion.div
              key="sent"
              className="flex items-center gap-3 px-4 py-3 border border-green/30 bg-green/5"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-2 h-2 bg-green rounded-full" />
              <span className="text-[11px] font-mono text-green tracking-wider">
                TRANSMISSION SENT — AWAITING RESPONSE
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
