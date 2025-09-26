import "./writeButton.css";
import PenIcon from "../../assets/vectors/VectorpenIcon.svg";

export const WriteButton = ({ onClick, text }) => {
  return (
    <button className="write-button" onClick={onClick}>
      <img src={PenIcon} alt="Pen icon" className="write-button__icon" />
      {text}
    </button>
  );
};
