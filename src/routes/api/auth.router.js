import { Router } from "express";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const register = async (req, res, next) => {
  try {
    const response = req.user;
    res.status(201).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const response = req.user;
    console.log(response);

    res.status(200).json({
      response,
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};
const online = async (req, res, next) => {
  try {
    if (req.session.user_id) {
      res.status(200).json({
        online: true,
        user_id: req.session.user_id,
        method: req.method,
        url: req.url,
      });
    } else {
      const error = new Error("Invalid credentials");
      error.statusCode = 401;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const signout = async (req, res, next) => {
  try {
    req.session.destroy();
    res.status(200).json({
      message: "Logged out successfully",
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    next(error);
  }
};
const badAuth = async (req, res, next) => {
  try {
    const error = new Error("Bad authentication from redirect");
    error.statusCode = 401;
    throw error;
  } catch (error) {
    next(error);
  }
};

authRouter.post(
  "/register",
  passport.authenticate("register", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  register
);
authRouter.post(
  "/login",
  passport.authenticate("login", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  login
);
authRouter.post("/online", online);
authRouter.post("/signout", signout);
authRouter.get("/bad-auth", badAuth);

export default authRouter;
