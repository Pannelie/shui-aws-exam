import "./message.css"; // CSS för lappar och pins

export const Message = ({ text, className = "" }) => {
  const rotation = Math.random() * 15 - 5;
  const pinRotation = Math.random() * 20 - 10;
  //  const pinColor = ["#ff4d4d", "#e60000", "#ff1a1a"];
  //lägga till olika färger?
  // lägg isf till fill: ${pinColor} under style för pin

  return (
    <div
      className={`message ${className}`}
      style={{
        "--rotation": `${rotation}deg`,
        "--hover-rotation": `${rotation + 2}deg`,
      }}
    >
      <svg
        className="pin"
        viewBox="0 0 24 24"
        style={{
          transform: `translateX(-50%)`,
        }}
      >
        {/* Bara ett cirkulärt huvud */}
        <circle cx="12" cy="12" r="8" fill="var(--pin-color)" />
      </svg>
      <p className="message__text">{text}</p>
    </div>
  );
};
