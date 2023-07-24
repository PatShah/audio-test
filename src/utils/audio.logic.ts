export const frequency = [250, 500, 1000, 2000, 3000, 4000, 6000, 8000];

export class AudioConstructor {
  isPlaying: boolean;
  audioContext: AudioContext;
  audioElement: HTMLAudioElement;
  track: any;
  stereoNode: StereoPannerNode;
  constructor(audioUrl: string) {
    this.isPlaying = false;
    const AudioContext = window.AudioContext;
    this.audioContext = new AudioContext();
    this.audioElement = new Audio(audioUrl);
    this.track = this.audioContext.createMediaElementSource(this.audioElement);
    this.stereoNode = new StereoPannerNode(this.audioContext, { pan: 0 });
    this.track.connect(this.stereoNode).connect(this.audioContext.destination);
  }
  play() {
    this.isPlaying = true;
    this.audioElement.play();
  }
  stop() {
    this.isPlaying = true;
    this.audioElement.currentTime = 0;
    this.audioElement.pause();
  }
  left() {
    this.stereoNode.pan.value = -1;
  }
  right() {
    this.stereoNode.pan.value = 1;
  }
  volume(val: number) {
    this.audioElement.play();
    this.audioElement.volume = val * 0.01;
  }
  destroy() {
    this.audioContext.close();
  }
}

export class AudioOscillator {
  isPlaying: boolean;
  audioContext: AudioContext;
  oscillator: OscillatorNode;
  stereoNode: StereoPannerNode;
  gain: GainNode;
  constructor(frequency: number, pan: number) {
    this.isPlaying = false;
    const AudioContext = window.AudioContext;
    this.audioContext = new AudioContext();
    this.oscillator = this.audioContext.createOscillator();
    this.oscillator.frequency.value = frequency;
    this.stereoNode = new StereoPannerNode(this.audioContext, { pan: pan });
    this.gain = this.audioContext.createGain();
    this.gain.connect(this.audioContext.destination);
    this.oscillator.connect(this.stereoNode).connect(this.gain);
    this.gain.gain.value = 0;
  }
  volume(val: number) {
    if (!this.isPlaying) {
      this.oscillator.start();
      this.isPlaying = !this.isPlaying;
    }
    this.gain.gain.value = val * 0.00025;
  }
  destroy() {
    this.audioContext.close();
  }
}
