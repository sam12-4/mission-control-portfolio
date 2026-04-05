"use client";

import { useSound } from "@/hooks/useSound";

export function MuteToggle() {
  const { muted, toggleMute, play } = useSound();

  function handleClick() {
    toggleMute();
    if (muted) {
      // Was muted, now unmuted — play a confirmation beep
      setTimeout(() => play("select"), 50);
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`p-1 transition-colors ${
        muted ? "text-text-dim/40" : "text-cyan"
      }`}
      aria-label={muted ? "Unmute sounds" : "Mute sounds"}
      title={muted ? "Unmute sounds" : "Mute sounds"}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        {/* Speaker body */}
        <path d="M11 5L6 9H2v6h4l5 4V5z" />
        {muted ? (
          /* X mark when muted */
          <>
            <line x1="23" y1="9" x2="17" y2="15" />
            <line x1="17" y1="9" x2="23" y2="15" />
          </>
        ) : (
          /* Sound waves when active */
          <>
            <path d="M15.54 8.46a5 5 0 010 7.07" />
            <path d="M19.07 4.93a10 10 0 010 14.14" opacity="0.5" />
          </>
        )}
      </svg>
    </button>
  );
}
