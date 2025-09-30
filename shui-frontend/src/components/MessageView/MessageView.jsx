import "./messageView.css";
import { Message } from "../Message/Message";
import { Button } from "../Button/Button";

export const MessageView = ({ mode = "view", initialText = "", author, onEdit, onDelete, onBack }) => {
  return (
    <div className="message-view-wrapper">
      <Message text={initialText} mode={mode} className="message--large" />

      <div className="message-actions">
        {mode === "view" && (
          <p>
            <strong>Från:</strong> {author}
            {/* <strong>Datum:</strong> {hitta datum} */}
          </p>
        )}
        {onEdit && <Button onClick={onEdit} text="Redigera" />}
        {onDelete && <Button onClick={onDelete} text="Ta bort" />}
        {onBack && <Button onClick={onBack} text="Tillbaka" />}
      </div>
    </div>
  );
};
