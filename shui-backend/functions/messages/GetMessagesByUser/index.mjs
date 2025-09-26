import middy from "@middy/core";
import { throwError } from "../../../responses/throwError.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { getMessagesByUser } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { formatCountMessage } from "../../../utils/formatCountMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const username = event.pathParameters?.username;
  //eftersom det är användarnamn så behåller jag case-sensitive

  if (!username) throwError("Missing username in path parameters", 400); //400 = bad request

  const messages = await getMessagesByUser(username);
  const count = messages?.length ?? 0;

  return sendResponse(200, {
    success: true,
    message: count === 0 ? `No messages to show by ${username}` : `${formatCountMessage(count, "message")} by ${username}`,
    messages: count > 0 ? messages.map(formatMessageResponse) : [],
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
