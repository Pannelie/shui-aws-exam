import { updatedMessageSchema } from "../models/updatedMessageSchema.mjs";
import { throwError } from "../responses/throwError.mjs";

export const validateMessageUpdate = () => ({
  before: (handler) => {
    const { error, value } = updatedMessageSchema.validate(handler.event.body);

    console.log("Error i middleware:", error);
    console.log("Validated value i middleware:", value);

    if (error) {
      throwError(error.message, 400);
    }
  },
});
