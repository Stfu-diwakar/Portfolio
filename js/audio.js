// =============================================================================
// PROCEDURAL WEB AUDIO SYNTHESIZER ENGINE
// 100% Native Web Audio API - Zero External Audio Dependencies
// Generates retro 8-bit & futuristic sound effects in real-time
// =============================================================================

class SoundFX {
  constructor() {
    this.ctx = null;
    this.enabled = localStorage.getItem('sound_enabled') !== 'false'; // default true
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.enabled = !this.enabled;
    localStorage.setItem('sound_enabled', this.enabled);
    if (this.enabled) {
      this.init();
      this.playClick();
    }
    return this.enabled;
  }

  // Snappy UI click chirp
  playClick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.05);

      gain.gain.setValueAtTime(0.12, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.05);
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Rising XP gain sound
  playXpGain() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, t);
      osc.frequency.exponentialRampToValueAtTime(880, t + 0.12);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.12);
    } catch (e) {}
  }

  // Celebratory Level Up Fanfare Arpeggio
  playLevelUp() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      const startT = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteT = startT + idx * 0.08;

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteT);

        gain.gain.setValueAtTime(0.18, noteT);
        gain.gain.exponentialRampToValueAtTime(0.001, noteT + 0.25);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteT);
        osc.stop(noteT + 0.25);
      });
    } catch (e) {}
  }

  // Magical Achievement Unlock chime
  playAchievement() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const chords = [587.33, 739.99, 880.00, 1174.66]; // D5, F#5, A5, D6
      const t = this.ctx.currentTime;

      chords.forEach((freq, i) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteT = t + i * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteT);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.05, noteT + 0.3);

        gain.gain.setValueAtTime(0.15, noteT);
        gain.gain.exponentialRampToValueAtTime(0.001, noteT + 0.35);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteT);
        osc.stop(noteT + 0.35);
      });
    } catch (e) {}
  }

  // Interactive Lamp Pull: tactile spring click + soft electrical hum
  playLampPull() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const t = this.ctx.currentTime;
      // Click
      const clickOsc = this.ctx.createOscillator();
      const clickGain = this.ctx.createGain();
      clickOsc.type = 'square';
      clickOsc.frequency.setValueAtTime(250, t);
      clickGain.gain.setValueAtTime(0.18, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);
      clickOsc.connect(clickGain);
      clickGain.connect(this.ctx.destination);
      clickOsc.start(t);
      clickOsc.stop(t + 0.04);

      // Warm electrical hum
      const humOsc = this.ctx.createOscillator();
      const humGain = this.ctx.createGain();
      humOsc.type = 'sine';
      humOsc.frequency.setValueAtTime(120, t + 0.04);
      humOsc.frequency.linearRampToValueAtTime(180, t + 0.2);
      humGain.gain.setValueAtTime(0.12, t + 0.04);
      humGain.gain.exponentialRampToValueAtTime(0.001, t + 0.25);
      humOsc.connect(humGain);
      humGain.connect(this.ctx.destination);
      humOsc.start(t + 0.04);
      humOsc.stop(t + 0.25);
    } catch (e) {}
  }

  // Mini-game: Catch item
  playGameCatch() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1600, t + 0.08);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.08);
    } catch (e) {}
  }

  // Mini-game: Hit obstacle
  playGameHit() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const t = this.ctx.currentTime;

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(60, t + 0.15);

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    } catch (e) {}
  }

  // Mini-game: Game Over
  playGameOver() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [392.00, 349.23, 311.13, 261.63]; // G4, F4, Eb4, C4
      const t = this.ctx.currentTime;

      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteT = t + idx * 0.12;

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, noteT);

        gain.gain.setValueAtTime(0.18, noteT);
        gain.gain.exponentialRampToValueAtTime(0.001, noteT + 0.22);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(noteT);
        osc.stop(noteT + 0.22);
      });
    } catch (e) {}
  }
}

// Global Sound Instance
window.soundFX = new SoundFX();
