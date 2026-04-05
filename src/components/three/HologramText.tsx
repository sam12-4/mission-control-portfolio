"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Float } from "@react-three/drei";
import * as THREE from "three";

interface HologramTextProps {
  text: string;
  subtitle?: string;
  position?: [number, number, number];
}

export function HologramText({
  text,
  subtitle,
  position = [0, 0, 0],
}: HologramTextProps) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    if (!materialRef.current) return;
    // Subtle flicker effect
    const flicker = Math.sin(state.clock.elapsedTime * 50) > 0.95 ? 0.5 : 1;
    materialRef.current.opacity = 0.85 * flicker;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position}>
        {/* Main name text */}
        <Text
          font="/fonts/Orbitron-Bold.woff"
          fontSize={0.5}
          letterSpacing={0.15}
          textAlign="center"
          anchorX="center"
          anchorY="middle"
          maxWidth={8}
        >
          {text}
          <meshStandardMaterial
            ref={materialRef}
            color="#00f0ff"
            emissive="#00f0ff"
            emissiveIntensity={0.5}
            transparent
            opacity={0.85}
            side={THREE.DoubleSide}
          />
        </Text>

        {/* Subtitle */}
        {subtitle && (
          <Text
            position={[0, -0.5, 0]}
            font="/fonts/JetBrainsMono-Regular.woff"
            fontSize={0.15}
            letterSpacing={0.3}
            textAlign="center"
            anchorX="center"
            anchorY="middle"
          >
            {subtitle}
            <meshStandardMaterial
              color="#c8d6e5"
              emissive="#c8d6e5"
              emissiveIntensity={0.2}
              transparent
              opacity={0.6}
            />
          </Text>
        )}

        {/* Horizontal scan line across text */}
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[6, 0.02]} />
          <meshBasicMaterial
            color="#00f0ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </Float>
  );
}
