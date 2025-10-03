import "./messagesPage.css";
import { MessageList } from "../../components/MessageList/MessageList";
import { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { getMessagesApi, getMessagesByUserApi } from "../../api/messages";
import { WriteButton } from "../../components/WriteButton/WriteButton";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";

export const MessagesPage = () => {
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { type } = useParams();

  const [view, setView] = useState(type || "all");
  const [activeUserFilter, setActiveUserFilter] = useState(null);
  const [sortOrder, setSortOrder] = useState("date_asc"); // test för sortering
  // const [activeSort, setActiveSort] = useState(null); // t.ex. "date_desc", "sender_asc"

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = user?.token || localStorage.getItem("token");

  const sortedMessages = [...messages].sort((a, b) => {
    switch (sortOrder) {
      case "date_asc":
        return new Date(a.createdAtUTC) - new Date(b.createdAtUTC);
      case "date_desc":
        return new Date(b.createdAtUTC) - new Date(a.createdAtUTC);
      case "sender_asc":
        return a.username.localeCompare(b.username);
      case "sender_desc":
        return b.username.localeCompare(a.username);
      default:
        return 0;
    }
  });

  const filteredMessages = activeUserFilter ? sortedMessages.filter((msg) => msg.username === activeUserFilter) : sortedMessages;

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (type) setView(type);
  }, [type]);

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

  useEffect(() => {
    navigate(`/messages/type/${view}`, { replace: true });
  }, [view, navigate]);

  useEffect(() => {
    if (location.state?.userFilter) {
      setActiveUserFilter(location.state.userFilter);
    }
  }, [location.state?.userFilter]);
  return (
    <Layout>
      <Header
        view={view}
        setView={setView}
        activeSort={sortOrder}
        onToggle={setSortOrder}
        activeUserFilter={activeUserFilter}
        onClearUserFilter={() => setActiveUserFilter(null)}
        setActiveUserFilter={setActiveUserFilter}
      />
      <main className="main">
        <div className="message__list-container">
          {loading && <InfoMessage text="laddar meddelanden..." className="info--normal" />}
          {error && <InfoMessage text={error} className="info--error" />}
          {!loading && !error && <MessageList messages={filteredMessages} activeUserFilter={activeUserFilter} />}
        </div>
      </main>
      <WriteButton />
    </Layout>
  );
};
