import middy from "@middy/core";
import { getMessages } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatCountMessage } from "../../../utils/formatCountMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const messages = await getMessages();
  const count = messages?.length ?? 0;

  return sendResponse(200, {
    success: true,
    message: count === 0 ? "No messages to show" : formatCountMessage(count, "message"),
    messages: count > 0 ? messages.map(formatMessageResponse) : [],
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
