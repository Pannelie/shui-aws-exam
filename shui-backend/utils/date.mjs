export const formatDateForResponse = (date) => {
  if (!date) return null;
  const d = new Date(date);

  const datePart = d.toLocaleDateString("sv-SE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const timePart = d.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // 24-timmarsformat
  });

  return `${datePart} ${timePart}`;
};

// gör om till svensk tid och enkelt klockslag
