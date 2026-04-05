"use client";

import { useParams } from "next/navigation";
import { missions } from "@/data/missions";
import { MissionBrief } from "@/components/missions/MissionBrief";
import { useRouter } from "next/navigation";

export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const mission = missions.find((m) => m.slug === params.slug);

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-display text-red tracking-[0.1em]">
            MISSION NOT FOUND
          </h1>
          <p className="text-[11px] font-mono text-text-dim mt-2">
            No records match this designation
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <MissionBrief mission={mission} onClose={() => router.push("/missions")} />
      </div>
    </div>
  );
}
