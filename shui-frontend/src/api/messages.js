import axios from "axios";

export const getMessagesApi = async (token) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };
  console.log(`Detta är token: ${token}`);

  return await axios
    .get("https://7yopm55nba.execute-api.eu-north-1.amazonaws.com/api/messages", {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((error) => {
      return {
        success: false,
        message: error.response?.data?.message || "Något gick fel",
      };
    });
};
