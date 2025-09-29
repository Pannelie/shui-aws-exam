import axios from "axios";

export const getMessagesApi = async (token, type = "all") => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };
  console.log(`Detta är token: ${token}`);
  const baseURL = "https://t0woxk6mb6.execute-api.eu-north-1.amazonaws.com";

  return await axios
    .get(`${baseURL}/api/messages/${type}`, {
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
