import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { addMessage } from "../../../services/messages.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";
import { validateMessage } from "../../../middlewares/validateMessage.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { throwError } from "../../../responses/throwError.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const message = await addMessage({
    text: event.body.text,
    username: event.user.username,
  });

  if (!message.success) {
    throwError("Could not create message", 400);
  }
  return sendResponse(201, {
    success: true,
    message: `Successfully posted message`,
    messageData: formatMessageResponse(message),
  });
})
  .use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(validateMessage())
  .use(errorHandler());
