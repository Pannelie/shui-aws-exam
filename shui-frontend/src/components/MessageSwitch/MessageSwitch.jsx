import "./messageSwitch.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import pageFlipSound from "../../assets/sounds/page-flip-sound.mp3";
//importa ljud pageFlipSound

export const MessageSwitch = ({ view, setView }) => {
  const [switching, setSwitching] = useState(false);
  const audio = new Audio(pageFlipSound);

  const handleClick = (newView) => {
    if (newView === view) return;

    audio.currentTime = 0; // starta om ljudet
    audio.play();

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
