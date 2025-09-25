import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { addUser } from "../../../services/users.mjs";
import { sendResponse } from "../../../responses/index.mjs";
import { validateUser } from "../../../middlewares/validateUser.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { throwError } from "../../../responses/throwError.mjs";

export const handler = middy(async (event) => {
  const userData = {
    ...event.body,
    role: event.body.role || "USER", // default till USER
  };
  console.log("Checking if user exists with username:", userData.username);

  const response = await addUser(userData);
  //response=== true om lyckat

  if (!response.success) {
    const status = response.message === "User already exists" ? 400 : 500;
    throwError(response.message, status);
  }

  return sendResponse(201, { message: "User created successfully" });
})
  .use(httpJsonBodyParser())
  .use(validateUser())
  .use(errorHandler());
