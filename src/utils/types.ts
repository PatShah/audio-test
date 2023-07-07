export type AudioState = {
  play: number;
  isPlaying: boolean;
  volume: number;
  isLeft: boolean;
  isRight: boolean;
};

export type AudioAction = {
  playAudio: (audio: "magicTree" | "KHz1") => void;
  playAudioInLoop: (audio: "magicTree" | "KHz1") => void;
  pauseAudio: () => void;
  stereoLeft: () => void;
  stereoRight: () => void;
  setAudioVolume: (volume: number) => void;
};

export type DataState = {
  Left: {
    tonesHeard: number;
    quitestVolume: number[];
    loudestVolume: number[];
  };
  Right: {
    tonesHeard: number;
    quitestVolume: number[];
    loudestVolume: number[];
  };
};

export type DataAction = {
  setHeardTonesForLeft: (value: number) => void;
  setQuitestVolumeForLeft: (value: number[]) => void;
  setLoudestVolumeForLeft: (value: number[]) => void;
  setHeardTonesForRight: (value: number) => void;
  setQuitestVolumeForRight: (value: number[]) => void;
  setLoudestVolumeForRight: (value: number[]) => void;
};
