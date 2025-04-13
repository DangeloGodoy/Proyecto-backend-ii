import CustomRouter from "../custom.router.js";
import { passportCb } from "../../middlewares/passportCb.mid.js";
import passport from "../../middlewares/passport.mid.js";

const register = async (req, res) => {
  const response = req.user;
  res.status(201).json({
    response,
    method: req.method,
    url: req.originalUrl,
  });
};
const login = async (req, res) => {
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
};
const online = (req, res) => {
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
};
const signout = async (req, res) => {
  res.clearCookie("token").status(200).json({
    message: "Logged out successfully",
    method: req.method,
    url: req.originalUrl,
  });
};
const badAuth = async (req, res) => {
  const error = new Error("Bad authentication from redirect");
  error.statusCode = 401;
  throw error;
};
const google = async (req, res) => {
  const response = req.user;
  res.status(200).json({
    response,
    method: req.method,
    url: originalUrl,
  });
};

class AuthRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/register", passportCb("register"), register);
    this.create("/login", passportCb("login"), login);
    this.read("/online", passportCb("current"), online);
    this.create("/signout", passportCb("current"), signout);
    this.read("/bad-auth", badAuth);
    this.read(
      "/google",
      passport.authenticate("google", {
        scope: ["email", "profile"],
        failureRedirect: "/api/auth/bad-auth",
      })
    );
    this.read(
      "/google/callback",
      passport.authenticate("google", {
        session: false,
        failureRedirect: "/api/auth/bad-auth",
      }),
      google
    );
  };
}

const authRouter = new AuthRouter();
export default authRouter.getRouter();
