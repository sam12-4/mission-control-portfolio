"use client";

import { Bloom, ChromaticAberration, EffectComposer, Scanline } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Vector2 } from "three";

export function PostEffects() {
  return (
    <EffectComposer>
      <Bloom
        luminanceThreshold={0.4}
        luminanceSmoothing={0.9}
        intensity={0.8}
        blendFunction={BlendFunction.ADD}
      />
      <ChromaticAberration
        offset={new Vector2(0.0008, 0.0008)}
        radialModulation={false}
        modulationOffset={0}
      />
      <Scanline
        blendFunction={BlendFunction.OVERLAY}
        density={1.2}
        opacity={0.08}
      />
    </EffectComposer>
  );
}
