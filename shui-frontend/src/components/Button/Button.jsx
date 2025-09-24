import "./button.css";

export const Button = ({ text, onClick }) => {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  );
};
