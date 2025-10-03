import { getMessageByIdApi } from "../api/messages";

export const fetchMessageById = async (messageId, token) => {
  if (!messageId || !token) {
    throw new Error("Ogiltigt ID eller token saknas");
  }
  try {
    const result = await getMessageByIdApi(messageId, token);
    if (!result.success) throw new Error(result.message);
    return result.data;
  } catch (error) {
    console.error("Error fetching message by ID:", error);
    throw error;
  }
};
