export const COLORS = {
  void: "#0a0a14",
  deepSpace: "#0d1117",
  navy: "#131a2b",
  panel: "#1a2332",
  panelLight: "#243044",
  cyan: "#00f0ff",
  cyanDim: "#00f0ff80",
  cyanGlow: "#00f0ff33",
  amber: "#ffb800",
  amberDim: "#ffb80080",
  purple: "#7b5ea7",
  nebula: "#3d1f5c",
  green: "#00ff88",
  red: "#ff3355",
  text: "#c8d6e5",
  textDim: "#5a6e82",
} as const;

export const STATION = {
  name: "MISSION CONTROL",
  designation: "SS-SAMEER-7",
  sector: "SECTOR 7-G",
  status: "OPERATIONAL",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;

export const PARTICLE_COUNTS = {
  desktop: 5000,
  tablet: 2000,
  mobile: 800,
} as const;
