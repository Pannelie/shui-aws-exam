import "./editMessagePage.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUserStore } from "../../stores/useUserStore";
import { useAudio } from "../../hooks/useAudio";
import { MessageView } from "../../components/MessageView/MessageView";
import { Layout } from "../../components/Layout/Layout";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { Header } from "../../components/Header/Header";
import { LoadingIcon } from "../../components/LoadingIcon/LoadingIcon";
import writeSound from "../../assets/sounds/write.mp3";
import { fetchMessageById } from "../../utils/fetchMessageById";
import { saveMessage } from "../../utils/saveMessage";
import { getToken } from "../../utils/getToken";
import { useFetchMessage } from "../../hooks/useFetchMessage";

export const EditMessagePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  console.log("Ljudfil URL:", writeSound);
  const [writeRef, playWrite] = useAudio(writeSound, { startTime: 0.5, endTime: null });

  const [existingMessage, setExistingMessage] = useState(location.state?.message || null);
  const [mode, setMode] = useState(location.state?.mode || "write");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = getToken();

  const isEdit = !!params.messageId || mode === "edit";

  console.log(`this is mode: ${mode}`);
  console.log(`this is isEdit: ${isEdit}`);

  const {
    message: fetchedMessage,
    loading: loadingMessage,
    error: fetchError,
  } = useFetchMessage({
    messageId: isEdit ? params.messageId : null,
    token,
  });

  useEffect(() => {
    if (fetchedMessage && !existingMessage) {
      setExistingMessage(fetchedMessage);
      setMode("edit");
    }
  }, [fetchedMessage, existingMessage]);

  const handleSave = async (newText) => {
    console.log("handleSave called!", newText);
    if (!newText) return;

    try {
      const result = await saveMessage({ mode, messageId: existingMessage?.messageId, token, text: newText });

      const redirectUrl = mode === "edit" ? `/messages/id/${existingMessage.messageId}` : `/messages/type/${user?.username?.toLowerCase()}`;

      if (result.success) {
        playWrite(() => {
          navigate(redirectUrl, {
            state: mode === "edit" ? { message: { ...existingMessage, text: newText } } : undefined,
          });
        });
      } else {
        setError(result.message);
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => navigate(-1);
  const handleEdit = () => setMode("edit");

  return (
    <Layout className="page--less-gap">
      <Header showSwitch={false} />
      {loading || loadingMessage ? <LoadingIcon /> : null}

      <MessageView
        mode={mode}
        initialText={existingMessage?.text || ""}
        onSave={handleSave}
        onBack={handleBack}
        onEdit={existingMessage ? handleEdit : undefined}
        author={existingMessage?.username}
      />
      {(error || fetchError) && <InfoMessage text={error || fetchError} className="info--error" />}
    </Layout>
  );
};
