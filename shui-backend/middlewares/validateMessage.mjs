import { messageSchema } from "../models/messageSchema.mjs";
import { throwError } from "../responses/throwError.mjs";

export const validateMessage = () => ({
  before: (handler) => {
    const { error, value } = messageSchema.validate(handler.event.body);

    console.log("Error i middleware:", error);
    console.log("Validated value i middleware:", value);

    if (error) {
      throwError(error.message, 400);
    }
  },
});
