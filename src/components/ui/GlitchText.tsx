"use client";

import { useEffect, useState, useRef } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "span" | "p";
  glitchInterval?: number;
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`01";

export function GlitchText({
  text,
  className = "",
  as: Tag = "span",
  glitchInterval = 4000,
}: GlitchTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function glitch() {
      const chars = text.split("");
      const glitchCount = Math.floor(Math.random() * 3) + 1;
      const positions = new Set<number>();

      while (positions.size < glitchCount) {
        positions.add(Math.floor(Math.random() * chars.length));
      }

      const glitched = chars.map((char, i) =>
        positions.has(i)
          ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          : char
      );

      setDisplayText(glitched.join(""));

      setTimeout(() => setDisplayText(text), 100);
    }

    const interval = setInterval(glitch, glitchInterval);
    timeoutRef.current = interval;

    return () => clearInterval(interval);
  }, [text, glitchInterval]);

  return <Tag className={className}>{displayText}</Tag>;
}
