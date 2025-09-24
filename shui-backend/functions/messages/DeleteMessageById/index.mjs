import middy from "@middy/core";
import { throwError } from "../../../responses/throwError.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";
import { deleteMessage } from "../../../services/messages.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //400 = bad request
  }

  const result = await deleteMessage(messageId);

  if (!result.success) {
    throwError(result.message || "Failed to update message", 500);
  }

  return sendResponse(200, { message: "Message deleted successfully!", deletedMessage: formatMessageResponse(result.deletedMessage) });
}).use(errorHandler());
