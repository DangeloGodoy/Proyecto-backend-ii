import { Router } from "express";

const cartsRouter = Router();

const createOne = (req, res, netx) => {
    try {
        
    } catch (error) {
        netx(error)
    }
};
const readAll = (req, res, netx) => {
    try {
        
    } catch (error) {
        netx(error)
    }
};
const readById = (req, res, netx) => {
    try {
        
    } catch (error) {
        netx(error)
    }
};
const updateById = (req, res, netx) => {
    try {
        
    } catch (error) {
        netx(error)
    }
};    
const deleteById = (req, res, netx) => {
    try {
        
    } catch (error) {
        netx(error)
    }
};

cartsRouter.post("/", createOne);
cartsRouter.get("/", readAll);
cartsRouter.get("/:uid", readById);
cartsRouter.put("/:uid", updateById);
cartsRouter.delete("/uid", deleteById);

export default cartsRouter;