import "./singleMessagePage.css";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getMessageByIdApi, deleteMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { MessageView } from "../../components/MessageView/MessageView";
import { Layout } from "../../components/Layout/Layout";
import { Header } from "../../components/Header/Header";
import crumpleSound from "../../assets/sounds/crumple-paper.mp3";
import trashSound from "../../assets/sounds/paper-bin-toss.mp3";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { useAudio } from "../../hooks/useAudio";

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
    const crumple = new Audio(crumpleSound);
    crumple.preload = "auto";
    crumpleRef.current = crumple;

    const trash = new Audio(trashSound);
    trash.preload = "auto";
    trashRef.current = trash;
  }, []);

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
      // Om man inte hittar meddelandet, skicka tillbaka
      navigate("/messages/type/all", { replace: true });
    }
  }, [loading, message, navigate]);

  const handleEdit = () => {
    navigate("/messages/write", { state: { message, mode: "edit" } });
  };
  // ----------------------------TEST---------------------
  const handleAuthorClick = () => {
    navigate("/messages/type/all", {
      state: {
        userFilter: message.username,
      },
    });
  };

  const handleDelete = () => {
    if (!messageId || isDeleting) return; // förhindra dubbelklick
    setIsDeleting(true);

    // Starta animation (lägg till en CSS-klass som skrynklas ihop)
    // Antag att du har t.ex. .message--delete-animation som animerar ihop meddelandet
    const messageElement = document.querySelector(".message--large");
    if (messageElement) messageElement.classList.add("message--delete-animation");

    // Spela crumple-ljud
    // if (crumpleRef.current) {
    //   crumpleRef.current.currentTime = 0;
    //   crumpleRef.current.play().catch(() => {});
    //   crumpleRef.current.onended = () => {
    // När crumple är klart, spela trash-ljud
    // if (trashRef.current) {
    //   trashRef.current.currentTime = 0;
    //   trashRef.current.play().catch(() => {});
    // }
    //   };
    // }

    // Vänta animationstid innan API-call
    // const totalAnimationDuration = 900; // matcha din CSS-animationstid i ms
    // setTimeout(() => {
    playCrumple(() => {
      // När crumple är klart, starta trash-ljud
      if (trashRef.current) {
        // Visa feedback samtidigt som trash-ljudet startar
        setDeleteFeedback(true);

        playTrash();

        // Gör API-anropet parallellt med trash-ljudet
        deleteMessageByIdApi(messageId, token).then((result) => {
          if (result.success) {
            // Navigation efter feedback-tid
            setTimeout(() => navigate("/messages/type/mine"), 1400);
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
    <Layout>
      <Header showSwitch={false} />
      <audio ref={crumpleRef} src={crumpleSound} preload="auto" />
      <audio ref={trashRef} src={trashSound} preload="auto" />
      {/* <Logo /> */}
      {loading && <InfoMessage text="laddar..." className="info--normal" />}
      {error && <InfoMessage text={error} className="info--error" />}
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
          onBack={handleBack} // alltid visa tillbaka-knapp
          isDeleting={isDeleting}
          onAuthorClick={handleAuthorClick}
        />
      )}
    </Layout>
  );
};
