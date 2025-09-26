import "./button.css";

export const Button = ({ className = "", text, onClick }) => {
  return (
    <button onClick={onClick} className={`button ${className}`}>
      {text}
    </button>
  );
};
