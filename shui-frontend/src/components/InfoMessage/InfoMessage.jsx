import "./infoMessage.css";

export const InfoMessage = ({ text, className = "" }) => {
  return <p className={`info ${className}`}>{text}</p>;
};
