import middy from "@middy/core";
import { sendResponse } from "../../../responses/index.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";

export const handler = middy(async (username) => {
  return sendResponse(
    200,
    { success: true, message: `Successfully logged out ${username}` },
    { "Set-Cookie": "token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0" }
  );
}).use(errorHandler());
