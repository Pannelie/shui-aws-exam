import "./messageSwitch.css";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import pageFlipSound from "../../assets/sounds/page-flip-sound.mp3";
import { SortGroup } from "../SortGroup/SortGroup";
import { useAudio } from "../../hooks/useAudio";
import { useUserStore } from "../../stores/useUserStore";
import { sortMessagesArray } from "../../utils/sortMessagesArray";

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
      setMessages((prev) => sortMessagesArray(prev, newSortValue));
    }
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
