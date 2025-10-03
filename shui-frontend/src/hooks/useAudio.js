import { useEffect, useRef } from "react";

//hook eftersom jag vill spela det efter specifika händelser,
// kopplad till komponenters livscyklar.
// Kan använda useEffect, useRef inuti

export const useAudio = (src, options = {}) => {
  const { startTime = 0 } = options;
  const audioRef = useRef(null);

  // Skapa audio när src finns
  useEffect(() => {
    if (!src) return;
    const audio = new Audio(src);
    audio.preload = "auto";
    audioRef.current = audio;
  }, [src]);

  const play = (callback) => {
    const audio = audioRef.current;
    if (!audio) {
      callback?.();
      return;
    }

    // Direkt start från startTime
    audio.currentTime = startTime;
    audio.onended = () => callback?.();

    // spela ljud
    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise.catch((error) => {
        console.warn("Ljudet kunde inte spelas: ", error);
        callback?.();
      });
    }
  };

  return [audioRef, play];
};
