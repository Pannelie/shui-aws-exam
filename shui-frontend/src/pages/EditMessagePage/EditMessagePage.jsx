import { MessageView } from "../../components/MessageView/MessageView";
import "./editMessagePage.css";
import { useNavigate, useLocation } from "react-router-dom";
import { postMessageApi } from "../../api/messages";
import { useUserStore } from "../../stores/useUserStore";
import { Logo } from "../../components/logo/Logo";
import { LogoutButton } from "../../components/LogoutButton/LogoutButton";
import { updateMessageByIdApi } from "../../api/messages";

export const EditMessagePage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useUserStore();
  const token = user?.token || localStorage.getItem("token");

  const isEdit = state?.mode === "edit";
  const existingMessage = state?.message;

  const handleSave = async (newText) => {
    if (isEdit && existingMessage) {
      const result = await updateMessageByIdApi(existingMessage.messageId, token, newText);
      console.log("result från updatemessagebyidApi" + result);

      if (result.success) {
        console.log("Meddelandet uppdaterades!");
        navigate(`/messages/id/${existingMessage.messageId}`);
      } else {
        console.error(`Fel vid uppdatering: ${result.message}`);
      }
    } else {
      const result = await postMessageApi(token, newText);

      if (result.success) {
        navigate("/messages/type/mine");
      } else {
        console.error(`Fel: ${result.message}`);
      }
    }
  };

  // const handleCreateNewMessage = async (newText) => {
  //   const result = await postMessageApi(token, newText);

  //   if (result.success) {
  //     navigate("/messages/type/mine");
  //   } else {
  //     console.error(`Fel: ${result.message}`);
  //   }
  // };
  return (
    <section className="page edit-message-page">
      <Logo />
      <LogoutButton />
      <MessageView mode="write" initialText={existingMessage?.text || ""} onSave={handleSave} />
    </section>
  );
};
