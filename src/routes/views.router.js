import CustomRouter from "./custom.router.js";
import { homeView, profileView, detailsView, cartView, registerView, loginView } from "../controller/views.controller.js"

class ViewsRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/", ["PUBLIC"], homeView);
    this.read("/profile/:user_id", ["USER", "ADMIN"], profileView);
    this.read("/product/:product_id", ["PUBLIC"], detailsView);
    this.read("/cart/:user_id", ["USER", "ADMIN"], cartView);
    this.read("/register", ["PUBLIC"], registerView);
    this.read("/login", ["PUBLIC"], loginView);
  };
}

const viewsRouter = new ViewsRouter();
export default viewsRouter.getRouter();
