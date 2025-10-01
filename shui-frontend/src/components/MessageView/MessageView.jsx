import "./messageView.css";
import { Message } from "../Message/Message";
import { Button } from "../Button/Button";
import { useState, useEffect } from "react";

//lägg till onDelete,
export const MessageView = ({ mode = "view", initialText = "", author, onEdit, onDelete, onBack, onSave, isDeleting = false }) => {
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
          <div className="message__title-box">
            <p className="message__title">{author}</p>
          </div>
        )}
        {mode === "view" && onEdit && <Button onClick={onEdit} text="Redigera" />}
        {mode === "view" && onDelete && <Button onClick={onDelete} text="Ta bort" />}
        {(mode === "edit" || mode === "write") && onSave && <Button onClick={() => onSave(text)} text="Publicera" />}
        {onBack && <Button onClick={onBack} text="Tillbaka" />}
      </div>
    </div>
  );
};
