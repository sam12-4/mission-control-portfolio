export type SoundName =
  | "bootBeep"
  | "bootComplete"
  | "navClick"
  | "hover"
  | "panelOpen"
  | "panelClose"
  | "radarPing"
  | "select"
  | "transmit"
  | "success";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private muted: boolean = false;
  private bootPitch = 0;
  private ambientNodes: (OscillatorNode | AudioBufferSourceNode)[] = [];
  private ambientGains: GainNode[] = [];
  private ambientRunning = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.muted = localStorage.getItem("mc-sound-muted") === "true";

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.muted = true;
      }
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
    return this.ctx;
  }

  isMuted(): boolean {
    return this.muted;
  }

  toggleMute(): boolean {
    this.muted = !this.muted;
    if (typeof window !== "undefined") {
      localStorage.setItem("mc-sound-muted", String(this.muted));
    }
    if (this.muted) {
      this.stopAmbient();
    }
    return this.muted;
  }

  play(sound: SoundName): void {
    if (this.muted) return;

    try {
      switch (sound) {
        case "bootBeep":
          this.playBootBeep();
          break;
        case "bootComplete":
          this.playBootComplete();
          break;
        case "navClick":
          this.playTone(1200, 0.06, "square", 0.08);
          break;
        case "hover":
          this.playTone(600, 0.03, "sine", 0.04);
          break;
        case "select":
          this.playTone(1000, 0.05, "square", 0.08);
          break;
        case "radarPing":
          this.playRadarPing();
          break;
        case "panelOpen":
          this.playSweep(400, 900, 0.2, "sawtooth", 0.06);
          break;
        case "panelClose":
          this.playSweep(900, 400, 0.15, "sawtooth", 0.06);
          break;
        case "transmit":
          this.playSweep(400, 2000, 0.25, "square", 0.07);
          break;
        case "success":
          this.playSuccess();
          break;
      }
    } catch {
      // Silently fail — audio should never break the app
    }
  }

  private playTone(
    freq: number,
    duration: number,
    type: OscillatorType,
    volume: number
  ): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration);
  }

  private playSweep(
    startFreq: number,
    endFreq: number,
    duration: number,
    type: OscillatorType,
    volume: number
  ): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(startFreq, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(endFreq, ctx.currentTime + duration);
    gain.gain.setValueAtTime(volume, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + duration + 0.01);
  }

  private playBootBeep(): void {
    // Ascending pitch with each boot message
    const freq = 600 + this.bootPitch * 80;
    this.bootPitch++;
    this.playTone(freq, 0.08, "square", 0.07);
  }

  private playRadarPing(): void {
    const ctx = this.getContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(1800, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.15);
  }

  private playBootComplete(): void {
    const ctx = this.getContext();

    // Two-tone ascending chime
    [600, 1000, 1400].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.12;

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.2);
    });
  }

  private playSuccess(): void {
    const ctx = this.getContext();

    // Two-tone success chime
    [800, 1200].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + i * 0.15;

      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.1, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.15);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.15);
    });
  }

  resetBootPitch(): void {
    this.bootPitch = 0;
  }

  startAmbient(): void {
    if (this.ambientRunning || this.muted) return;

    try {
      const ctx = this.getContext();
      this.ambientRunning = true;

      const fadeTime = 3;

      // Layer 1: Engine drone (60Hz sine)
      const drone = ctx.createOscillator();
      const droneGain = ctx.createGain();
      drone.type = "sine";
      drone.frequency.value = 60;
      droneGain.gain.setValueAtTime(0, ctx.currentTime);
      droneGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + fadeTime);
      drone.connect(droneGain);
      droneGain.connect(ctx.destination);
      drone.start();
      this.ambientNodes.push(drone);
      this.ambientGains.push(droneGain);

      // Layer 2: Detuned harmonic (60.7Hz — creates slow beating)
      const detuned = ctx.createOscillator();
      const detunedGain = ctx.createGain();
      detuned.type = "sine";
      detuned.frequency.value = 60.7;
      detunedGain.gain.setValueAtTime(0, ctx.currentTime);
      detunedGain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + fadeTime);
      detuned.connect(detunedGain);
      detunedGain.connect(ctx.destination);
      detuned.start();
      this.ambientNodes.push(detuned);
      this.ambientGains.push(detunedGain);

      // Layer 3: Hull resonance (120Hz triangle)
      const hull = ctx.createOscillator();
      const hullGain = ctx.createGain();
      hull.type = "triangle";
      hull.frequency.value = 120;
      hullGain.gain.setValueAtTime(0, ctx.currentTime);
      hullGain.gain.linearRampToValueAtTime(0.015, ctx.currentTime + fadeTime);
      hull.connect(hullGain);
      hullGain.connect(ctx.destination);
      hull.start();
      this.ambientNodes.push(hull);
      this.ambientGains.push(hullGain);

      // Layer 4: Air ventilation (filtered white noise)
      const noiseBuffer = this.createNoiseBuffer(ctx);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 800;
      noiseFilter.Q.value = 0.5;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.008, ctx.currentTime + fadeTime);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start();
      this.ambientNodes.push(noise);
      this.ambientGains.push(noiseGain);
    } catch {
      this.ambientRunning = false;
    }
  }

  stopAmbient(): void {
    if (!this.ambientRunning) return;

    const ctx = this.ctx;
    if (!ctx) return;

    // Fade out over 1 second
    this.ambientGains.forEach((gain) => {
      try {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      } catch {
        // Node may already be disconnected
      }
    });

    // Stop and disconnect after fade
    setTimeout(() => {
      this.ambientNodes.forEach((node) => {
        try { node.stop(); } catch { /* already stopped */ }
        try { node.disconnect(); } catch { /* already disconnected */ }
      });
      this.ambientGains.forEach((gain) => {
        try { gain.disconnect(); } catch { /* already disconnected */ }
      });
      this.ambientNodes = [];
      this.ambientGains = [];
      this.ambientRunning = false;
    }, 1100);
  }

  private createNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 2; // 2 seconds
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }
}

export const audioEngine = new AudioEngine();
