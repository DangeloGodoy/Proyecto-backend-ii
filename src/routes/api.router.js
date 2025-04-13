import { Router } from "express";
import usersRouter from "./api/users.router.js";
import cookieRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/carts", cartsRouter);
apiRouter.use("/cookies", cookieRouter);
apiRouter.use("/sessions", sessionsRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/products", productsRouter);
