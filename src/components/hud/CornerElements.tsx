"use client";

export function CornerElements() {
  return (
    <div className="pointer-events-none fixed inset-0 z-30 hidden md:block">
      {/* Top-left corner */}
      <div className="absolute top-12 left-2">
        <Corner position="top-left" />
      </div>
      {/* Top-right corner */}
      <div className="absolute top-12 right-2">
        <Corner position="top-right" />
      </div>
      {/* Bottom-left corner */}
      <div className="absolute bottom-2 left-2">
        <Corner position="bottom-left" />
      </div>
      {/* Bottom-right corner */}
      <div className="absolute bottom-2 right-2">
        <Corner position="bottom-right" />
      </div>
    </div>
  );
}

function Corner({ position }: { position: "top-left" | "top-right" | "bottom-left" | "bottom-right" }) {
  const size = 20;
  const isTop = position.includes("top");
  const isLeft = position.includes("left");

  return (
    <svg width={size} height={size} className="text-cyan/30">
      {/* Horizontal line */}
      <line
        x1={isLeft ? 0 : size}
        y1={isTop ? 0 : size}
        x2={isLeft ? size : 0}
        y2={isTop ? 0 : size}
        stroke="currentColor"
        strokeWidth="1"
      />
      {/* Vertical line */}
      <line
        x1={isLeft ? 0 : size}
        y1={isTop ? 0 : size}
        x2={isLeft ? 0 : size}
        y2={isTop ? size : 0}
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
