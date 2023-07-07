import { AudioAction, AudioState } from "@/utils/types";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAudioStore = create<AudioState & AudioAction>()(
  devtools(
    (set) => ({
      play: 0,
      isPlaying: false,
      volume: 0,
      isLeft: false,
      isRight: false,
      playAudio: (audio) => {
        if (!window.audio[audio].playing()) {
          const play = window.audio[audio].play();
          set(() => ({ play: play, isPlaying: true }));
        }
      },
      playAudioInLoop: (audio) => {
        if (!window.audio[audio].playing()) {
          const play = window.audio[audio].play();
          window.audio.magicTree.loop();
          set(() => ({ play: play, isPlaying: true }));
        }
      },
      pauseAudio: () => {
        Howler.stop();
        window.audio.magicTree.seek(0);
        window.audio.KHz1.seek(0);
        set(() => ({ play: 0, isPlaying: false }));
      },
      stereoLeft: () => {
        Howler.stereo(-1);
        set(() => ({ isLeft: true, isRight: false }));
      },
      stereoRight: () => {
        Howler.stereo(1);
        set(() => ({ isLeft: false, isRight: true }));
      },
      setAudioVolume: (volume: number) => {
        Howler.volume(volume / 100);
        set(() => ({ volume }));
      },
    }),
    { name: "audio-store", store: "audioStore" }
  )
);
