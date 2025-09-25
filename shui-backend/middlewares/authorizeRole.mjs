//VIKTIGT! authenticateUser körs först, och skapar event.user.role
import { throwError } from "../responses/throwError.mjs";

export const authorizeRole = (allowedRoles) => ({
  before: (handler) => {
    const user = handler.event.user;
    if (!user || !allowedRoles.includes(user.role)) {
      throwError("Forbidden", 403);
    }
  },
});
