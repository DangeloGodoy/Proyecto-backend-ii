import { Router } from "express";
import usersRouter from "./api/users.router.js";
import cookieRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";

const apiRouter = Router();

apiRouter.use("/cookies", cookieRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;