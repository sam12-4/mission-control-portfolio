"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, type ReactNode } from "react";
import { AdaptiveDpr, AdaptiveEvents, Preload } from "@react-three/drei";

interface SceneContainerProps {
  children: ReactNode;
  className?: string;
}

export function SceneContainer({ children, className = "" }: SceneContainerProps) {
  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.1} />
          <pointLight position={[5, 5, 5]} intensity={0.3} color="#00f0ff" />
          <pointLight position={[-5, -5, -5]} intensity={0.15} color="#7b5ea7" />
          {children}
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
