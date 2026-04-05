"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { bootMessages } from "@/data/boot-messages";
import { TerminalLine } from "./TerminalLine";
import { ProgressBar } from "./ProgressBar";
import { useStation } from "@/providers/StationProvider";

export function BootSequence() {
  const { dispatch } = useStation();
  const [visibleLines, setVisibleLines] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [phase, setPhase] = useState<"booting" | "completing" | "done">("booting");

  const completeBoot = useCallback(() => {
    setPhase("completing");
    setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("bootComplete", "true");
      setTimeout(() => {
        dispatch({ type: "BOOT_COMPLETE" });
      }, 600);
    }, 800);
  }, [dispatch]);

  // Check if already booted this session
  useEffect(() => {
    if (sessionStorage.getItem("bootComplete") === "true") {
      dispatch({ type: "BOOT_COMPLETE" });
      return;
    }

    // Show lines sequentially
    const lineTimers: NodeJS.Timeout[] = [];
    let cumulativeDelay = 500; // Initial delay

    // Show progress bar after a few lines
    lineTimers.push(
      setTimeout(() => setShowProgress(true), 800)
    );

    bootMessages.forEach((msg, i) => {
      cumulativeDelay += msg.delay + 100;
      lineTimers.push(
        setTimeout(() => setVisibleLines(i + 1), cumulativeDelay)
      );
    });

    // Complete boot after all lines
    cumulativeDelay += 600;
    lineTimers.push(setTimeout(completeBoot, cumulativeDelay));

    return () => lineTimers.forEach(clearTimeout);
  }, [dispatch, completeBoot]);

  // Skip on click or keypress
  useEffect(() => {
    function handleSkip() {
      completeBoot();
    }

    window.addEventListener("keydown", handleSkip);
    return () => window.removeEventListener("keydown", handleSkip);
  }, [completeBoot]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          className="fixed inset-0 z-[100] bg-void flex items-center justify-center"
          exit={{ opacity: 0, filter: "brightness(3)" }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
        >
          {/* CRT screen effect */}
          <div className="absolute inset-0 bg-noise opacity-30" />

          {/* Vignette */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,20,0.8) 100%)",
            }}
          />

          {/* Terminal content */}
          <div className="relative w-full max-w-xl mx-auto px-8">
            {/* Terminal header */}
            <div className="mb-6 pb-2 border-b border-cyan/20">
              <span className="text-[10px] font-mono text-cyan/40 tracking-[0.3em]">
                STATION TERMINAL v7.2.1
              </span>
            </div>

            {/* Boot messages */}
            <div className="space-y-1 min-h-[200px]">
              {bootMessages.slice(0, visibleLines).map((msg, i) => (
                <TerminalLine key={i} message={msg} index={0} />
              ))}
            </div>

            {/* Progress bar */}
            {showProgress && visibleLines >= 2 && (
              <ProgressBar delay={0.2} duration={2} />
            )}

            {/* Blinking cursor */}
            {phase === "booting" && (
              <motion.span
                className="inline-block w-2 h-4 bg-cyan/80 mt-2"
                style={{ animation: "blink 1s step-end infinite" }}
              />
            )}

            {/* Skip hint */}
            <motion.div
              className="absolute bottom-[-60px] left-0 right-0 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 2 }}
            >
              <span className="text-[10px] font-mono text-text-dim tracking-wider">
                PRESS ANY KEY TO SKIP
              </span>
            </motion.div>
          </div>

          {/* Completing flash */}
          {phase === "completing" && (
            <motion.div
              className="absolute inset-0 bg-cyan/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 0.8 }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
