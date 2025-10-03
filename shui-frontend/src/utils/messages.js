export const sortMessages = (messages, sortOrder) => {
  return [...messages].sort((a, b) => {
    switch (sortOrder) {
      case "date_asc":
        return new Date(a.createdAtUTC) - new Date(b.createdAtUTC);
      case "date_desc":
        return new Date(b.createdAtUTC) - new Date(a.createdAtUTC);
      case "sender_asc":
        return a.username.localeCompare(b.username);
      case "sender_desc":
        return b.username.localeCompare(a.username);
      default:
        return 0;
    }
  });
};

export const filterMessagesByUser = (messages, username) => {
  if (!username) return messages;
  return messages.filter((msg) => msg.username === username);
};
