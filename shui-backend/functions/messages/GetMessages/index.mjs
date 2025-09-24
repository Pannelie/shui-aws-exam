import middy from "@middy/core";
import { getMessages } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatCountMessage } from "../../../utils/formatCountMessage.mjs";

export const handler = middy(async (event) => {
  const messages = await getMessages();

  const count = messages?.length || 0;

  if (count === 0) {
    return sendResponse(200, {
      success: true,
      message: `No messages to show`,
    });
  }

  return sendResponse(200, {
    success: true,
    message: formatCountMessage(count, "message"),
    messages: messages.map(formatMessageResponse),
  });
}).use(errorHandler());
