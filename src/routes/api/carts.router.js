import CustomRouter from "../custom.router.js";
import { cartsManager } from "../../data/mongo/managers/carts.mongo.js";

const createOne = async (req, res) => {
  console.log(req);
  
  const { product_id, quantity } = req.body;
  const user_id = req.user._id;
  const one = await cartsManager.createOne({ user_id, product_id, quantity });
  res.json201(response);
};
const readAll = (req, res) => {
  const user_id = req.user._id;
  const all = cartsManager.readAll(user_id);
  res.json200(response);
};
const readById = (req, res) => {
  try {
    const user_id = req.user._id;
    const uid = req.params.uid;
    const one = cartsManager.readById(user_id, uid);
    res.json200(response);
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
  res.json200(response);
};
const deleteById = (req, res) => {
  const user_id = req.user._id;
  const uid = req.params.uid;
  const deleted = cartsManager.deleteById(user_id, uid);
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

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], createOne);
    this.read("/", ["USER"], readAll);
    this.read("/:uid", ["USER"], readById);
    this.update("/:uid", ["USER"], updateById);
    this.destroy("/uid", ["USER"], deleteById);
    this.router.param("uid", pidParam);
  };
}

let cartRouter = new CartsRouter();
cartRouter = cartRouter.getRouter();
export default cartRouter;
