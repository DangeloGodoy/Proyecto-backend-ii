import { productsManager } from "../data/mongo/managers/manager.mongo.js";
import { Types } from "mongoose";
import {
  createOneService,
  deleteByIdService,
  readAllService,
  readByIdService,
  updateByIdService
} from "../services/products.services.js";

const createOne = async (req, res) => {
  const data = req.body;
  const response = await createOneService(data);
  res.json201(response);
};
const readAll = async (req, res) => {
  const filter = req.query;
  const response = await readAllService(filter);
  res.json200(response);
};
const readById = async (req, res) => {
  const { pid } = req.params;
  const response = await readByIdService(pid);
  res.json200(response);
};
const updateById = async (req, res) => {
  const {pid} = req.params;
  const data = req.body;
  const response = await  updateByIdService(pid, data);
  res.json200(response);
};
const deleteById = async (req, res) => {
  const {pid} = req.params;
  const response = await deleteByIdService(pid);
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
