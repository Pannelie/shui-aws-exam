import "./messageSwitch.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import pageFlipSound from "../../assets/sounds/page-flip-sound.mp3";
import { SortGroup } from "../SortGroup/SortGroup";
import { getMessagesApi, getMessagesByUserApi } from "../../api/messages";

export const MessageSwitch = ({ view, setView, setMessages, activeSort, onToggle }) => {
  const [switching, setSwitching] = useState(false);
  // const [sortOption, setSortOption] = useState("date_desc");
  const audioRef = useRef(null);

  const token = localStorage.getItem("token");
  //förladdar ljudeffekt
  useEffect(() => {
    const audio = new Audio(pageFlipSound);
    audio.preload = "auto";
    audioRef.current = audio;

    audio.load();
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
  // Hantera sortering
  // const handleSortToggle = () => {
  //   let newSort;
  //   if (sortOption === "date_desc") newSort = "date_asc";
  //   else if (sortOption === "date_asc") newSort = "sender_asc";
  //   else if (sortOption === "sender_asc") newSort = "sender_desc";
  //   else newSort = "date_desc"; // loopar

  //   setSortOption(newSort);
  //   sortMessages(newSort);
  // };

  const handleSortToggle = (newSortValue) => {
    onToggle(newSortValue); // uppdaterar sortOrder i MessagesPage
    if (newSortValue && setMessages) {
      sortMessages(newSortValue);
    }
  };

  const sortMessages = (option) => {
    if (!setMessages) return;

    setMessages((prev) => {
      const sorted = [...prev];
      switch (option) {
        case "date_asc":
          sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
          break;
        case "date_desc":
          sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case "sender_asc":
          sorted.sort((a, b) => a.username.localeCompare(b.username));
          break;
        case "sender_desc":
          sorted.sort((a, b) => b.username.localeCompare(a.username));
          break;
      }
      return sorted;
    });
  };

  return (
    <div className="segment-container">
      <div className="segment-paper">
        <div className={`slider ${view === "mine" ? "right" : "left"} ${switching ? "switching" : ""}`}></div>
        <button className="segment-btn" onClick={() => handleClick("all")}>
          <FontAwesomeIcon icon={faUsers} className="user-icon" />
        </button>
        <button className="segment-btn" onClick={() => handleClick("mine")}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </button>
      </div>
      <div className="sort-button-container">
        <SortGroup arialabel="Datum" type="date" activeSort={activeSort} onToggle={handleSortToggle} />
        <SortGroup arialabel="Avsändare" type="sender" activeSort={activeSort} onToggle={handleSortToggle} />
      </div>
    </div>
  );
};
