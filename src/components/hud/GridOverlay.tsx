"use client";

export function GridOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        backgroundImage: `
          linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
        animation: "grid-fade 4s ease-in-out infinite",
      }}
    />
  );
}
