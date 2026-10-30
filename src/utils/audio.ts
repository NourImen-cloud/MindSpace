// Web Audio API pure synthesizer for calm mindfulness chimes and ambient soundscapes

class SoundEngine {
  private ctx: AudioContext | null = null;
  private ambientSource: AudioNode | null = null;
  private ambientGain: GainNode | null = null;
  private currentAmbientType: string = 'none';

  private initCtx() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Soft Tibetan singing bowl chime (rich harmonics with gentle exponential decay)
  playChime(type: 'start' | 'complete' | 'return_momentum') {
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      const baseFreq = type === 'complete' ? 528 : type === 'start' ? 432 : 639; // Solfeggio / peaceful frequencies
      const duration = type === 'return_momentum' ? 2.5 : 4.0;

      const harmonics = [1, 2.02, 3.01, 4.03];
      const gains = [0.4, 0.2, 0.1, 0.05];

      harmonics.forEach((h, i) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq * h, now);

        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(gains[i] * 0.5, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + duration + 0.1);
      });
    } catch (e) {
      console.warn('Audio chime playback omitted:', e);
    }
  }

  // Start calm synthesized ambient noise: rain, brown noise, or peaceful warm drone
  startAmbient(type: 'rain' | 'brown_noise' | 'forest' | 'tibetan_bowl', volume = 0.4) {
    try {
      this.initCtx();
      if (!this.ctx) return;

      this.stopAmbient();
      this.currentAmbientType = type;

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);

      // Generate brown / pink noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        if (type === 'brown_noise' || type === 'forest') {
          output[i] = (lastOut + (0.02 * white)) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        } else {
          // Rain simulation: textured white + brown
          output[i] = (lastOut + (0.04 * white)) / 1.04;
          lastOut = output[i];
          output[i] *= 2.5;
        }
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Filter to simulate sound texture
      const filter = this.ctx.createBiquadFilter();
      if (type === 'rain') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(800, this.ctx.currentTime);
      } else if (type === 'brown_noise') {
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, this.ctx.currentTime);
      } else {
        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(500, this.ctx.currentTime);
      }

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.35, this.ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      whiteNoise.start(0);

      this.ambientSource = whiteNoise;
      this.ambientGain = gain;
    } catch (e) {
      console.warn('Ambient audio could not be initialized:', e);
    }
  }

  setAmbientVolume(volume: number) {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setValueAtTime(Math.max(0, Math.min(1, volume * 0.35)), this.ctx.currentTime);
    }
  }

  stopAmbient() {
    try {
      if (this.ambientSource) {
        (this.ambientSource as AudioBufferSourceNode).stop();
        this.ambientSource.disconnect();
        this.ambientSource = null;
      }
      this.currentAmbientType = 'none';
    } catch (e) {
      console.warn('Error stopping ambient audio:', e);
    }
  }

  getAmbientType() {
    return this.currentAmbientType;
  }
}

export const soundEngine = new SoundEngine();
