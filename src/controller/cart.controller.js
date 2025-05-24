import { cartsManager } from "../data/mongo/managers/carts.mongo.js";

const createOne = async (req, res) => {
  console.log(req);
  
  const { product_id, quantity } = req.body;
  const user_id = req.user._id;
  const response = await cartsManager.createOne({ user_id, product_id, quantity });
  res.json201(response);
};
const readAll = (req, res) => {
  const user_id = req.user._id;
  const response = cartsManager.readAll(user_id);
  res.json200(response);
};
const readById = (req, res) => {
  try {
    const user_id = req.user._id;
    const uid = req.params.uid;
    const response = cartsManager.readById(user_id, uid);
    res.json200(response);
  } catch (error) {
    next(error);
  }
};
const updateById = (req, res) => {
  const user_id = req.user._id;
  const uid = req.params.uid;
  const { product_id, quantity } = req.body;
  const response = cartsManager.updateById(user_id, uid, {
    product_id,
    quantity,
  });
  res.json200(response);
};
const deleteById = (req, res) => {
  const user_id = req.user._id;
  const uid = req.params.uid;
  const response = cartsManager.deleteById(user_id, uid);
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

export { createOne, readAll, readById, updateById, deleteById, pidParam };