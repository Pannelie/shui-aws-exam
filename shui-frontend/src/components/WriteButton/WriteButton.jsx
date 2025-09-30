import "./writeButton.css";
// import PenIcon from "../../assets/vectors/VectorpenIcon.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";

export const WriteButton = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/messages/write"); // byt "/write" till din route för att skriva nytt meddelande
  };
  return (
    <button className="write-button" onClick={handleClick}>
      <FontAwesomeIcon icon={faPen} className="write-button__icon" />

      {/* <img src={PenIcon} alt="Skriv nytt meddelande" className="write-button__icon" /> */}
    </button>
  );
};
