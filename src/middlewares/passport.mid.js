import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import { usersManager } from "../data/dao.factory.js";
import { createHash, verifyHash } from "../helpers/hash.helper.js";
import { createToken } from "../helpers/token.helper.js";
const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID: clientID,
  GOOGLE_CLIENT_SECRET: clientSecret,
} = process.env;
const callbackURL = "http://localhost:8080/api/auth/google/callback";

passport.use(
  "register",
  new LocalStrategy(
    { passReqToCallback: true, usernameField: "email" },
    async (req, email, password, done) => {
      try {
        const data = req.body; 
        console.log(req)
        if (!data.firtsName || !data.lastName) {
          return done(null, null, {
            message: "Incomplete data",
            statusCode: 400,
          });
        }
        const user = await usersManager.readBy({ email });
        if (user) {
          return done(null, null, {
            message: "User already exists",
            statusCode: 400,
          });
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
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        if (!verifyHash(password, response.password)) {
          return done(null, null, {
            message: "Invalid credentials",
            statusCode: 401,
          });
        }
        const data = {
          user_id: response._id,
          email: response.email,
          role: response.role,
        };
        const token = createToken(data);
        req.token = token;
        return done(null, response);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "google",
  new GoogleStrategy(
    { clientID, clientSecret, callbackURL },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.id;
        let user = await usersManager.readBy({ email });
        if (!user) {
          user = {
            name: profile.name.givenName,
            avatar: profile.picture,
            email: profile.id,
            password: createHash(profile.id),
            city: "Unknown",
          };
          user = await usersManager.createOne(user);
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "current",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: JWT_SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done(null, null, {
            message: "Bad auth",
            statusCode: 401,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
passport.use(
  "admin",
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
      secretOrKey: JWT_SECRET,
    },
    async (data, done) => {
      try {
        const { user_id } = data;
        const user = await usersManager.readById(user_id);
        if (!user) {
          return done(null, null, {
            message: "Bad auth",
            statusCode: 401,
          });
        }
        if (user.role !== "ADMIN") {
          return done(null, null, {
            message: "Forbidden",
            statusCode: 403,
          });
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);
export default passport;
