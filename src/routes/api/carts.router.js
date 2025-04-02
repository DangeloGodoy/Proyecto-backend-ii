import { Router } from "express";

const cartsRouter = Router();

const createOne = () => {};
const readAll = () => {};
const readById = () => {};
const updateById = () => {};    
const deleteById = () => {};

cartsRouter.post("/", createOne);
cartsRouter.get("/", readAll);
cartsRouter.get("/:uid", readById);
cartsRouter.put("/:uid", updateById);
cartsRouter.delete("/uid", deleteById);

export default cartsRouter;