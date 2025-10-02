import { MessageView } from "../../components/MessageView/MessageView";
import "./editMessagePage.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { postMessageApi, updateMessageByIdApi, getMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { Logo } from "../../components/logo/Logo";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { Layout } from "../../components/Layout/Layout";
import writeSound from "../../assets/sounds/write.mp3";
import { InfoMessage } from "../../components/InfoMessage/InfoMessage";

export const EditMessagePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  console.log("Ljudfil URL:", writeSound);
  const writeRef = useRef(null);

  const [existingMessage, setExistingMessage] = useState(location.state?.message || null);
  const [mode, setMode] = useState(location.state?.mode || "write");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = user?.token || localStorage.getItem("token");

  const isEdit = !!params.messageId || mode === "edit";

  console.log(`this is mode: ${mode}`);
  console.log(`this is isEdit: ${isEdit}`);

  useEffect(() => {
    const write = new Audio(writeSound);
    write.preload = "auto";
    writeRef.current = write;

    write.load();
  }, []);

  useEffect(() => {
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
        if (writeRef.current) {
          writeRef.current.currentTime = 0;
          writeRef.current
            .play()
            .then(() => {
              writeRef.current.onended = () => {
                navigate(redirectUrl, {
                  state: mode === "edit" ? { message: { ...existingMessage, text: newText } } : undefined,
                });
              };
            })
            .catch((error) => {
              console.warn("Ljudet kunde inte spelas:", error);
              // Fallback: Navigera direkt om ljud inte kunde spelas
              navigate(redirectUrl, {
                state: mode === "edit" ? { message: { ...existingMessage, text: newText } } : undefined,
              });
            });
        } else {
          navigate(redirectUrl, {
            state: mode === "edit" ? { message: { ...existingMessage, text: newText } } : undefined,
          });
        }
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
      <Logo />
      <LogoutButton />
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
