import { useEffect, useRef } from "react";

//hook eftersom jag vill spela det efter specifika händelser,
// kopplad till komponenters livscyklar.
// Kan använda useEffect, useRef inuti

export const useAudio = (src, options = {}) => {
  const { startTime = 0 } = options;
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = new Audio(src);
    audio.preload = "audio"; //förladdar mitt ljud
    audioRef.current = audio;
  }, [src]);

  const play = (callback) => {
    if (!audioRef.current) {
      callback?.();
      return;
    }
    const audio = audioRef.current;
    audio.currentTime = startTime;

    audio.onended = () => {
      callback?.();
    };

    audio.play().catch((error) => {
      console.warn("Ljudet kunde inte spelas: ", error);
      callback?.();
    });
  };
  return [audioRef, play];
};
