import { verifyToken } from "../utils/jwt.mjs";
import { throwError } from "../responses/throwError.mjs";

export const authenticateUser = () => ({
  before: (handler) => {
    const authHeader = handler.event.headers?.Authorization || handler.event.headers?.authorization; //skickas det med stor eller liten bokstav, extra kontroll

    if (!authHeader) throwError("Missing Authorization header", 401);

    const token = authHeader.split(" ")[1]; // dela upp vid första mellanslaget, och ta plats 1 i array
    if (!token) throwError("Invalid Authorization header", 401);
    try {
      const user = verifyToken(token);
      console.log(`Token: ${token}`);
      if (!user) throw new Error("Unauthorized");
      handler.event.user = user;
    } catch (error) {
      console.log("ERROR in authenticateUser():", error.message);
      throwError("Invalid token", 401);
    }
  },
});
