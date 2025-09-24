export const formatDateForResponse = (date) => {
  if (!date) return null;
  return new Date(date).toISOString().split("T")[0]; // YYYY-MM-DD
};
