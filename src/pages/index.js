import { AudioContext } from "@/context/audio";
import { useRouter } from "next/router";
import { useContext } from "react";

export default function Home() {
  const { setIsLeft } = useContext(AudioContext);

  const router = useRouter();

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl">
        <h1 className="text-xl font-semibold">
          In which ear would you like to test first ?
        </h1>
        <div className="flex gap-8 mt-6">
          <button
            className="px-4 py-2 w-full bg-orange-500 font-semibold tracking-wider rounded-sm text-white"
            onClick={() => {
              setIsLeft(true);
              router.push("sound");
            }}
          >
            LEFT
          </button>
          <button
            className="px-4 py-2 w-full bg-orange-500 font-semibold tracking-wider rounded-sm text-white"
            onClick={() => {
              setIsLeft(false);
              router.push("sound");
            }}
          >
            RIGHT
          </button>
        </div>
      </div>
    </main>
  );
}
