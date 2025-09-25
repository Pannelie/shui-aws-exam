import Joi from "joi";

export const messageSchema = Joi.object({
  // username: Joi.string().min(3).required(),
  text: Joi.string().min(2).required(),
});
