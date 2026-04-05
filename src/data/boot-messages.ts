import type { BootMessage } from "@/types";

export const bootMessages: BootMessage[] = [
  { text: "STATION OS v7.2.1", delay: 300, type: "header" },
  { text: "Initializing core systems...", delay: 100, type: "info" },
  { text: "Loading navigation array............. OK", delay: 150, type: "success" },
  { text: "Calibrating sensor grid.............. OK", delay: 200, type: "success" },
  { text: "Establishing comm frequencies........ OK", delay: 180, type: "success" },
  { text: "Mounting holographic display......... OK", delay: 250, type: "success" },
  { text: "Synchronizing mission database....... OK", delay: 160, type: "success" },
  { text: "Activating defense protocols......... OK", delay: 140, type: "success" },
  { text: "WARNING: Unidentified vessel detected in sector 7", delay: 100, type: "warning" },
  { text: "Threat assessment: NONE \u2014 vessel identified as VISITOR", delay: 200, type: "info" },
  { text: "ALL SYSTEMS NOMINAL", delay: 400, type: "header" },
  { text: "Welcome aboard, Operator.", delay: 500, type: "welcome" },
];
