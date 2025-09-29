import axios from "axios";

const baseURL = "https://t0woxk6mb6.execute-api.eu-north-1.amazonaws.com";

export const loginApi = async (data) => {
  return await axios
    .post(`${baseURL}/api/auth/login`, data)
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
    .post(`${baseURL}/api/auth/register`, data)
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
