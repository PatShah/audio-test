import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const [isOnScreen2, setIsOnScreen2] = useState<boolean>(false);
  const route = useRouter();
  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl text-center text-2xl font-medium">
        {isOnScreen2 ? (
          <>
            <p>
              Find a quiet room, relax and get ready to start the pre-screen
            </p>
            <br />
            <button
              className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
              onClick={() => route.push("/start")}
            >
              Start
            </button>
          </>
        ) : (
          <>
            <p>If you wear hearing aids, please take them out.</p>
            <br />
            <p>And please put on Earbuds or Headphones to continue.</p>
            <br />
            <button
              className="bg-black/80 text-white font-medium px-8 py-2 rounded-sm text-lg"
              onClick={() => setIsOnScreen2(true)}
            >
              Next
            </button>
          </>
        )}
      </div>
    </main>
  );
}
