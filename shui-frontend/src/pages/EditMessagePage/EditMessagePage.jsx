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

  const token = user?.token || localStorage.getItem("token");

  const isEdit = !!params.messageId || mode === "edit";

  console.log(`this is mode: ${mode}`);
  console.log(`this is isEdit: ${isEdit}`);

  useEffect(() => {
    if (!token) return;

    const fetchMessage = async () => {
      if (isEdit && !existingMessage && params.messageId) {
        setLoading(true);

        const result = await fetchMessageById(params.messageId, token);

        if (result.success) {
          setExistingMessage(result.data);
          setMode("edit");
        } else {
          console.error("Kunde inte hämta meddelande:", result.message);
          setError(result.message);
        }
        setLoading(false);
      }
    };
    fetchMessage();
  }, [isEdit, existingMessage, params.messageId, token]);

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
      {loading && <LoadingIcon />}
      <MessageView
        mode={mode}
        initialText={existingMessage?.text || ""}
        onSave={handleSave}
        onBack={handleBack}
        onEdit={existingMessage ? handleEdit : undefined}
        author={existingMessage?.username}
      />
      {error && <InfoMessage text={error} className="info--error" />}
    </Layout>
  );
};
