import "./messageView.css";
import { Message } from "../Message/Message";
import { Button } from "../Button/Button";
import { useEffect, useState } from "react";

export const MessageView = ({
  mode = "view",
  initialText = "",
  author,
  onEdit,
  onDelete,
  onBack,
  onSave,
  isDeleting = false,
  onAuthorClick,
}) => {
  const [text, setText] = useState(initialText);

  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  console.log("Rendering MessageView", { mode, text, onSave });

  return (
    <div className="message-view-wrapper">
      <Message text={text} mode={mode} className={`message--large ${isDeleting ? "deleting" : ""}`} onChange={setText} truncate={false} />
      <div className="message-actions">
        {mode === "view" && (
          <button className="message__title-button clickable" onClick={onAuthorClick}>
            <span>{author}</span>
          </button>
        )}
        {mode === "view" && onEdit && <Button onClick={onEdit} text="Redigera" />}
        {mode === "view" && onDelete && <Button onClick={onDelete} text="Ta bort" />}
        {(mode === "edit" || mode === "write") && onSave && <Button onClick={() => onSave(text)} text="Publicera" />}
        {onBack && <Button onClick={onBack} text="Tillbaka" />}
      </div>
    </div>
  );
};
