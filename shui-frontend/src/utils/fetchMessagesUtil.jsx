import { getMessagesApi, getMessagesByUserApi } from "../api/messages";

export const fetchMessagesUtil = async ({ username, token }) => {
  console.log("fetchMessagesUtil called with:", username, token);
  try {
    let result;
    if (username === "all") {
      result = await getMessagesApi(token);
    } else {
      result = await getMessagesByUserApi(token, username);
    }
    return result;
  } catch (error) {
    console.error("Error fetching messages:", error);
    return { success: false, message: "Något gick fel vid hämtning av meddelanden" };
  }
};
