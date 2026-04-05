"use client";

export function ScanLineOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Moving scan line */}
      <div
        className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan/20 to-transparent"
        style={{
          animation: "scanline 8s linear infinite",
        }}
      />
      {/* Static scan lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 240, 255, 0.015) 2px, rgba(0, 240, 255, 0.015) 4px)",
        }}
      />
    </div>
  );
}
