import CustomRouter from "../custom.router.js";
import { createOne, readAll, readById, updateById, deleteById, pidParam } from "../../controller/cart.controller.js";

class CartsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.create("/", ["USER"], createOne);
    this.read("/", ["USER"], readAll);
    this.read("/:uid", ["USER"], readById);
    this.update("/:uid", ["USER"], updateById);
    this.destroy("/uid", ["USER"], deleteById);
    this.router.param("uid", pidParam);
  };
}

let cartRouter = new CartsRouter();
cartRouter = cartRouter.getRouter();
export default cartRouter;
