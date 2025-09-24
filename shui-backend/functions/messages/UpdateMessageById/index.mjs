import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { throwError } from "../../../responses/throwError.mjs";
import { validateMessageUpdate } from "../../../middlewares/validateMessageUpdate.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { updateMessage } from "../../../services/messages.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";

export const handler = middy(async (event) => {
  const messageId = event.pathParameters?.id;
  const updatedText = event.body;

  if (!messageId) {
    throwError("Missing messageId in path parameters", 400); //400 = bad request
  }

  const result = await updateMessage(messageId, updatedText);

  if (!result.success) {
    throwError(result.message || "Failed to update message", 500);
  }

  return sendResponse(200, { message: "Message updated successfully!", updatedMessage: formatMessageResponse(result.updatedMessage) });
})
  .use(httpJsonBodyParser())
  .use(validateMessageUpdate())
  .use(errorHandler());
