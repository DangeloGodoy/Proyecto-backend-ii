import { config } from "dotenv";
import args from "./setArgs.helper.js";

const { mode } = args;
const path = ".env" + (mode && "." + mode);

config({ path });

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
const COOKIE_SECRET = process.env.COOKIE_SECRET;
const SESSION_SECRET = process.env.SESSION_SECRET;
const JWT_SECRET = process.env.JWT_SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

const env = {
  PORT,
  MONGO_URL,
  COOKIE_SECRET,
  SESSION_SECRET,
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
};

export default env;
