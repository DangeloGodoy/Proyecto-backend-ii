import CustomRouter from "./custom.router.js";
import usersRouter from "./api/users.router.js";
import cookieRouter from "./api/cookies.router.js";
import sessionsRouter from "./api/sessions.router.js";
import authRouter from "./api/auth.router.js";
import productsRouter from "./api/products.router.js";
import cartsRouter from "./api/carts.router.js";

class ApiRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.use("/auth", authRouter);
    this.use("/carts", cartsRouter);
    this.use("/cookies", cookieRouter);
    this.use("/sessions", sessionsRouter);
    this.use("/users", usersRouter);
    this.use("/products", productsRouter);
  };
}

const apiRouter = new ApiRouter();
export default apiRouter.getRouter();
