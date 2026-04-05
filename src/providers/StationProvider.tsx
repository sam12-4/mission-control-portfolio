"use client";

import { createContext, useContext, useReducer, type ReactNode } from "react";

interface StationState {
  bootComplete: boolean;
  activeSection: string;
  hudVisible: boolean;
  soundEnabled: boolean;
}

type StationAction =
  | { type: "BOOT_COMPLETE" }
  | { type: "SET_SECTION"; payload: string }
  | { type: "TOGGLE_HUD" }
  | { type: "TOGGLE_SOUND" };

const initialState: StationState = {
  bootComplete: false,
  activeSection: "command",
  hudVisible: true,
  soundEnabled: false,
};

function stationReducer(state: StationState, action: StationAction): StationState {
  switch (action.type) {
    case "BOOT_COMPLETE":
      return { ...state, bootComplete: true };
    case "SET_SECTION":
      return { ...state, activeSection: action.payload };
    case "TOGGLE_HUD":
      return { ...state, hudVisible: !state.hudVisible };
    case "TOGGLE_SOUND":
      return { ...state, soundEnabled: !state.soundEnabled };
    default:
      return state;
  }
}

const StationContext = createContext<{
  state: StationState;
  dispatch: React.Dispatch<StationAction>;
} | null>(null);

export function StationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(stationReducer, initialState);

  return (
    <StationContext.Provider value={{ state, dispatch }}>
      {children}
    </StationContext.Provider>
  );
}

export function useStation() {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error("useStation must be used within a StationProvider");
  }
  return context;
}
