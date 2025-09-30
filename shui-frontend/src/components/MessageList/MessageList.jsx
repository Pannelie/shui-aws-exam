import "./messageList.css";
import { Message } from "../Message/Message";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";

export const MessageList = ({ messages }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();
  console.log("user from store:", user);

  const rotation = Math.random() * 15 - 5;
  if (!messages || messages.length === 0) {
    return <p className="message__no-messages">Inga meddelanden att visa.</p>;
  }
  return (
    <ul className="message__list">
      {messages.map((message, index) => {
        const isOwnMessage = user?.user === message.username;

        const handleClick = () => {
          console.log(message);
          navigate(`/messages/id/${message.messageId}`, {
            state: {
              message,
              mode: isOwnMessage ? "edit" : "view",
            },
          });
        };

        return (
          <li key={message.id || index} onClick={handleClick} className="message__list-item">
            <Message text={message.text || message} className="message--small" rotation={rotation} />
          </li>
        );
      })}
    </ul>
  );
};
