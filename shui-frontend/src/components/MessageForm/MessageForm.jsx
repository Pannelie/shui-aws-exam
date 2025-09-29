import "./messageForm.css";
import { useState } from "react";

export const MessageForm = ({ initialData = {}, onSubmit }) => {
  const [text, setText] = useState(initialData.text || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...initialData, text });
  };
  return <form></form>;
};
