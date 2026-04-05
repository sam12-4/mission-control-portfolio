export interface TechSystem {
  id: string;
  name: string;
  category: "framework" | "language" | "tool" | "database" | "cloud";
  level: number;
  status: "ONLINE" | "STANDBY" | "TRAINING";
  icon: string;
  description: string;
  connections: string[];
}
