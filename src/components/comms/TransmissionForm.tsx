"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommandInput } from "./CommandInput";
import { HudButton } from "@/components/ui/HudButton";
import { audioEngine } from "@/lib/audio-engine";

type FormStatus = "idle" | "sending" | "sent" | "error";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

export function TransmissionForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!ACCESS_KEY) {
      console.error("Missing NEXT_PUBLIC_WEB3FORMS_KEY — contact form cannot send.");
      setStatus("error");
      audioEngine.play("error");
      setTimeout(() => setStatus("idle"), 5000);
      return;
    }

    // Honeypot: bots fill hidden fields; humans never see them.
    const botField = (
      e.currentTarget.elements.namedItem("botcheck") as HTMLInputElement | null
    )?.checked;
    if (botField) return;

    setStatus("sending");
    audioEngine.play("transmit");

    try {
      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          name: form.name,
          email: form.email,
          subject: `[Portfolio] ${form.subject}`,
          message: form.message,
          from_name: "Mission Control Portfolio",
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Transmission failed");
      }

      setStatus("sent");
      audioEngine.play("success");

      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", subject: "", message: "" });
      }, 4000);
    } catch (err) {
      console.error("Contact form submission failed:", err);
      setStatus("error");
      audioEngine.play("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from humans, catches bots. Do not remove. */}
      <input
        type="checkbox"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />
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

          {status === "error" && (
            <motion.button
              key="error"
              type="submit"
              className="flex w-full items-center gap-3 px-4 py-3 border border-red/40 bg-red/5 text-left hover:bg-red/10 transition-colors"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="w-2 h-2 bg-red rounded-full" />
              <span className="text-[11px] font-mono text-red tracking-wider">
                TRANSMISSION FAILED — SIGNAL LOST. RETRY?
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
