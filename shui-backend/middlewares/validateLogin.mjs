import { loginSchema } from "../models/loginSchema.mjs";

export const validateLogin = () => ({
  before: (handler) => {
    if (!handler.event.body) throw new Error("No body provided");
    const { error, value } = loginSchema.validate(handler.event.body);
    if (error) throw new Error(error.details[0].message);
    return;
  },
});
