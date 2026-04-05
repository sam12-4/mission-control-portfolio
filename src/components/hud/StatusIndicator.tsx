"use client";

interface StatusIndicatorProps {
  status?: "online" | "standby" | "offline";
  size?: "sm" | "md";
}

export function StatusIndicator({ status = "online", size = "sm" }: StatusIndicatorProps) {
  const colorMap = {
    online: "bg-green shadow-[0_0_6px_rgba(0,255,136,0.6)]",
    standby: "bg-amber shadow-[0_0_6px_rgba(255,184,0,0.6)]",
    offline: "bg-red shadow-[0_0_6px_rgba(255,51,85,0.6)]",
  };

  const sizeMap = {
    sm: "w-2 h-2",
    md: "w-3 h-3",
  };

  return (
    <span
      className={`inline-block rounded-full ${colorMap[status]} ${sizeMap[size]}`}
      style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
    />
  );
}
