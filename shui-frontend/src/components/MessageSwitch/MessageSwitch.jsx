import "./messageSwitch.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import pageFlipSound from "../../assets/sounds/page-flip-sound.mp3";
import { SortGroup } from "../SortGroup/SortGroup";
import { useAudio } from "../../hooks/useAudio";
import { useUserStore } from "../../stores/useUserStore";

export const MessageSwitch = ({
  view,
  setView,
  setMessages,
  activeSort,
  onToggle,
  activeUserFilter,
  onClearUserFilter,
  setActiveUserFilter,
}) => {
  const [switching, setSwitching] = useState(false);

  const [pageFlipRef, playPageFlip] = useAudio(pageFlipSound);

  const { user } = useUserStore();

  const handleClick = (newView) => {
    if (newView === view) return;

    playPageFlip();

    setSwitching(true);
    setView(newView);

    //klickar jag på att se mina egna messages
    // så nollställs sorteringen för att visa annan användares messages
    onClearUserFilter?.();
    setTimeout(() => setSwitching(false), 300); // matcha animationstid
  };

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
        <div className={`slider ${view === user?.username?.toLowerCase() ? "right" : "left"} ${switching ? "switching" : ""}`}></div>
        <button className="segment-btn" onClick={() => handleClick("all")}>
          <FontAwesomeIcon icon={faUsers} className="user-icon" />
        </button>
        <button className="segment-btn" onClick={() => handleClick(user?.username?.toLowerCase())}>
          <FontAwesomeIcon icon={faUser} className="user-icon" />
        </button>
      </div>
      <div className="sort-button-container">
        <SortGroup arialabel="Datum" type="date" activeSort={activeSort} onToggle={handleSortToggle} />
        <SortGroup arialabel="Avsändare" type="sender" activeSort={activeSort} onToggle={handleSortToggle} />
        {activeUserFilter && (
          <SortGroup
            arialabel="Avsändare"
            type="user"
            activeSort={activeSort}
            activeUserFilter={activeUserFilter}
            onToggle={(val) => {
              if (!val) {
                onClearUserFilter();
                setView("all");
              } else {
                setActiveUserFilter("user"); // aktivera röd styling direkt
              }
            }}
          />
        )}
      </div>
    </div>
  );
};
