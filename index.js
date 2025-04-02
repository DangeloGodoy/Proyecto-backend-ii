import express, { Router } from "express";
import router from "./src/routes/index.router.js";
import errorHandler from "./src/middlewares/errorHandler.mid.js";

/* Server */
const server = express();
const port = 8080;
const ready = () => console.log(`Server is running on http://localhost:${port}`);
server.listen(port, ready);

/* Middlewares */
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

/* Routers */
server.use("/", router);
server.use(errorHandler);