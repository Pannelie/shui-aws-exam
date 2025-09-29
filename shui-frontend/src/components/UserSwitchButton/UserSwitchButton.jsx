import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import "./userSwitchButton.css";

export const UserSwitchButton = ({ type, active, onClick }) => {
  const icon = type === "mine" ? faUser : faUsers;
  return (
    <button className={`user-switch-button ${active ? "active" : ""}`} onClick={onClick}>
      <FontAwesomeIcon icon={icon} className="icon" />
    </button>
  );
};
