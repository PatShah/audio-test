import { AudioContext } from "@/context/audio";
import "@/styles/globals.css";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isLeft, setIsLeft] = useState(false);

  return (
    <AudioContext.Provider
      value={{
        isLeft,
        setIsLeft,
      }}
    >
      <Component {...pageProps} />
    </AudioContext.Provider>
  );
}
