"use client";

import { useEffect, useState, useRef } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export function TypewriterText({
  text,
  speed = 30,
  className = "",
  onComplete,
}: TypewriterTextProps) {
  const [displayed, setDisplayed] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true;
          let i = 0;
          const interval = setInterval(() => {
            if (i < text.length) {
              setDisplayed(text.slice(0, i + 1));
              i++;
            } else {
              clearInterval(interval);
              onComplete?.();
            }
          }, speed);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [text, speed, onComplete]);

  return (
    <div ref={ref} className={className}>
      <span>{displayed}</span>
      {displayed.length < text.length && (
        <span
          className="inline-block w-[2px] h-[1em] bg-cyan ml-0.5 align-middle"
          style={{ animation: "blink 1s step-end infinite" }}
        />
      )}
    </div>
  );
}
