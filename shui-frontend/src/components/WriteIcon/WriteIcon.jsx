import "./writeIcon.css";
import Pen from "../../assets/vectors/VectorPenIcon.svg";
import { useNavigate } from "react-router-dom";

export const WriteIcon = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/messages/write"); // byt "/write" till din route för att skriva nytt meddelande
  };
  return (
    <button onClick={handleClick} className="write-icon-btn">
      <img src={Pen} alt="Skriv nytt meddelande" />
    </button>
  );
};
