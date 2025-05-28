import { verifyToken } from "../helpers/token.helper.js";
import { usersManager } from "../data/dao.factory.js";

export const isUser = async (req, res, next) => {
  try {
    const headers = req?.headers?.authorization;
    if (!headers || !headers.startsWith("Bearer ")) {
      const error = new Error("Unauthorized access");
      error.statusCode = 401;
      throw error;
    }
    const token = headers.split(" ")[1];
    const data = verifyToken(token);
    const user = await usersManager.readById(data.user_id);
    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
