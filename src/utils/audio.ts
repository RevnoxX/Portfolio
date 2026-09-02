let audioCtx: AudioContext | null = null;
let masterGain: GainNode | null = null;
let _isMuted = false;

export const initAudio = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
    masterGain = audioCtx.createGain();
    masterGain.connect(audioCtx.destination);
    masterGain.gain.value = _isMuted ? 0 : 1;
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setMuted = (muted: boolean) => {
  _isMuted = muted;
  if (masterGain) {
    masterGain.gain.value = muted ? 0 : 1;
  }
};

export const getMuted = () => _isMuted;

export const playClick = () => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(600, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
    gain.gain.setValueAtTime(0.05, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  } catch (e) {}
};

export const playHover = () => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, ctx.currentTime);
    gain.gain.setValueAtTime(0.02, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start();
    osc.stop(ctx.currentTime + 0.05);
  } catch (e) {}
};

export const playAchievement = () => {
  try {
    const ctx = initAudio();
    const playNote = (freq: number, offset: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.05, ctx.currentTime + offset);
      gain.gain.linearRampToValueAtTime(0, ctx.currentTime + offset + 0.2);
      osc.connect(gain);
      gain.connect(masterGain!);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.2);
    };
    playNote(523.25, 0); // C5
    playNote(659.25, 0.1); // E5
    playNote(783.99, 0.2); // G5
    playNote(1046.50, 0.3); // C6
  } catch (e) {}
};

export const playGlitch = () => {
  try {
    const ctx = initAudio();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(100, ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(50, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(masterGain!);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  } catch (e) {}
};

export const playReboot = () => {
  try {
    const ctx = initAudio();
    const playNote = (freq: number, offset: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + offset);
      osc.frequency.exponentialRampToValueAtTime(freq * 2, ctx.currentTime + offset + 0.5);
      gain.gain.setValueAtTime(0, ctx.currentTime + offset);
      gain.gain.linearRampToValueAtTime(0.1, ctx.currentTime + offset + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + offset + 0.5);
      osc.connect(gain);
      gain.connect(masterGain!);
      osc.start(ctx.currentTime + offset);
      osc.stop(ctx.currentTime + offset + 0.5);
    };
    playNote(220, 0); // A3 rising
    playNote(440, 0.2); // A4 rising
  } catch (e) {}
};

export const playHum = () => {
  try {
    const ctx = initAudio();
    if ((ctx as any).humPlaying) return;
    (ctx as any).humPlaying = true;
    
    // Low frequency hum
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 50; 
    
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.value = 60;
    
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 200;

    const gain = ctx.createGain();
    gain.gain.value = 0.03; // Very low volume
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain!);
    
    osc1.start();
    osc2.start();
  } catch (e) {}
};
