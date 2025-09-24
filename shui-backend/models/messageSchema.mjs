import Joi from "joi";
import { generateShortId } from "../utils/generateShortId.mjs";

export const messageSchema = Joi.object({
  id: Joi.string()
    .forbidden()
    .default(() => generateShortId(), "auto-generated UUID"),
  username: Joi.string().min(3).required(),
  text: Joi.string().min(2).required(),
  createdAt: Joi.string()
    .forbidden()
    .default(() => new Date().toISOString(), "current timestamp"),
});
