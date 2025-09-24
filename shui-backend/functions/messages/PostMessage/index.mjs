import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { addMessage } from "../../../services/messages.mjs";
import { formatMessageResponse, sendResponse } from "../../../responses/index.mjs";

export const handler = middy(async (event) => {
  const message = await addMessage(event.body);
  if (!message.success) {
    console.error(`Could not create message`);
    return sendResponse(400, { success: false, message: `Could not create message` });
  }
  return sendResponse(201, {
    success: true,
    message: `Successfully posted message`,
    note: formatMessageResponse(message),
  });
}).use(httpJsonBodyParser());
