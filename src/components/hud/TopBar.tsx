"use client";

import { useEffect, useState } from "react";
import { StatusIndicator } from "./StatusIndicator";
import { MuteToggle } from "./MuteToggle";
import { STATION } from "@/lib/constants";

export function TopBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    function updateTime() {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 h-10 flex items-center justify-between px-4 md:px-6 bg-deep-space/80 backdrop-blur-sm border-b border-cyan/20">
      {/* Left section */}
      <div className="flex items-center gap-3">
        <StatusIndicator status="online" />
        <span className="text-cyan text-xs font-display tracking-[0.2em] hidden sm:inline">
          {STATION.name}
        </span>
        <span className="text-text-dim text-[10px] font-mono hidden md:inline">
          {STATION.designation}
        </span>
      </div>

      {/* Center section */}
      <div className="flex items-center gap-4">
        <span className="text-text-dim text-[10px] font-mono hidden lg:inline">
          {STATION.sector}
        </span>
        <span className="text-cyan/60 text-[10px] font-mono hidden sm:inline">|</span>
        <span className="text-text-dim text-[10px] font-mono">
          STATUS: <span className="text-green">{STATION.status}</span>
        </span>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-3 pr-10 lg:pr-0">
        <MuteToggle />
        <span className="text-amber text-[10px] font-mono hidden sm:inline">
          SYS.TIME
        </span>
        <span className="text-cyan text-xs font-mono tabular-nums">{time}</span>
      </div>
    </header>
  );
}
