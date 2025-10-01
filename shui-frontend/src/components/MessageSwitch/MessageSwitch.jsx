import "./messageSwitch.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import pageFlipSound from "../../assets/sounds/page-flip-sound.mp3";
//importa ljud pageFlipSound

export const MessageSwitch = ({ view, setView }) => {
  const [switching, setSwitching] = useState(false);
  const audioRef = useRef(null);

  //förladdar ljudeffekt
  useEffect(() => {
    const audio = new Audio(pageFlipSound);
    audio.preload = "auto";
    audioRef.current = audio;

    // Dummy play för att ladda in ljudet i minnet
    audio
      .play()
      .then(() => audio.pause())
      .catch(() => {});
  }, []);

  const handleClick = (newView) => {
    if (newView === view) return;

    // Spela upp ljud direkt från ref
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch((error) => {
        // Vissa webbläsare kräver interaktion, så hantera eventuella fel tyst
        console.warn("Ljudet kunde inte spelas:", error);
      });
    }

    setSwitching(true);
    setView(newView);

    setTimeout(() => setSwitching(false), 300); // matcha animationstid
  };

  return (
    <div className="segment-paper">
      <div className={`slider ${view === "mine" ? "right" : "left"} ${switching ? "switching" : ""}`}></div>
      <button className="segment-btn" onClick={() => handleClick("all")}>
        <FontAwesomeIcon icon={faUsers} className="user-icon" />
      </button>
      <button className="segment-btn" onClick={() => handleClick("mine")}>
        <FontAwesomeIcon icon={faUser} className="user-icon" />
      </button>
    </div>
  );
};
