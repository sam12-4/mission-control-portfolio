import type { Profile } from "@/types/profile";

export const profile: Profile = {
  name: "Sameer Hussain",
  callsign: "COMMANDER",
  title: "Full Stack Developer",
  stationDesignation: "SS-SAMEER-7",
  coordinates: "24.8607\u00b0 N, 67.0011\u00b0 E",
  bio: "Full Stack Developer at Dinnova AG (Switzerland) building enterprise-grade SaaS platforms, and freelance engineer for SiteBuilder360 (Canada) delivering e-commerce and marketplace solutions. Specialized in React, Next.js, Vue.js, Node.js, and Python across web, mobile, AI/ML, and blockchain domains. From architecting real-time dashboards to training ML models and programming IoT robots \u2014 I build systems that push boundaries.",
  stats: [
    { label: "MISSIONS COMPLETED", value: 30 },
    { label: "SYSTEMS MASTERED", value: 16 },
    { label: "YEARS ACTIVE", value: 4 },
    { label: "REPOS DEPLOYED", value: 34 },
  ],
  profileImage: "/images/profile.jpg",
  resumeUrl: "/resume.pdf",
};
