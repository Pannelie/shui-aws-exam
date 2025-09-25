import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

export const generateToken = (user) => {
  const payload = { username: user.username, role: user.role };
  return jwt.sign(payload, SECRET, {
    expiresIn: "1h",
  });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET);
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      console.warn("Token har gått ut.");
    } else if (error.name === "JsonWebTokenError") {
      console.warn("Ogiltig token.");
    } else {
      console.warn("Fel vid tokenverifiering:", error.message);
    }
    return null;
  }
};
