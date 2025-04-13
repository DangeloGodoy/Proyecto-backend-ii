import "dotenv/config.js";
import express from "express";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
import sessions from "express-session";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import __dirname from "./utils.js";
import dbConnect from "./src/helpers/dbConnect.helper.js";
import router from "./src/routes/index.router.js";
import { errorHandler } from "./src/middlewares/errorHandler.mid.js";
import { pathHandler } from "./src/middlewares/pathHandler.mid.js";

/* Server */
const server = express();
const port = 8080;
const ready = () => {
  console.log(`Server is running on http://localhost:${port}`);
  dbConnect();
};
server.listen(port, ready);

/* Engine Settings */
server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views");

/* Middlewares */
server.use(morgan("dev"));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"));

server.use(
  sessions({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUnitialized: true,
    store: new MongoStore({
      ttl: 7 * 24 * 60 * 60,
      mongoUrl: process.env.MONGO_URL,
    }),
  })
);

/* Routers */
server.use("/", router);
server.use(errorHandler);
server.use(pathHandler);
