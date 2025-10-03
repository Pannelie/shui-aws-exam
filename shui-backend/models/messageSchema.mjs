import Joi from "joi";
//resonerar att det enda jag vill att user kontrollerar är sin text
// Username, createdAt och messageId ska komma automatiskt senare
export const messageSchema = Joi.object({
  text: Joi.string().min(2).required(),
});
