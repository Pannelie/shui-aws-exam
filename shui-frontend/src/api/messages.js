import axios from "axios";

const baseURL = "https://t0woxk6mb6.execute-api.eu-north-1.amazonaws.com";

export const getMessagesApi = async (token, type = "all") => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };
  // console.log(`Detta är token: ${token}`);

  return await axios
    .get(`${baseURL}/api/messages/type/${type}`, {
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
export const getMessagesByUserApi = async (token, username) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };
  if (!username) return { success: false, message: "Användarnamn saknas" };

  const url = `/api/messages/type/${username}`;

  try {
    const response = await axios.get(`${baseURL}${url}`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
    });

    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || `Kunde inte hämta meddelanden för ${username}`,
    };
  }
};

export const getMessageByIdApi = async (messageId, token) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };

  return await axios
    .get(`${baseURL}/api/messages/id/${messageId}`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
      },
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((error) => {
      return { success: false, message: error.response?.data?.message || "Kunde inte hämta meddelandet" };
    });
};

export const postMessageApi = async (token, text) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };

  return await axios
    .post(
      `${baseURL}/api/messages`,
      { text },
      {
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => ({ success: true, data: response.data }))
    .catch((error) => {
      return {
        success: false,
        message: error.response?.data?.message || "Misslyckades att skapa meddelande",
      };
    });
};

export const updateMessageByIdApi = async (messageId, token, text) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };

  return await axios
    .put(
      `${baseURL}/api/messages/${messageId}`,
      { text },
      {
        headers: {
          Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((error) => {
      return { success: false, message: error.response?.data?.message || "Kunde inte uppdatera meddelandet" };
    });
};

export const deleteMessageByIdApi = async (messageId, token) => {
  if (!token) return { success: false, message: "Ingen token tillgänglig" };

  return await axios
    .delete(`${baseURL}/api/messages/${messageId}`, {
      headers: {
        Authorization: token.startsWith("Bearer ") ? token : `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return { success: true, data: response.data };
    })
    .catch((error) => {
      return { success: false, message: error.response?.data?.message || "Kunde inte hämta meddelandet" };
    });
};
