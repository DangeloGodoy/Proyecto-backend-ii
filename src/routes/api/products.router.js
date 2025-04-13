import CustomRouter from "../custom.router.js";
import { productsManager } from "../../data/mongo/managers/manager.mongo.js";
import { passportCb } from "../../middlewares/passportCb.mid.js";
import { Types } from "mongoose";

const createOne = async (req, res) => {
  const data = req.body;
  const response = await productsManager.createOne(data);
  res.json201(response);
};
const readAll = async (req, res) => {
  const response = await productsManager.readAll();
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  });
};
const readById = async (req, res) => {
  const data = req.params;
  const response = await productsManager.readById(data.pid);
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  });
};
const updateById = async (req, res) => {
  const data = req.params;
  const updateData = req.body;
  const response = await productsManager.updateById(data.pid, updateData);
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  });
};
const deleteById = async (req, res) => {
  const data = req.params;
  const response = await productsManager.deleteById(data.pid);
  res.status(200).json({
    response,
    method: req.method,
    url: req.originalUrl,
  });
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

class ProductsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", passportCb("admin"), createOne);
    this.read("/", readAll);
    this.read("/:pid", readById);
    this.update("/:pid", passportCb("admin"), updateById);
    this.destroy("/:pid", passportCb("admin"), deleteById);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;
