import { verifyToken } from "../helpers/token.helper.js";

export const isAdmin = (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    if (!headers || !headers.startsWith("Bearer ")) {
      const error = new Error("Forbidden: No token provided");
      error.statusCode = 403;
      throw error;
    }
    const token = headers.split(" ")[1];
    const data = verifyToken(token);
    if (data.role !== "ADMIN") {
      const error = new Error("Forbidden: Not an admin");
      error.statusCode = 403;
      throw error;
    }
    next();
  } catch (error) {
    next(error);
  }
};
