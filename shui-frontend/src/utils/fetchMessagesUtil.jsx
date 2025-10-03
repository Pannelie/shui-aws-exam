import { getMessagesApi, getMessagesByUserApi } from "../api/messages";

export const fetchMessagesUtil = async ({ view, token, user }) => {
  try {
    let result;
    if (view === "all") {
      result = await getMessagesApi(token);
    } else {
      const username = view === "mine" ? user?.username?.toLowerCase() : view?.toLowerCase();
      result = await getMessagesByUserApi(token, username);
    }
    return result;
  } catch (err) {
    console.error("Error fetching messages:", err);
    return { success: false, message: "Något gick fel vid hämtning av meddelanden" };
  }
};
