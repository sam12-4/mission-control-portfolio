"use client";

import { useEffect, useRef, useState } from "react";
import { systems } from "@/data/systems";
import { COLORS } from "@/lib/constants";

interface Line {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export function CircuitLines() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    function calculateLines() {
      const newLines: Line[] = [];
      const seen = new Set<string>();

      systems.forEach((system) => {
        const sourceEl = document.querySelector(`[data-system-id="${system.id}"]`);
        if (!sourceEl) return;

        system.connections.forEach((targetId) => {
          const key = [system.id, targetId].sort().join("-");
          if (seen.has(key)) return;
          seen.add(key);

          const targetEl = document.querySelector(`[data-system-id="${targetId}"]`);
          if (!targetEl) return;

          const sourceRect = sourceEl.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          const svgRect = svgRef.current?.getBoundingClientRect();
          if (!svgRect) return;

          newLines.push({
            x1: sourceRect.left + sourceRect.width / 2 - svgRect.left,
            y1: sourceRect.top + sourceRect.height / 2 - svgRect.top,
            x2: targetRect.left + targetRect.width / 2 - svgRect.left,
            y2: targetRect.top + targetRect.height / 2 - svgRect.top,
          });
        });
      });

      setLines(newLines);
    }

    // Delay to let DOM settle
    const timer = setTimeout(calculateLines, 500);
    window.addEventListener("resize", calculateLines);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateLines);
    };
  }, []);

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    >
      {lines.map((line, i) => (
        <line
          key={i}
          x1={line.x1}
          y1={line.y1}
          x2={line.x2}
          y2={line.y2}
          stroke={COLORS.cyan}
          strokeWidth="0.5"
          strokeOpacity="0.15"
          strokeDasharray="4 4"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="8"
            to="0"
            dur="1s"
            repeatCount="indefinite"
          />
        </line>
      ))}
    </svg>
  );
}
