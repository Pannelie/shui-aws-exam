import "./message.css";

export const Message = ({ text, mode = "view", onChange, className = "", rotation = 0, maxPreviewLength = 35, author, date, truncate }) => {
  const truncateText = (str, maxLength) => {
    return str.length > maxLength ? str.slice(0, maxLength) + "…" : str;
  };

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
        {/* ---------------PIN----------- */}
        <circle cx="12" cy="12" r="8" fill="var(--main-red-color)" />
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
        )}
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
