import "./messageList.css";
import { Message } from "../Message/Message";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { InfoMessage } from "../InfoMessage/InfoMessage";

export const MessageList = ({ messages, setActiveUserFilter }) => {
  const navigate = useNavigate();
  const { user } = useUserStore();

  const rotation = Math.random() * 15 - 5;
  if (!messages || messages.length === 0) {
    return <InfoMessage text="Inga meddelanden att visa" className="info--normal" />;
  }
  return (
    <ul className="message__list">
      {messages.map((message, index) => {
        const isOwnMessage = user?.username === message.username;
        const rotation = Math.random() * 15 - 5;

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
            <Message
              text={message.text || message}
              className="message--small"
              rotation={rotation}
              author={message.username}
              date={message.createdAt}
              mode="view"
              truncate="true"
              setActiveUserFilter={setActiveUserFilter}
            />
          </li>
        );
      })}
    </ul>
  );
};
