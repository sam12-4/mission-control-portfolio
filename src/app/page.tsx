"use client";

import { BootSequence } from "@/components/boot/BootSequence";
import { HeroSection } from "@/components/command-center/HeroSection";
import { StationOverview } from "@/components/command-center/StationOverview";
import { useStation } from "@/providers/StationProvider";

export default function Home() {
  const { state } = useStation();

  return (
    <>
      {!state.bootComplete && <BootSequence />}
      {state.bootComplete && (
        <>
          <HeroSection />
          <StationOverview />
        </>
      )}
    </>
  );
}
