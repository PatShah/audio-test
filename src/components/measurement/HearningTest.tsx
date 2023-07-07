import { useAudioStore } from "@/store/audio";
import { useUserRecordedData } from "@/store/data";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

const HearningTest = ({
  loud,
  setCurrentComponent,
}: {
  loud?: boolean;
  setCurrentComponent: Dispatch<SetStateAction<number>>;
}) => {
  const [
    isPlaying,
    volume,
    isLeft,
    playAudioInLoop,
    pauseAudio,
    setAudioVolume,
  ] = useAudioStore((state) => [
    state.isPlaying,
    state.volume,
    state.isLeft,
    state.playAudioInLoop,
    state.pauseAudio,
    state.setAudioVolume,
  ]);

  const [
    setQuitestVolumeForLeft,
    setQuitestVolumeForRight,
    setLoudestVolumeForLeft,
    setLoudestVolumeForRight,
  ] = useUserRecordedData((state) => [
    state.setQuitestVolumeForLeft,
    state.setQuitestVolumeForRight,
    state.setLoudestVolumeForLeft,
    state.setLoudestVolumeForRight,
  ]);

  const [currentTone, setCurrentTone] = useState(1);

  const [volumeData, setVolumeData] = useState<number[]>([]);

  useEffect(() => {
    setAudioVolume(0);
  }, [setAudioVolume, currentTone]);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center font-medium">
        <p className="text-xl">
          Tone {currentTone}/8 ({isLeft ? "Left" : "Right"})
        </p>
        <br />
        <p className="text-xl">Current volume : {volume}</p>
        <input
          defaultValue={0}
          value={volume}
          type="range"
          onChange={(e) => {
            if (!isPlaying) {
              playAudioInLoop("magicTree");
            }
            setAudioVolume(Number(e.target.value));
          }}
        />
        <br />
        <br />
        <p>
          {loud
            ? `Slide up just until the tone becomes uncomfortably loud`
            : `slide the volunme up and down to find the quietest level you can hear.`}
        </p>
        <br />
        <button
          className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
          onClick={() => {
            pauseAudio();
            if (currentTone === 8) {
              (isLeft
                ? loud
                  ? setLoudestVolumeForLeft
                  : setQuitestVolumeForLeft
                : loud
                ? setLoudestVolumeForRight
                : setQuitestVolumeForRight)([...volumeData, volume]);
              setCurrentComponent((prevState) => ++prevState);
            } else {
              setVolumeData((prevState) => [...prevState, volume]);
              setCurrentTone((prevState) => ++prevState);
            }
            currentTone === 8 ? setCurrentComponent : setCurrentTone;
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default HearningTest;
