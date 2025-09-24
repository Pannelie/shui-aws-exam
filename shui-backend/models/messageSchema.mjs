import Joi from "joi";

export const messageSchema = Joi.object({
  id: Joi.string().min(4).required(),
  username: Joi.string().min(3).required(),
  text: Joi.string().min(2).required(),
  createdAt: Joi.string()
    .forbidden()
    .default(() => new Date().toISOString(), "current timestamp"),
});
