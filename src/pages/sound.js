import { AudioContext } from "@/context/audio";
import { useContext, useDeferredValue, useEffect, useState } from "react";

let audioElement, audioContext, isPlaying, stereoNode, track;
export default function Page() {
  const [volume, setVolume] = useState(0);
  const defferedValueOfVolume = useDeferredValue(volume);
  const { isLeft } = useContext(AudioContext);

  const inputChangeHandler = (e) => {
    if (!isPlaying) {
      isPlaying = !isPlaying;
      audioElement.play();
    }
    let val = Number(e?.target?.value ?? 0);
    audioElement.volume = val / 100;
    setVolume(val);
  };

  const audioUrl = "magic-tree.mp3";

  useEffect(() => {
    isPlaying = false;
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    audioContext = new AudioContext();

    audioElement = new Audio(audioUrl);

    track = audioContext.createMediaElementSource(audioElement);

    stereoNode = new StereoPannerNode(audioContext, { pan: 0 });

    track.connect(stereoNode).connect(audioContext.destination);

    if (isLeft) {
      stereoNode.pan.value = -1; // left
    } else {
      stereoNode.pan.value = 1; // right
    }

    return () => {
      audioContext.close();
      stereoNode.disconnect();
    };
  }, []);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl">
        <h1 className="text-xl font-semibold">
          Audio is playing in your {isLeft ? "Left" : "Right"} ear.
        </h1>
        <p className="text-center text-lg mt-4">
          current volume is : <span>{defferedValueOfVolume}</span>
        </p>
        <div className="text-center mt-4">
          <input
            type="range"
            defaultValue={0}
            min={0}
            max={100}
            onChange={(e) => inputChangeHandler(e)}
          />
        </div>
      </div>
    </main>
  );
}
