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
          transform: `translateX(-50%) rotate(${pinRotation}deg)`,
        }}
      >
        <path d="M12 2c0 .55-.45 1-1 1s-1-.45-1-1 1-1 1-1 1 .45 1 1zm-1 2h2v6h-2V4zm0 6h2v2h-2v-2zm0 2h2v8h-2v-8z" />
      </svg>
      <p className="message__text">{text}</p>
    </div>
  );
};
