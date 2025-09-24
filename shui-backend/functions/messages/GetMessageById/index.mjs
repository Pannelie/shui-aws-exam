import middy from "@middy/core";
import { throwError } from "../../../responses/throwError.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { updateMessage } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //400 = bad request
  }

  const result = await updateMessage(messageId, updatedText);

  if (!result.success) {
    throwError(result.message || "Failed to update message", 500);
  }

  return sendResponse(200, { message: "Message updated successfully!", updatedMessage: formatMessageResponse(result.updatedMessage) });
}).use(errorHandler());
