import { Router } from "express";

const usersRouter = Router();

const createOne = () => {};
const readAll = () => {};
const readById = () => {};
const updateById = () => {};    
const deleteById = () => {};

usersRouter.post("/", createOne);
usersRouter.get("/", readAll);
usersRouter.get("/:uid", readById);
usersRouter.put("/:uid", updateById);
usersRouter.delete("/uid", deleteById);

export default usersRouter;