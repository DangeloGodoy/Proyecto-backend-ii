import passport from "./passport.mid.js";

export const passportCb = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, (error, user, info) => {
      if (error) {
        return next(error);
      }
      if (!user) {
        const err = new Error(info?.message || "Unauthorized");
        err.statusCode = info?.statusCode || 401;
        return next(err);
      }
      req.user = user;
      next();
    })(req, res, next);
  };
};
