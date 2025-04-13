import CustomRouter from "../custom.router.js";
import { cartsManager } from "../../data/mongo/managers/carts.mongo.js";
import { passportCb } from "../../middlewares/passportCb.mid.js";

const createOne = async (req, res) => {
  const { product_id, quantity } = req.body;
  const user_id = req.user._id;
  const one = await cartsManager.createOne({ user_id, product_id, quantity });
  res.status(201).json({
    method: req.method,
    url: req.originalUrl,
    response: one,
  });
};
const readAll = (req, res) => {
  const user_id = req.user._id;
  const all = cartsManager.readAll(user_id);
  res.status(200).json({
    method: req.method,
    url: req.originalUrl,
    response: all,
  });
};
const readById = (req, res) => {
  try {
    const user_id = req.user._id;
    const uid = req.params.uid;
    const one = cartsManager.readById(user_id, uid);
    res.status(200).json({
      method: req.method,
      url: req.originalUrl,
      response: one,
    });
  } catch (error) {
    next(error);
  }
};
const updateById = (req, res) => {
  const user_id = req.user._id;
  const uid = req.params.uid;
  const { product_id, quantity } = req.body;
  const updated = cartsManager.updateById(user_id, uid, {
    product_id,
    quantity,
  });
  res.status(200).json({
    method: req.method,
    url: req.originalUrl,
    response: updated,
  });
};
const deleteById = (req, res) => {
  const user_id = req.user._id;
  const uid = req.params.uid;
  const deleted = cartsManager.deleteById(user_id, uid);
  res.status(200).json({
    method: req.method,
    url: req.originalUrl,
    response: deleted,
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

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", passportCb("current"), createOne);
    this.read("/", passportCb("current"), readAll);
    this.read("/:uid", passportCb("current"), readById);
    this.update("/:uid", passportCb("current"), updateById);
    this.destroy("/uid", passportCb("current"), deleteById);
    this.router.param("uid", pidParam);
  };
}

let cartRouter = new CartsRouter();
cartRouter = cartRouter.getRouter();
export default cartRouter;
