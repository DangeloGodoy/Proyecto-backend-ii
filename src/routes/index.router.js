import { Router } from "express";
import viewsRouter from "./views.router.js";
import { apiRouter } from "./api.router.js";

export const router = Router();

router.use("/", viewsRouter);
router.use("/api", apiRouter);
