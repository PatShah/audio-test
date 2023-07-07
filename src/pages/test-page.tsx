import { useAudioStore } from "@/store/audio";

function Page() {
  const [isLeft, volume, setAudioVolume] = useAudioStore((state) => [
    state.isLeft,
    state.volume,
    state.setAudioVolume,
  ]);
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl">
        <h1 className="text-xl font-semibold">
          Audio is playing in your {isLeft ? "Left" : "Right"} ear.
        </h1>
        <p className="text-center text-lg mt-4">current volume is : {volume}</p>
        <div className="text-center mt-4">
          <input
            type="range"
            defaultValue={100}
            value={volume}
            min={0}
            max={100}
            onChange={(e) => setAudioVolume(Number(e.target.value))}
          />
        </div>
      </div>
    </main>
  );
}

export default Page;
