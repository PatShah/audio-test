import { useAudioStore } from "@/store/audio";
import { useUserRecordedData } from "@/store/data";
import { useRouter } from "next/router";
import {
  Dispatch,
  MouseEvent,
  MouseEventHandler,
  SetStateAction,
  useState,
} from "react";

const PlayingTones = () => (
  <>
    <p className="text-center text-lg font-semibold">
      Okay.... the tones are playing
    </p>
  </>
);

const TonesHeard = ({
  setStarted,
  setTest2,
  setCurrentComponent,
  test2,
}: {
  setStarted: Dispatch<SetStateAction<boolean>>;
  setTest2: Dispatch<SetStateAction<boolean>>;
  setCurrentComponent: Dispatch<SetStateAction<number>>;
  test2: boolean;
}) => {
  const router = useRouter();
  const [setHeardTonesForLeft, setHeardTonesForRight, state] =
    useUserRecordedData((state) => [
      state.setHeardTonesForLeft,
      state.setHeardTonesForRight,
      state,
    ]);

  const [isLeft, stereoLeft, stereoRight, pauseAudio] = useAudioStore(
    (state) => [
      state.isLeft,
      state.stereoLeft,
      state.stereoRight,
      state.pauseAudio,
    ]
  );
  const buttonClickHandler: MouseEventHandler = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    (isLeft ? setHeardTonesForLeft : setHeardTonesForRight)(
      Number(e.currentTarget.value)
    );
    if (test2) {
      pauseAudio();
      router.push("measurement");
    } else {
      setStarted(false);
      setTest2(true);
      setCurrentComponent(0);
    }
    (isLeft ? stereoRight : stereoLeft)();
  };

  return (
    <>
      <p className="text-center text-lg font-semibold">
        How many tones did you hear ?
      </p>
      <br />
      <div className="grid grid-cols-2 gap-5">
        <button
          value={0}
          className="bg-black/80 text-white px-8 py-2 rounded-sm text-lg font-medium"
          onClick={buttonClickHandler}
        >
          0
        </button>
        <button
          value={1}
          className="bg-black/80 text-white px-8 py-2 rounded-sm text-lg font-medium"
          onClick={buttonClickHandler}
        >
          1
        </button>
        <button
          value={2}
          className="bg-black/80 text-white px-8 py-2 rounded-sm text-lg font-medium"
          onClick={buttonClickHandler}
        >
          2
        </button>
        <button
          value={3}
          className="bg-black/80 text-white px-8 py-2 rounded-sm text-lg font-medium"
          onClick={buttonClickHandler}
        >
          3
        </button>
      </div>
    </>
  );
};

export default function Home() {
  const [isLeft, playAudio] = useAudioStore((state) => [
    state.isLeft,
    state.playAudio,
  ]);
  const [started, setStarted] = useState(false);
  const [currentComponent, setCurrentComponent] = useState(0);

  const [test2, setTest2] = useState(false);

  return (
    <main className="h-screen w-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white px-24 py-12 rounded-xl">
        {!started ? (
          <>
            {test2 ? (
              <>
                <p className="text-center text-xl font-semibold">
                  Great! Let&apos;s do the {isLeft ? "Left" : "Right"} Ear Now.
                </p>
              </>
            ) : (
              <>
                <p className="text-center text-xl font-semibold">
                  {isLeft ? "Left" : "Right"} Ear! Awesome!
                </p>
                <br />
                <p className="text-center text-lg font-semibold">
                  Now we&apos;re going to play some beep tones to find the right
                  level. Tell us how many you hear.
                </p>
              </>
            )}
            <br />
            <button
              className="bg-black/80 text-white m-auto block px-8 py-2 rounded-sm text-lg font-medium"
              onClick={() => {
                playAudio("KHz1");
                setStarted(true);
                setTimeout(() => {
                  setCurrentComponent(1);
                }, window.audio.KHz1.duration() * 1000);
              }}
            >
              Play Tones
            </button>
          </>
        ) : (
          [
            <PlayingTones key={0} />,
            <TonesHeard
              key={1}
              setStarted={setStarted}
              setTest2={setTest2}
              setCurrentComponent={setCurrentComponent}
              test2={test2}
            />,
          ][currentComponent]
        )}
      </div>
    </main>
  );
}
