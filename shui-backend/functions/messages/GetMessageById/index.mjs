import middy from "@middy/core";
import { throwError } from "../../../responses/throwError.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { getMessageById } from "../../../services/messages.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //= bad request
  }

  const message = await getMessageById(messageId);

  if (!message) {
    throwError("Message not found", 404);
  }
  return sendResponse(200, {
    message: "Message fetched successfully!",
    messageData: formatMessageResponse(message),
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
