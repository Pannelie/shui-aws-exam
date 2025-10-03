import { MessageView } from "../../components/MessageView/MessageView";
import "./editMessagePage.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { postMessageApi, updateMessageByIdApi, getMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { Layout } from "../../components/Layout/Layout";
import writeSound from "../../assets/sounds/write.mp3";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";
import { useAudio } from "../../hooks/useAudio";
import { Header } from "../../components/Header/Header";

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
        const result = await getMessageByIdApi(params.messageId, token);
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
      let result;
      let redirectUrl;

      if (mode === "edit" && existingMessage?.messageId) {
        result = await updateMessageByIdApi(existingMessage.messageId, token, newText);
        redirectUrl = `/messages/id/${existingMessage.messageId}`;
      } else {
        result = await postMessageApi(token, newText);
        redirectUrl = "/messages/type/mine";
      }

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
    <Layout>
      <Header showSwitch={false} />
      {loading && <InfoMessage text="laddar..." className="info--normal" />}
      {error && <InfoMessage text={error} className="info--error" />}
      <MessageView
        mode={mode}
        initialText={existingMessage?.text || ""}
        onSave={handleSave}
        onBack={handleBack}
        onEdit={existingMessage ? handleEdit : undefined}
        author={existingMessage?.username}
      />
    </Layout>
  );
};
