import { Router } from "express";
import { productsManager } from "../../data/mongo/managers/manager.mongo.js";
import { passportCb } from "../../middlewares/passportCb.mid.js";
import { Types } from "mongoose";

const productsRouter = Router();

const createOne = async (req, res, next) => {
  try {
    const data = req.body;
    const response = await productsManager.createOne(data);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const readAll = async (req, res, next) => {
  try {
    const response = await productsManager.readAll();
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const readById = async (req, res, next) => {
  try {
    const data = req.params;
    const response = await productsManager.readById(data.pid);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const updateById = async (req, res, next) => {
  try {
    const data = req.params;
    const updateData = req.body;
    const response = await productsManager.updateById(data.pid, updateData);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const deleteById = async (req, res, next) => {
  try {
    const data = req.params;
    const response = await productsManager.deleteById(data.pid);
    res.status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const pidParam = async (req, res, next, pid) => {
  try {
    const isObjectId = Types.ObjectId.isValid(pid);
    if (!isObjectId) {
      const error = new Error("Invalid product ID");
      error.statusCode = 400;
      throw error;
    }
    return next();
  } catch (error) {
    next(error);
  }
};

productsRouter.param("pid", pidParam);
productsRouter.post("/", passportCb("admin"), createOne);
productsRouter.get("/", readAll);
productsRouter.get("/:pid", readById);
productsRouter.put("/:pid", passportCb("admin"), updateById);
productsRouter.delete("/pid", passportCb("admin"), deleteById);

export default productsRouter;
