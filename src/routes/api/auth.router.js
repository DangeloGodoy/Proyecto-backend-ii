import { Router } from "express";
import { passportCb } from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const authRouter = Router();

const register = async (req, res, next) => {
  try {
    const response = req.user;
    res.status(201).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const response = req.user;
    const token = req.token;
    const opts = {
      maxAge: 60 * 60 * 24 * 7,
      httpOnly: true,
    };
    res.cookie("token", token, opts).status(200).json({
      response,
      method: req.method,
      url: req.originalUrl,
    });
  } catch (error) {
    next(error);
  }
};
const online = (req, res, next) => {
  try {
    if (req.user._id) {
      res.status(200).json({
        user_id: req.user._id,
        method: req.method,
        url: req.originalUrl,
      });
    } else {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
const signout = async (req, res, next) => {
  try {
    res.clearCookie("token").status(200).json({
      message: "Logged out successfully",
      method: req.method,
      url: req.originalUrl,
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
const google = async (req, res, next) => {
  try {
    const response = req.user;
    res.status(200).json({
      response,
      method: req.method,
      url: originalUrl,
    });
  } catch (error) {
    next(error);
  }
};

authRouter.post("/register", passportCb("register"), register);
authRouter.post("/login", passportCb("login"), login);
authRouter.get("/online", passportCb("current"), online);
authRouter.post("/signout", passportCb("current"), signout);
authRouter.get("/bad-auth", badAuth);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    failureRedirect: "/api/auth/bad-auth",
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "/api/auth/bad-auth",
  }),
  google
);

export default authRouter;
