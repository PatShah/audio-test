import "@/styles/globals.css";
import { Howl } from "howler";
import type { AppProps } from "next/app";
import { useEffect } from "react";
declare global {
  interface Window {
    audio: { magicTree: Howl; KHz1: Howl };
  }
}

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    window.audio = {
      magicTree: new Howl({
        src: ["magic-tree.mp3"],
      }),
      KHz1: new Howl({
        src: ["SineTone1kHz_65db.mp3"],
      }),
    };

    return () => {
      window.audio.magicTree.unload();
    };
  }, []);
  return <Component {...pageProps} />;
}
