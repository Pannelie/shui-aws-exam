import { getMessageByIdApi } from "../api/messages";

export const fetchMessageById = async (messageId, token) => {
  try {
    const result = await getMessageByIdApi(messageId, token);
    if (!result.success) throw new Error(result.message);
    return result.data;
  } catch (err) {
    console.error("Error fetching message by ID:", err);
    throw err;
  }
};
