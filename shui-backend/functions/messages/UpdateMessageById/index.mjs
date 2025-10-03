import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { throwError } from "../../../responses/throwError.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { validateMessage } from "../../../middlewares/validateMessage.mjs";
import { getMessageById, updateMessage } from "../../../services/messages.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;
  const { text } = event.body;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //= bad request
  }

  const message = await getMessageById(messageId);

  if (message.username !== event.user.username) {
    throwError("Forbidden: Cannot update someone else's message", 403);
  }

  const updateResult = await updateMessage(messageId, { text });

  return sendResponse(200, {
    message: "Message updated successfully!",
    updatedMessage: formatMessageResponse(updateResult.updatedMessage),
  });
})
  .use(httpJsonBodyParser())
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(validateMessage())
  .use(errorHandler());
