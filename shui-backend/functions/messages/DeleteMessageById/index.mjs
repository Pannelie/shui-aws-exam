import middy from "@middy/core";
import { throwError } from "../../../responses/throwError.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";
import { deleteMessage, getMessageById } from "../../../services/messages.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //400 = bad request
  }

  const message = await getMessageById(messageId);

  if (message.username !== event.user.username) {
    throwError("Forbidden: Cannot delete someone else's message", 403);
  }

  const deleteResult = await deleteMessage(messageId);

  return sendResponse(200, {
    message: "Message deleted successfully!",
    deletedMessage: formatMessageResponse(deleteResult.deletedMessage),
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
