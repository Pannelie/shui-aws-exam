import Joi from "joi";

export const userSchema = Joi.object({
  username: Joi.string().min(3).required(),
  password: Joi.string()
    .alphanum()
    .min(4)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/)
    .messages({
      "string.pattern.base": "Lösenord behöver en stor bokstav, en liten bokstav och en siffra",
    })
    .required(),
  email: Joi.string().email().required(),
  role: Joi.string().forbidden(),
});
//jag vill inte att användaren själv väljer role
