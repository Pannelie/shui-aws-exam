import "./messageList.css";
import { Message } from "../Message/Message";

export const MessageList = ({ messages }) => {
  return (
    <ul className="message__list">
      {messages.map((message, index) => (
        <Message key={index} text={message} />
      ))}
    </ul>
  );
};
