export interface Mission {
  slug: string;
  codename: string;
  status: "COMPLETE" | "ACTIVE" | "CLASSIFIED";
  objective: string;
  description: string;
  techDeployed: string[];
  category: string;
  date: string;
  images: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  coordinates: { x: number; y: number };
}
