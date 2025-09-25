import { userSchema } from "../models/userSchema.mjs";

export const validateUser = () => ({
  before: (handler) => {
    if (!handler.event.body) throw new Error("No body provided");
    const { error, value } = userSchema.validate(handler.event.body);
    if (error) throw new Error(error.details[0].message);
    return;
  },
});
