import "./messagesPage.css";
import { Logo } from "../../components/logo/Logo";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { MessageList } from "../../components/MessageList/MessageList";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { getMessagesApi } from "../../api/messages";
import { MessageSwitch } from "../../components/MessageSwitch/MessageSwitch";
import { WriteButton } from "../../components/WriteButton/WriteButton";

export const MessagesPage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { type } = useParams();

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user?.token || localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Om URL saknar type, sätt default till "all"
  useEffect(() => {
    if (!type) {
      navigate("/messages/type/all", { replace: true });
    }
  }, [type, navigate]);

  // Hämta meddelanden baserat på URL-param
  useEffect(() => {
    if (!type || !token) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        const result = await getMessagesApi(token, type);

        if (!result.success) {
          if (result.message === "Invalid token") {
            setUser(null);
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            navigate("/login", { replace: true });
            return; // Sluta fortsätta med meddelanden
          }
          setError(result.message);
          setMessages([]);
        } else {
          setMessages(result.data.messages || []);
        }
      } catch (error) {
        setError("Något gick fel vid hämtning av meddelanden");
        setMessages([]);
      }
      setLoading(false);
    };

    fetchMessages();
  }, [type, token, navigate, setUser]);

  const handleViewChange = (newView) => {
    navigate(`/messages/type/${newView}`);
  };

  return (
    <section className="page messages-page">
      <Logo />
      <LogoutButton />
      <MessageSwitch view={type || "all"} setView={handleViewChange} />
      {loading && <p>Laddar meddelanden...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && <MessageList messages={messages} />}
      <WriteButton />
    </section>
  );
};
