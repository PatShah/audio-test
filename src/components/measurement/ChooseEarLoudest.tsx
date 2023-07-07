import { useAudioStore } from "@/store/audio";
import { Dispatch, SetStateAction } from "react";

const ChooseEarLoudest = ({
  setCurrentComponent,
}: {
  setCurrentComponent: Dispatch<SetStateAction<number>>;
}) => {
  const [stereoLeft, stereoRight] = useAudioStore((state) => [
    state.stereoLeft,
    state.stereoRight,
  ]);
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center text-2xl font-medium">
        <h1 className="text-xl font-semibold">
          Part 2 - How loud is too loud ?
        </h1>
        <br />
        <p className="text-lg font-medium text-center">
          Increase the volume of each tone until it starts to become
          uncomfortably loud.
        </p>
        <br />
        <p className="text-lg font-medium text-center">Choose an ear</p>
        <div className="flex gap-8 mt-6">
          <button
            className="px-4 py-2 w-full bg-orange-500 font-semibold tracking-wider rounded-sm text-white"
            onClick={() => {
              setCurrentComponent((prevState) => ++prevState);
              stereoLeft();
            }}
          >
            LEFT
          </button>
          <button
            className="px-4 py-2 w-full bg-orange-500 font-semibold tracking-wider rounded-sm text-white "
            onClick={() => {
              setCurrentComponent((prevState) => ++prevState);
              stereoRight();
            }}
          >
            RIGHT
          </button>
        </div>
      </div>
    </main>
  );
};

export default ChooseEarLoudest;
