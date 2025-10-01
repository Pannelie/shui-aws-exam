import "./messagesPage.css";
import { MessageList } from "../../components/MessageList/MessageList";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { getMessagesApi, getMessagesByUserApi } from "../../api/messages";
import { WriteButton } from "../../components/WriteButton/WriteButton";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";

export const MessagesPage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const { type } = useParams();

  const [view, setView] = useState(type || "all");
  const [sortOrder, setSortOrder] = useState("date_asc"); // test för sortering
  // const [activeSort, setActiveSort] = useState(null); // t.ex. "date_desc", "sender_asc"

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user?.token || localStorage.getItem("token");

  const sortedMessages = [...messages].sort((a, b) => {
    switch (sortOrder) {
      case "date_asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      case "date_desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "sender_asc":
        return a.username.localeCompare(b.username);
      case "sender_desc":
        return b.username.localeCompare(a.username);
      default:
        return 0;
    }
  });

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  // Om URL saknar type, sätt default till "all"
  // useEffect(() => {
  //   if (!type) {
  //     navigate("/messages/type/all", { replace: true });
  //   }
  // }, [type, navigate]);

  useEffect(() => {
    if (type) setView(type);
  }, [type]);

  // Hämta meddelanden baserat på URL-param
  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      try {
        let result;
        if (view === "all") {
          result = await getMessagesApi(token);
        } else {
          result = await getMessagesByUserApi(token);
          console.log(result);
        }
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
          setMessages(result.data.messages || []); //behålla .messages?
        }
      } catch (error) {
        setError("Något gick fel vid hämtning av meddelanden");
        setMessages([]);
      }
      setLoading(false);
    };

    fetchMessages();
  }, [view, token, navigate, setUser]);

  // const handleViewChange = (newView) => {
  //   navigate(`/messages/type/${newView}`);
  // };

  useEffect(() => {
    navigate(`/messages/type/${view}`, { replace: true });
  }, [view, navigate]);

  return (
    <Layout>
      <Header view={view} setView={setView} activeSort={sortOrder} onToggle={setSortOrder} />
      <main className="main">
        <div className="message__list-container">
          {loading && <p>Laddar meddelanden...</p>}
          {error && <p style={{ color: "red" }}>{error}</p>}
          {!loading && !error && <MessageList messages={sortedMessages} />}
        </div>
      </main>
      <WriteButton />
    </Layout>
  );
};
