import { useAudioStore } from "@/store/audio";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [isOnScreen2, setIsOnScreen2] = useState<boolean>(false);
  const [stereoLeft, stereoRight] = useAudioStore(
    (state) => [
      state.stereoLeft,
      state.stereoRight,
    ]
  );
  const route = useRouter();
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center text-2xl font-medium">
        {!isOnScreen2 ? (
          <>
            <p>Set your computer volume to halfway (50%)</p>
            <br />
            <button
              className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
              onClick={() => setIsOnScreen2(true)}
            >
              Next
            </button>
          </>
        ) : (
          <>
            <h1 className="text-xl font-semibold">
              Ok. Let&apos;s set a Pre-screening level
            </h1>
            <br />
            <p className="text-lg font-medium text-center">Choose an ear</p>
            <div className="flex gap-8 mt-6">
              <button
                className="px-4 py-2 w-full bg-orange-500 font-semibold text-lg tracking-wider rounded-sm text-white"
                onClick={() => {
                  stereoLeft();
                  route.push("/comfortableListening");
                }}
              >
                LEFT
              </button>
              <button
                className="px-4 py-2 w-full bg-orange-500 font-semibold text-lg tracking-wider rounded-sm text-white "
                onClick={() => {
                  stereoRight();
                  route.push("/comfortableListening");
                }}
              >
                RIGHT
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
}
