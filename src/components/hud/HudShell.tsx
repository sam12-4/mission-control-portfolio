"use client";

import { type ReactNode } from "react";
import { TopBar } from "./TopBar";
import { Navigation } from "./Navigation";
import { ScanLineOverlay } from "./ScanLineOverlay";
import { GridOverlay } from "./GridOverlay";
import { CornerElements } from "./CornerElements";
import { useStation } from "@/providers/StationProvider";

interface HudShellProps {
  children: ReactNode;
}

export function HudShell({ children }: HudShellProps) {
  const { state } = useStation();

  if (!state.bootComplete) {
    return <>{children}</>;
  }

  return (
    <>
      <TopBar />
      <Navigation />
      <CornerElements />
      <ScanLineOverlay />
      <GridOverlay />
      <main className="relative z-10 pt-10 lg:pl-48">
        {children}
      </main>
    </>
  );
}
