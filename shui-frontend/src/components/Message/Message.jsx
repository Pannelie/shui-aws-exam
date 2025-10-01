import "./message.css"; // CSS för lappar och pins

export const Message = ({ text, mode = "view", onChange, className = "", rotation = 0, maxPreviewLength = 35, author, date, truncate }) => {
  //  const pinColor = ["#ff4d4d", "#e60000", "#ff1a1a"];
  //lägga till olika färger?
  // lägg isf till fill: ${pinColor} under style för pin

  const truncateText = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
  };

  // Endast visa förkortad text i "view"-mode
  const displayText = truncate ? truncateText(text, maxPreviewLength) : text;
  return (
    <div
      className={["message", className].filter(Boolean).join(" ")}
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
      <div className="message__content">
        {mode === "view" && <p className="message__text">{displayText}</p>}
        {(mode === "write" || mode === "edit") && (
          <textarea
            className="message__textarea"
            placeholder="Skriv ditt meddelande här..."
            value={text}
            onChange={(e) => onChange && onChange(e.target.value)}
          />
        )}{" "}
        {author && date && (
          <div className="message__meta">
            <p className="message__author">{author}</p>
            <p className="message__date">{date}</p>
          </div>
        )}
      </div>
    </div>
  );
};
