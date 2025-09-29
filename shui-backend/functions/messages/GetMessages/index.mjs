import middy from "@middy/core";
import { getMessages, getMessagesByUser } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatCountMessage } from "../../../utils/formatCountMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";

export const handler = middy(async (event) => {
  const type = event.pathParameters?.type; // "mine" eller "all"
  const user = event.user; // satt av authenticateUser-middleware
  const username = user.username;
  // const role = user.role;

  console.log("det här är inuti GetMessages");

  if (!type) throwError("Missing path parameter 'type'", 400);

  let messages = [];

  if (type === "mine") {
    console.log("Fetching messages for user:", username);
    messages = await getMessagesByUser(username);
  } else if (type === "all") {
    messages = await getMessages();
  } else {
    throwError(`Invalid type '${type}', must be 'mine' or 'all'`, 400);
  }

  const count = messages?.length ?? 0;
  return sendResponse(200, {
    success: true,
    message:
      count === 0
        ? type === "mine"
          ? "Du har inga meddelanden"
          : "Inga meddelanden att visa"
        : `${formatCountMessage(count, "message")} ${type === "mine" ? "för dig" : "i total"}`,
    messages: messages.map(formatMessageResponse),
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
