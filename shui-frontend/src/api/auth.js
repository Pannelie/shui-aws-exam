import axios from "axios";

export const loginApi = async (data) => {
  return await axios
    .post("https://7yopm55nba.execute-api.eu-north-1.amazonaws.com/api/auth/login", data)
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

export const registerApi = async (data) => {
  return await axios
    .post("https://7yopm55nba.execute-api.eu-north-1.amazonaws.com/api/auth/register", data)
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
