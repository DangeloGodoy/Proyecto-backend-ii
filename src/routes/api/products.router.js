import { Router } from "express";

const productsRouter = Router();

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

productsRouter.post("/", createOne);
productsRouter.get("/", readAll);
productsRouter.get("/:uid", readById);
productsRouter.put("/:uid", updateById);
productsRouter.delete("/uid", deleteById);

export default productsRouter;