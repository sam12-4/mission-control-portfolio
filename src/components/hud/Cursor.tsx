"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function Cursor() {
  const [visible, setVisible] = useState(false);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  // Trailing glow follows with spring physics
  const trailX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.5 });
  const trailY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.5 });

  const rafRef = useRef<number>(0);

  useEffect(() => {
    // Only on desktop with hover capability
    const hasHover = window.matchMedia("(hover: hover)").matches;
    if (!hasHover) return;

    function onMouseMove(e: MouseEvent) {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function onMouseDown() { setClicking(true); }
    function onMouseUp() { setClicking(false); }
    function onMouseLeave() { setVisible(false); }
    function onMouseEnter() { setVisible(true); }

    // Detect hovering over interactive elements
    function onMouseOver(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const interactive = target.closest("a, button, [role='button'], input, textarea, select, [data-cursor='pointer']");
      setHovering(!!interactive);
    }

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);
    document.addEventListener("mouseover", onMouseOver);

    // Hide default cursor
    document.documentElement.style.cursor = "none";

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.style.cursor = "";
      cancelAnimationFrame(rafRef.current);
    };
  }, [cursorX, cursorY, visible]);

  if (!visible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]">
      {/* Trailing glow */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          width: hovering ? 48 : 32,
          height: hovering ? 48 : 32,
          background: "radial-gradient(circle, rgba(0,240,255,0.12) 0%, transparent 70%)",
          transition: "width 0.2s, height 0.2s",
        }}
      />

      {/* Crosshair - main cursor */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2"
        style={{ x: cursorX, y: cursorY }}
        animate={{ scale: clicking ? 0.8 : hovering ? 1.4 : 1 }}
        transition={{ duration: 0.15 }}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          {/* Center dot */}
          <circle
            cx="12" cy="12" r={hovering ? 3 : 1.5}
            fill="#00f0ff"
            opacity={clicking ? 1 : 0.9}
            style={{ transition: "r 0.2s" }}
          />

          {/* Top line */}
          <line x1="12" y1="1" x2="12" y2="7" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
          {/* Bottom line */}
          <line x1="12" y1="17" x2="12" y2="23" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
          {/* Left line */}
          <line x1="1" y1="12" x2="7" y2="12" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />
          {/* Right line */}
          <line x1="17" y1="12" x2="23" y2="12" stroke="#00f0ff" strokeWidth="1" opacity="0.6" />

          {/* Corner brackets */}
          {/* Top-left */}
          <path d="M4 4 L4 7 M4 4 L7 4" stroke="#00f0ff" strokeWidth="0.8" opacity="0.3" />
          {/* Top-right */}
          <path d="M20 4 L20 7 M20 4 L17 4" stroke="#00f0ff" strokeWidth="0.8" opacity="0.3" />
          {/* Bottom-left */}
          <path d="M4 20 L4 17 M4 20 L7 20" stroke="#00f0ff" strokeWidth="0.8" opacity="0.3" />
          {/* Bottom-right */}
          <path d="M20 20 L20 17 M20 20 L17 20" stroke="#00f0ff" strokeWidth="0.8" opacity="0.3" />
        </svg>
      </motion.div>

      {/* Outer ring on hover */}
      {hovering && (
        <motion.div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/30"
          style={{ x: cursorX, y: cursorY }}
          initial={{ width: 16, height: 16, opacity: 0 }}
          animate={{ width: 40, height: 40, opacity: 1 }}
          transition={{ duration: 0.2 }}
        />
      )}
    </div>
  );
}
