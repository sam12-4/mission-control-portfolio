"use client";

import { useRef, useEffect, useCallback } from "react";
import { missions } from "@/data/missions";
import { COLORS } from "@/lib/constants";
import type { Mission } from "@/types/mission";

interface RadarMapProps {
  onSelectMission: (mission: Mission | null) => void;
  selectedMission: Mission | null;
  filter: string;
}

export function RadarMap({ onSelectMission, selectedMission, filter }: RadarMapProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sweepAngleRef = useRef(0);
  const animationRef = useRef<number>(0);

  const filteredMissions = filter === "all"
    ? missions
    : missions.filter((m) => m.category === filter);

  const draw = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(cx, cy) - 20;

      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = COLORS.void;
      ctx.fillRect(0, 0, width, height);

      // Radar circles
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, (radius / 4) * i, 0, Math.PI * 2);
        ctx.strokeStyle = `${COLORS.cyan}15`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Cross lines
      ctx.beginPath();
      ctx.moveTo(cx - radius, cy);
      ctx.lineTo(cx + radius, cy);
      ctx.moveTo(cx, cy - radius);
      ctx.lineTo(cx, cy + radius);
      ctx.strokeStyle = `${COLORS.cyan}10`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Sweep line
      sweepAngleRef.current += 0.008;
      const sweepX = cx + Math.cos(sweepAngleRef.current) * radius;
      const sweepY = cy + Math.sin(sweepAngleRef.current) * radius;

      // Sweep gradient
      const gradient = ctx.createConicGradient(sweepAngleRef.current, cx, cy);
      gradient.addColorStop(0, `${COLORS.cyan}30`);
      gradient.addColorStop(0.05, `${COLORS.cyan}08`);
      gradient.addColorStop(0.1, "transparent");
      gradient.addColorStop(1, "transparent");

      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fillStyle = gradient;
      ctx.fill();

      // Sweep line itself
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.strokeStyle = `${COLORS.cyan}60`;
      ctx.lineWidth = 1;
      ctx.stroke();

      // Mission nodes
      filteredMissions.forEach((mission) => {
        const mx = cx + (mission.coordinates.x - 0.5) * radius * 1.6;
        const my = cy + (mission.coordinates.y - 0.5) * radius * 1.6;
        const isSelected = selectedMission?.slug === mission.slug;
        const isFeatured = mission.featured;
        const nodeRadius = isFeatured ? 6 : 4;

        // Pulse ring for featured
        if (isFeatured) {
          const pulseRadius = nodeRadius + 4 + Math.sin(Date.now() / 500) * 3;
          ctx.beginPath();
          ctx.arc(mx, my, pulseRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `${COLORS.cyan}30`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // Node
        ctx.beginPath();
        ctx.arc(mx, my, nodeRadius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? COLORS.cyan
          : mission.status === "ACTIVE"
            ? COLORS.amber
            : mission.status === "CLASSIFIED"
              ? COLORS.purple
              : `${COLORS.cyan}80`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(mx, my, nodeRadius + 3, 0, Math.PI * 2);
        const glowGrad = ctx.createRadialGradient(mx, my, nodeRadius, mx, my, nodeRadius + 3);
        glowGrad.addColorStop(0, isSelected ? `${COLORS.cyan}40` : `${COLORS.cyan}15`);
        glowGrad.addColorStop(1, "transparent");
        ctx.fillStyle = glowGrad;
        ctx.fill();

        // Label
        ctx.font = "9px monospace";
        ctx.fillStyle = isSelected ? COLORS.cyan : `${COLORS.text}80`;
        ctx.textAlign = "center";
        ctx.fillText(mission.codename, mx, my - nodeRadius - 6);
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = COLORS.cyan;
      ctx.fill();
    },
    [filteredMissions, selectedMission]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);

    function animate() {
      draw(ctx!, rect.width, rect.height);
      animationRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => cancelAnimationFrame(animationRef.current);
  }, [draw]);

  // Handle click on canvas to select missions
  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(cx, cy) - 20;

    let clicked: Mission | null = null;

    for (const mission of filteredMissions) {
      const mx = cx + (mission.coordinates.x - 0.5) * radius * 1.6;
      const my = cy + (mission.coordinates.y - 0.5) * radius * 1.6;
      const dist = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);

      if (dist < 15) {
        clicked = mission;
        break;
      }
    }

    onSelectMission(clicked);
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full aspect-square max-w-[500px] mx-auto cursor-crosshair"
      onClick={handleClick}
    />
  );
}
