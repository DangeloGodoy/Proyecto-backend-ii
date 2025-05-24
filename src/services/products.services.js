import { productsManager } from '../data/mongo/managers/manager.mongo.js';

const createOneService = async (data) => await productsManager.createOne(data);
const readAllService = async (filter) => await productsManager.readAll(filter);
const readByIdService = async (pid) => await productsManager.readById(pid);
const updateByIdService = async (pid, data) => await productsManager.updateById(pid, data);
const deleteByIdService = async (pid) => await productsManager.deleteById(pid);

export { createOneService, readAllService, readByIdService, updateByIdService, deleteByIdService };