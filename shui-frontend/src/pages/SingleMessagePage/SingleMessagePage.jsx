import "./singleMessagePage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessageByIdApi, deleteMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { MessageView } from "../../components/MessageView/MessageView";
import { Button } from "../../components/Button/Button";

export const SingleMessagePage = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  const { user } = useUserStore();

  const token = user?.token || localStorage.getItem("token");

  const [message, setMessage] = useState(state?.message || null);
  const [loading, setLoading] = useState(!state?.message);
  const [error, setError] = useState("");

  const isOwner = message?.username === user?.username;
  const [mode, setMode] = useState(state?.mode || "view");

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!message && messageId) {
      setLoading(true);
      getMessageByIdApi(messageId, token)
        .then((result) => {
          if (result.success) {
            setMessage(result.data.message);
            setMode(result.data.message.username === user?.username ? "edit" : "view");
          } else {
            setError(result.message);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [messageId, message, token, user?.username]);

  useEffect(() => {
    if (!loading && !message) {
      // Om man inte hittar meddelandet, skicka tillbaka
      navigate("/messages/type/all", { replace: true });
    }
  }, [loading, message, navigate]);

  const handleEdit = () => {
    navigate("/messages/write", { state: { message, mode: "edit" } });
  };

  const handleDelete = () => {
    if (!messageId) return;
    setLoading(true);
    deleteMessageByIdApi(messageId, token)
      .then((result) => {
        if (result.success) {
          console.log("Meddelandet är borttaget!");
          navigate("/messages/type/mine");
        } else {
          setError(result.message);
        }
      })
      .finally(() => setLoading(false));
  };

  const handleBack = () => {
    navigate("/messages/type/all");
  };

  return (
    <section className="page single-message-page">
      {loading && <p>Laddar meddelande...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && message && (
        <MessageView
          mode={mode}
          initialText={message.text}
          author={message.username}
          onEdit={isOwner ? handleEdit : null}
          onDelete={isOwner ? handleDelete : null}
          onBack={handleBack} // alltid visa tillbaka-knapp
        />
      )}
    </section>
  );
};
