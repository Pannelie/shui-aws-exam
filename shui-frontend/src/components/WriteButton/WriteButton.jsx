import "./writeButton.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export const WriteButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/messages/write"); // byt "/write" för att skriva nytt meddelande
  };
  return (
    <button className="write-button" onClick={handleClick}>
      <FontAwesomeIcon icon={faPen} className="write-button__icon" />
    </button>
  );
};
