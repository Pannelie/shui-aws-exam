import { MessageView } from "../../components/MessageView/MessageView";
import "./editMessagePage.css";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { postMessageApi, updateMessageByIdApi, getMessageByIdApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { Logo } from "../../components/logo/Logo";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { Layout } from "../../components/Layout/Layout";

export const EditMessagePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  const [existingMessage, setExistingMessage] = useState(location.state?.message || null);
  const [mode, setMode] = useState(location.state?.mode || "write");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = user?.token || localStorage.getItem("token");

  const isEdit = !!params.messageId || mode === "edit";

  console.log(`this is mode: ${mode}`);
  console.log(`this is isEdit: ${isEdit}`);

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
      if (mode === "edit" && existingMessage?.messageId) {
        const result = await updateMessageByIdApi(existingMessage.messageId, token, newText);
        if (result.success) {
          navigate(`/messages/id/${existingMessage.messageId}`, {
            state: { message: { ...existingMessage, text: newText } },
          });
        } else {
          setError(result.message);
        }
      } else {
        const result = await postMessageApi(token, newText);
        if (result.success) {
          navigate("/messages/type/mine");
        } else {
          setError(result.message);
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => navigate(-1);
  const handleEdit = () => setMode("edit");

  // const handleCreateNewMessage = async (newText) => {
  //   const result = await postMessageApi(token, newText);

  //   if (result.success) {
  //     navigate("/messages/type/mine");
  //   } else {
  //     console.error(`Fel: ${result.message}`);
  //   }
  // };
  return (
    <Layout>
      {/* <section className="page edit-message-page"> */}
      <Logo />
      <LogoutButton />
      {loading && <p>Laddar meddelande...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
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
