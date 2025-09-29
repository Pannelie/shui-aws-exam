import "./messageList.css";
import { Message } from "../Message/Message";

export const MessageList = ({ messages }) => {
  if (!messages || messages.length === 0) {
    return <p className="message__no-messages">Inga meddelanden att visa.</p>;
  }
  return (
    <ul className="message__list">
      {messages.map((message, index) => (
        <Message key={index} text={message.text || message} />
      ))}
    </ul>
  );
};
