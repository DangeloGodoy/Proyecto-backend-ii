import { Router } from 'express';

const cookieRouter = Router();

const setCookie = (req, res, next) => {
    try {
        const maxAge = 1000 * 60 * 60 * 24 * 7;
        const message = "Cookie set successfully!";
        res
            .status(200)
            .cookie("modo", "oscuro", { maxAge })
            .cookie("user_id", "123", { maxAge, signed: true })
            .json({ message });
    } catch (error) {
        next(error);
    }
};

const readCookie = (req, res, next) => {
    try {
        const cookie = req.cookies.modo;
        const signedCookie = req.signedCookies.user_id;
        const message = "Cookies read successfully!";
        if (!cookie) {
            return res.status(404).json({ message: "Cookie not found!" });
        }
        res.status(200).json({ cookie, signedCookie, message });
    } catch (error) {
        next(error);
    }
};

const clearCookie = (req, res, next) => {
    try {
        const message = "Cookies cleared successfully!";
        if (!cookie) {
            return res.status(404).json({ message: "Cookie not found!" });
        }
        res
            .status(200)
            .clearCookie("modo").clearCookie("user_id")
            .json({ message });
    } catch (error) {
        next(error);
    }
}

cookieRouter.get("/set", setCookie);
cookieRouter.get("/read", readCookie);
cookieRouter.get("/clear", clearCookie);

export default cookieRouter;