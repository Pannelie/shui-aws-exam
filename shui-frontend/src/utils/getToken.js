export const getToken = () => {
  return JSON.parse(localStorage.getItem("user"))?.token || localStorage.getItem("token");
};
