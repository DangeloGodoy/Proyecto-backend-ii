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
  res.json200(response);
};
const readById = async (req, res) => {
  const data = req.params;
  const response = await productsManager.readById(data.pid);
  res.json200(response);
};
const updateById = async (req, res) => {
  const data = req.params;
  const updateData = req.body;
  const response = await productsManager.updateById(data.pid, updateData);
  res.json200(response);
};
const deleteById = async (req, res) => {
  const data = req.params;
  const response = await productsManager.deleteById(data.pid);
  res.json200(response);
};
const pidParam = async (req, res, next, pid) => {
  try {
    const isObjectId = Types.ObjectId.isValid(pid);
    if (!isObjectId) {
      res.json400("Invalid product ID");
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
    this.create("/", ["ADMIN"], createOne);
    this.read("/", ["PUBLIC"], readAll);
    this.read("/:pid", ["PUBLIC"], readById);
    this.update("/:pid", ["ADMIN"], updateById);
    this.destroy("/:pid", ["ADMIN"], deleteById);
    this.router.param("pid", pidParam);
  };
}

let productsRouter = new ProductsRouter();
productsRouter = productsRouter.getRouter();
export default productsRouter;
