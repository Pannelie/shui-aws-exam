import { postMessageApi, updateMessageByIdApi } from "../api/messages";

export const saveMessage = async ({ mode, messageId, token, text }) => {
  if (!text) throw new Error("Inget textinnehåll att spara");

  if (mode === "edit" && messageId) {
    const result = await updateMessageByIdApi(messageId, token, text);
    if (!result.success) throw new Error(result.message);
    return result;
  } else {
    const result = await postMessageApi(token, text);
    if (!result.success) throw new Error(result.message);
    return result;
  }
};
