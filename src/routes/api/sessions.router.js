import { Router } from "express";

const sessionsRouter = Router();

const setSession = (req, res, next) => {
    try {
        req.session.email = "dangelo@mail.com"
        req.session.role = "ADMIN"
        const message = "Session set successfully!";
        res.status(200).json({ message });
    } catch (error) {
        next(error);
    }
}
const readSession = (req, res, next) => {
    try {
        const session = req.session;
        const message = "Session read successfully!";
        if (!session.email) {
            return res.status(404).json({ message: "Session not found!" });
        }
        res.status(200).json({ session, message });
    } catch (error) {
        next(error);
    }
}
const clearSession = (req, res, next) => {
    try {
        const message = "Session cleared successfully!";
        if (!req.session.email) {
            return res.status(404).json({ message: "Session not found!" });
        }
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ message: "Error clearing session!" });
            }
            res.status(200).clearCookie("connect.sid").json({ message });
        });
    } catch (error) {
        next(error);
    }
}

sessionsRouter.get("/login", setSession);
sessionsRouter.get("/read", readSession);
sessionsRouter.get("/logout", clearSession);

export default sessionsRouter;