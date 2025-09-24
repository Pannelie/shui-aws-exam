import { formatDateForResponse } from "./date.mjs";

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
});
