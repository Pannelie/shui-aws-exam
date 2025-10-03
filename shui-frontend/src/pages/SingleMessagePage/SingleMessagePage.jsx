import "./singleMessagePage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMessageByIdApi, deleteMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { MessageView } from "../../components/MessageView/MessageView";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { useAudio } from "../../hooks/useAudio";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import crumpleSound from "../../assets/sounds/crumple-paper.mp3";
import trashSound from "../../assets/sounds/paper-bin-toss.mp3";

export const SingleMessagePage = () => {
  const { messageId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  const { user } = useUserStore();
  const token = user?.token || localStorage.getItem("token");

  const [crumpleRef, playCrumple] = useAudio(crumpleSound);
  const [trashRef, playTrash] = useAudio(trashSound);

  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteFeedback, setDeleteFeedback] = useState(false);

  const [message, setMessage] = useState(state?.message || null);
  const [loading, setLoading] = useState(!state?.message);
  const [error, setError] = useState("");

  const isOwner = message && user?.username === message.username;

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
            setMessage(result.data);
          } else {
            setError(result.message);
          }
        })
        .finally(() => setLoading(false));
    }
  }, [messageId, message, token, user?.username]);

  useEffect(() => {
    if (!loading && !message) {
      navigate("/messages/type/all", { replace: true });
    }
  }, [loading, message, navigate]);

  const handleEdit = () => {
    navigate("/messages/write", { state: { message, mode: "edit" } });
  };

  const handleAuthorClick = () => {
    navigate(`/messages/type/${message.username}`, {
      state: {
        userFilter: message.username,
      },
    });
  };

  const handleDelete = () => {
    if (!messageId || isDeleting) return;
    setIsDeleting(true);

    const messageElement = document.querySelector(".message--large");
    if (messageElement) messageElement.classList.add("message--delete-animation");

    playCrumple(() => {
      // När crumple är klart, starta trash-ljud
      if (trashRef.current) {
        // Visa feedback samtidigt som trash-ljudet startar
        setDeleteFeedback(true);

        playTrash();

        // Gör API-anropet parallellt med trash-ljudet
        deleteMessageByIdApi(messageId, token).then((result) => {
          if (result.success) {
            setTimeout(() => {
              navigate(`/messages/type/${user.username}`, {
                state: { userFilter: user.username }, // ⚡ sätt filter
              });
            }, 1400);
          } else {
            setError(result.message);
          }
        });
      }
    });
  };
  const handleBack = () => {
    navigate("/messages/type/all");
  };

  return (
    <Layout className="page--less-gap">
      <Header showSwitch={false} />
      <audio ref={crumpleRef} src={crumpleSound} preload="auto" />
      <audio ref={trashRef} src={trashSound} preload="auto" />
      {loading && <LoadingIcon />}
      {deleteFeedback && (
        <div className="delete-feedback">
          <p>Ditt meddelande togs bort</p>
        </div>
      )}
      {!loading && !error && message && (
        <MessageView
          mode={"view"}
          initialText={message.text}
          author={message.username}
          onEdit={isOwner ? handleEdit : null}
          onDelete={isOwner ? handleDelete : null}
          onBack={handleBack}
          isDeleting={isDeleting}
          onAuthorClick={handleAuthorClick}
        />
      )}
      {error && <InfoMessage text={error} className="info--error" />}
    </Layout>
  );
};
