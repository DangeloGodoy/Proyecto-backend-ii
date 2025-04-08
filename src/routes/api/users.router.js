import { Router } from "express";
import { usersManager } from "../../data/mongo/managers/manager.mongo.js";

const usersRouter = Router();

const createOne = async(req, res, netx) => {
    try {
        const data = req.body;
        const response = await usersManager.createOne(data);
        res.status(201).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        netx(error)
    }
};
const readAll = async (req, res, netx) => {
    try {
        const filter = req.query;
        const response = await usersManager.readAll(filter);
        if (response.length === 0) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        netx(error)
    }
};
const readById = async (req, res, netx) => {
    try {
        const { uid } = req.params;
        const response = await usersManager.readById(uid);
        if (!response) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        netx(error)
    }
};
const updateById = async (req, res, netx) => {
    try {
        const { uid } = req.params;
        const data = req.body;
        const response = await usersManager.updateById(uid, data);
        if (!response) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        netx(error)
    }
};    
const deleteById = async (req, res, netx) => {
    try {
        const { uid } = req.params;
        const response = await usersManager.destoyById(uid);
        if (!response) {
            const error = new Error("Not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        netx(error)
    }
};

usersRouter.post("/", createOne);
usersRouter.get("/", readAll);
usersRouter.get("/:uid", readById);
usersRouter.put("/:uid", updateById);
usersRouter.delete("/uid", deleteById);

export default usersRouter;