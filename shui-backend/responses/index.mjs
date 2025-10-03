import { formatDateForResponse } from "../utils/date.mjs";

export const sendResponse = (code, data) => {
  return {
    statusCode: code,
    body: JSON.stringify({
      ...data,
    }),
  };
};

export const formatMessageResponse = (item) => ({
  username: item.username,
  text: item.text,
  messageId: item.messageId,
  createdAt: formatDateForResponse(item.createdAt),
  createdAtUTC: item.createdAt, //innehåller mikrosekunder, bra för specifik sortering
});
