export type { Profile, Stat } from "./profile";
export type { Mission } from "./mission";
export type { TechSystem } from "./system";

export interface BootMessage {
  text: string;
  delay: number;
  type: "header" | "info" | "success" | "warning" | "error" | "welcome";
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}
