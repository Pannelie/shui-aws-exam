import "./messageForm.css";
import { useState } from "react";

export const MessageForm = ({ initialData = {}, onSubmit }) => {
  const [text, setText] = useState(initialData.text || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, text });
  };
  return (
    <form onSubmit={handleSubmit}>
      <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Skriv ditt meddelande här" />
      <button type="submit">{initialData.id ? "Spara ändringar" : "Skicka"}</button>
    </form>
  );
};
