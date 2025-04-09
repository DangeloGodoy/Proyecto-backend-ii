import { Router } from "express";
import { usersManager } from "../../data/mongo/managers/manager.mongo.js";
import { createHash, verifyHash } from "../../helpers/hash.helper.js";

const authRouter = Router();

const register = async (req, res, next) => {
    try {
        const data = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.name || !data.email || !data.password) {
            const error = new Error("Missing data")
            error.statusCode = 400;
            throw error;
        }
        if (!emailRegex.test(data.email)) {
            const error = new Error("Invalid email");
            error.statusCode = 400;
            throw error;
        }
        if (await usersManager.readBy({ email: data.email })) {
            const error = new Error("User already exists");
            error.statusCode = 409;
            throw error;
        }
        data.password = createHash(data.password);
        const response = await usersManager.createOne(data);
        res.status(201).json({
            response,
            method: req.method,
            url: req.url,
        })
    } catch (error) {
        next(error);
    }
};
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const response = await usersManager.readBy({ email });
        if (!verifyHash(password, response.password)) {
            const error = new Error("Invalid credentials");
            error.status = 401;
            throw error;
        }
        req.session.user_id = response._id;
        req.session.email = email;
        req.session.role = response.role;
        res.status(200).json({
            response,
            method: req.method,
            url: req.url,
        })

    } catch (error) {
        next(error)
    }
}
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
            error.status = 401;
            throw error;
        }
    } catch (error) {
        next(error)
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
        next(error)
    }
}
authRouter.post("/register", register)
authRouter.post("/login", login);
authRouter.post("/online", online);
authRouter.post("/signout", signout);

export default authRouter;