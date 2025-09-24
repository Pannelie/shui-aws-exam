import middy from "@middy/core";
import { getMessages } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { sendResponse } from "../../../responses/index.mjs";
export const handler = middy(async (event) => {
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return sendResponse(200, {
      success: true,
      message: `No messages to show`,
    });
  }

  return sendResponse(200, {
    success: true,
    message: `These are the avaiable messages`,
    messages: messages.map(formatMessageResponse),
  });
});
