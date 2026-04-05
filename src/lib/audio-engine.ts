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

  private ambientPending = false;

  constructor() {
    if (typeof window !== "undefined") {
      this.muted = localStorage.getItem("mc-sound-muted") === "true";

      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        this.muted = true;
      }

      // Listen for first user interaction to unlock audio and start pending ambient
      const unlockAudio = () => {
        if (this.ambientPending && !this.ambientRunning) {
          this.startAmbient();
        }
        document.removeEventListener("click", unlockAudio);
        document.removeEventListener("keydown", unlockAudio);
        document.removeEventListener("touchstart", unlockAudio);
      };
      document.addEventListener("click", unlockAudio);
      document.addEventListener("keydown", unlockAudio);
      document.addEventListener("touchstart", unlockAudio);
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
    // Mute toggle only controls ambient background sound
    if (this.muted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
    }
    return this.muted;
  }

  play(sound: SoundName): void {

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

    // If ambient was pending and context is now active, start it
    if (this.ambientPending && !this.ambientRunning && !this.muted) {
      this.ambientPending = false;
      this.startAmbient();
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

    // Mark as pending — will start once AudioContext is active
    this.ambientPending = true;

    // Check if context is ready
    try {
      const ctx = this.getContext();
      if (ctx.state === "suspended") return; // Will start via unlock listener or play()
    } catch {
      return;
    }

    this.ambientPending = false;

    try {
      const ctx = this.getContext();
      this.ambientRunning = true;

      const fadeTime = 4;

      // Layer 1: Ethereal pad — warm shimmer like holographic displays
      const pad1 = ctx.createOscillator();
      const pad1Gain = ctx.createGain();
      pad1.type = "sine";
      pad1.frequency.value = 174; // F3 — warm, not bassy
      pad1Gain.gain.setValueAtTime(0, ctx.currentTime);
      pad1Gain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + fadeTime);
      pad1.connect(pad1Gain);
      pad1Gain.connect(ctx.destination);
      pad1.start();
      this.ambientNodes.push(pad1);
      this.ambientGains.push(pad1Gain);

      // Layer 2: Slight detune of pad — creates slow dreamy shimmer
      const pad2 = ctx.createOscillator();
      const pad2Gain = ctx.createGain();
      pad2.type = "sine";
      pad2.frequency.value = 174.8;
      pad2Gain.gain.setValueAtTime(0, ctx.currentTime);
      pad2Gain.gain.linearRampToValueAtTime(0.012, ctx.currentTime + fadeTime);
      pad2.connect(pad2Gain);
      pad2Gain.connect(ctx.destination);
      pad2.start();
      this.ambientNodes.push(pad2);
      this.ambientGains.push(pad2Gain);

      // Layer 3: High crystalline tone — like distant data streams
      const crystal = ctx.createOscillator();
      const crystalGain = ctx.createGain();
      crystal.type = "sine";
      crystal.frequency.value = 523; // C5 — bright, airy
      crystalGain.gain.setValueAtTime(0, ctx.currentTime);
      crystalGain.gain.linearRampToValueAtTime(0.004, ctx.currentTime + fadeTime);
      crystal.connect(crystalGain);
      crystalGain.connect(ctx.destination);
      crystal.start();
      this.ambientNodes.push(crystal);
      this.ambientGains.push(crystalGain);

      // Layer 4: Soft high-pass filtered noise — gentle air circulation
      const noiseBuffer = this.createNoiseBuffer(ctx);
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "highpass";
      noiseFilter.frequency.value = 2000;
      noiseFilter.Q.value = 0.3;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0, ctx.currentTime);
      noiseGain.gain.linearRampToValueAtTime(0.004, ctx.currentTime + fadeTime);
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
