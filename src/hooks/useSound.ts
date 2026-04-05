"use client";

import { useCallback, useSyncExternalStore } from "react";
import { audioEngine, type SoundName } from "@/lib/audio-engine";

// Simple external store for mute state
const listeners = new Set<() => void>();
function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function useSound() {
  const muted = useSyncExternalStore(
    subscribe,
    () => audioEngine.isMuted(),
    () => true // SSR default: muted
  );

  const play = useCallback((sound: SoundName) => {
    audioEngine.play(sound);
  }, []);

  const toggleMute = useCallback(() => {
    audioEngine.toggleMute();
    listeners.forEach((cb) => cb());
  }, []);

  const startAmbient = useCallback(() => {
    audioEngine.startAmbient();
  }, []);

  const stopAmbient = useCallback(() => {
    audioEngine.stopAmbient();
  }, []);

  return { play, muted, toggleMute, startAmbient, stopAmbient };
}
