import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { usersManager } from "../data/mongo/managers/manager.mongo.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const data = req.body;
        if (!data.name || !data.city) {
          const error = new Error("Missing data");
          error.statusCode = 400;
          throw error;
        }
        const user = await usersManager.readBy({ email });
        if (user) {
          const error = new Error("User already exists");
          error.statusCode = 409;
          throw error;
        }
        data.password = createHash(password);
        const response = await usersManager.createOne(data);
        return done(null, response);
      } catch (error) {
        return done(error);
      }
    }
  )
);
passport.use(
  "login",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const response = await usersManager.readBy({ email });
        if (!response) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        if (!verifyHash(password, response.password)) {
          const error = new Error("Invalid credentials");
          error.statusCode = 401;
          throw error;
        }
        req.session.user_id = response._id;
        req.session.email = email;
        req.session.role = response.role;
        return done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);

export default passport;
