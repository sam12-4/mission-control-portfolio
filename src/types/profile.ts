export interface Stat {
  label: string;
  value: number;
}

export interface Profile {
  name: string;
  callsign: string;
  title: string;
  stationDesignation: string;
  coordinates: string;
  bio: string;
  stats: Stat[];
  profileImage: string;
  resumeUrl: string;
}
