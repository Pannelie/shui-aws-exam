export const sortMessagesArray = (messages, option) => {
  const sorted = [...messages];
  switch (option) {
    case "date_asc":
      sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      break;
    case "date_desc":
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      break;
    case "sender_asc":
      sorted.sort((a, b) => a.username.localeCompare(b.username));
      break;
    case "sender_desc":
      sorted.sort((a, b) => b.username.localeCompare(a.username));
      break;
  }
  return sorted;
};
