import "./messagesPage.css";
import { NavBar } from "../../components/NavBar/NavBar";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { MessageList } from "../../components/MessageList/MessageList";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { getMessagesApi } from "../../api/messages";

export const MessagesPage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();

  const token = user?.token || localStorage.getItem("token");

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!token) return;

      setLoading(true);
      try {
        // Hämta meddelanden från API
        const result = await getMessagesApi(token);

        if (!result.success && result.message === "Invalid token") {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          navigate("/login", { replace: true });
          return; // Sluta fortsätta med meddelanden
        }

        if (result.success) {
          setMessages(result.data.messages);
          setError("");
        } else {
          setError(result.message);
        }
      } catch (error) {
        setError("Något gick fel vid hämtning av meddelanden");
      }
      setLoading(false);
    };
    fetchMessages();
  }, [token, navigate, setUser]);

  if (loading) return <p>Laddar meddelanden...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <section className="page messages-page">
      <NavBar />
      <MessageList messages={messages} />
      <LogoutButton />
    </section>
  );
};
