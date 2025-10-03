import middy from "@middy/core";
import { getMessages, getMessagesByUser } from "../../../services/messages.mjs";
import { formatMessageResponse } from "../../../responses/index.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { formatCountMessage } from "../../../utils/formatCountMessage.mjs";
import { authenticateUser } from "../../../middlewares/authenticateUser.mjs";
import { authorizeRole } from "../../../middlewares/authorizeRole.mjs";
import { throwError } from "../../../responses/throwError.mjs";

export const handler = middy(async (event) => {
  const type = event.pathParameters?.type; // "username" eller "all"
  const user = event.user; // satt av authenticateUser-middleware
  const username = user.username;
  // const role = user.role;

  console.log("det här är inuti GetMessages");

  if (!type) throwError("Missing path parameter 'type'", 400);

  let messages = [];

  if (type === "all") {
    console.log("Fetching messages for user:", username);
    messages = await getMessages();
  } else {
    console.log(`Hämtar meddelanden för användare: ${type}`);
    messages = await getMessagesByUser(type);
    //bättre htrowError
  }

  const count = messages?.length ?? 0;
  return sendResponse(200, {
    success: true,
    message:
      count === 0
        ? type === "all"
          ? "Inga meddelanden att visa"
          : `Användaren '${type}' har inga meddelanden`
        : `${formatCountMessage(count, "message")} ${type === "all" ? "i total" : `från ${type}`}`,
    messages: messages.map(formatMessageResponse),
  });
})
  .use(authenticateUser())
  .use(authorizeRole(["USER"]))
  .use(errorHandler());
