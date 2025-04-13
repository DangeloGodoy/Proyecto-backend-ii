import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";
import { productsManager } from "../../data/mongo/managers/manager.mongo.js";

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
const readAll = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const readById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const updateById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};
const deleteById = (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
};

productsRouter.post(
  "/",
  passport.authenticate("admin", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  createOne
);
productsRouter.get("/", readAll);
productsRouter.get("/:uid", readById);
productsRouter.put(
  "/:uid",
  passport.authenticate("admin", {
    session: true,
    failureRedirect: "/api/auth/bad-auth",
  }),
  updateById
);
productsRouter.delete(
  "/uid",
  passport.authenticate("admin", {
    session: true,
    failureRedirect: "/api/auth/bad-auth",
  }),
  deleteById
);

export default productsRouter;
