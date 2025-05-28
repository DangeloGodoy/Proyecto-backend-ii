import {
  setCookie,
  readCookie,
  clearCookie,
} from "../../controller/cookie.controller.js";
import CustomRouter from "../custom.router.js";

class CookieRouter extends CustomRouter {
  constructor() {
    super();
    this.init();
  }
  init = () => {
    this.read("/set", setCookie);
    this.read("/read", readCookie);
    this.read("/clear", clearCookie);
  };
}

const cookieRouter = new CookieRouter();
export default cookieRouter.getRouter();
