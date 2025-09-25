import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { sendResponse } from "../../../responses/index.mjs";
import { throwError } from "../../../responses/throwError.mjs";
import { getUser } from "../../../services/users.mjs";
import { errorHandler } from "../../../middlewares/errorHandler.mjs";
import { validateLogin } from "../../../middlewares/validateLogin.mjs";
import { generateToken } from "../../../utils/jwt.mjs";
import { comparePasswords } from "../../../utils/bcrypt.mjs";

export const handler = middy(async (event) => {
  const response = await getUser(event.body.username);
  if (!response) {
    throwError("User not found", 404);
  }

  const passwordValid = await comparePasswords(event.body.password, response.password);
  if (!passwordValid) {
    throwError("Wrong password", 401);
  }
  const token = generateToken({ username: response.username, role: response.role });

  return sendResponse(200, {
    success: true,
    message: `${response.username} logged in successfully`,
    role: response.role,
    token: `Bearer ${token}`,
  });
})
  .use(httpJsonBodyParser())
  .use(validateLogin())
  .use(errorHandler());
