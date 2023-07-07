import { useAudioStore } from "@/store/audio";
import { Dispatch, SetStateAction } from "react";

const NextEar = ({
  setCurrentComponent,
}: {
  setCurrentComponent: Dispatch<SetStateAction<number>>;
}) => {
  const [isLeft, stereoLeft, stereoRight] = useAudioStore((state) => [
    state.isLeft,
    state.stereoLeft,
    state.stereoRight,
  ]);
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center text-2xl font-medium">
        <p>Great! Now for the {isLeft ? "Right" : "Left"} ear.</p>
        <br />
        <button
          className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
          onClick={() => {
            setCurrentComponent((prevState) => ++prevState);
            (isLeft ? stereoRight : stereoLeft)();
          }}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default NextEar;
