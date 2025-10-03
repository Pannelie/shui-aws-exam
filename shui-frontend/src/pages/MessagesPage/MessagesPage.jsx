import "./messagesPage.css";
import { MessageList } from "../../components/MessageList/MessageList";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserStore } from "../../stores/useUserStore";
import { WriteButton } from "../../components/WriteButton/WriteButton";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import { filterMessagesByUser, sortMessages } from "../../utils/messages";
import { fetchMessagesUtil } from "../../utils/fetchMessagesUtil";
import { getToken } from "../../utils/getToken";
import { useAuthRedirect } from "../../hooks/useAuthRedirect";

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

  const token = getToken();

  const sortedMessage = sortMessages(messages, sortOrder);

  const filteredMessages = filterMessagesByUser(sortedMessage, activeUserFilter);

  useAuthRedirect(token);

  useEffect(() => {
    if (type) setView(type);
  }, [type]);

  useEffect(() => {
    if (!token) return;

    const fetchMessages = async () => {
      setLoading(true);
      setError("");
      const result = await fetchMessagesUtil({ view, token, user });

      if (result.status === 404) {
        setError(`Användaren "${view}" hittades inte`);
        setMessages([]);
        setLoading(false);
        return;
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
      setLoading(false);
    };

    fetchMessages();
  }, [view, token, navigate, user]);

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
          {loading && <LoadingIcon />}
          {error && <InfoMessage text={error} className="info--error" />}
          {!loading && !error && <MessageList messages={filteredMessages} activeUserFilter={activeUserFilter} />}
        </div>
      </main>
      <WriteButton />
    </Layout>
  );
};
