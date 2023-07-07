import { Dispatch, SetStateAction } from "react";

const SetVolumeToMax = ({
  setCurrentComponent,
}: {
  setCurrentComponent: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center text-2xl font-medium">
        <p>Now please set your computer volume to maximum volume.</p>
        <br />
        <button
          className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
          onClick={() => setCurrentComponent(1)}
        >
          Next
        </button>
      </div>
    </main>
  );
};

export default SetVolumeToMax;
