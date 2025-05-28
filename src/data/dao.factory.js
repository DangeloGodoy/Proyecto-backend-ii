const { PERSISTENCE } = process.env;

let dao = {};

switch (PERSISTENCE) {
  case "memory":
    break;
  case "fs":
    {
      const { productsManager, usersManager } = await import(
        "./fs/manager.fs.js"
      );
      const { cartsManager } = await import("./fs/cart.fs.js");
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
  default:
    {
      const { productsManager, usersManager } = await import(
        "./mongo/managers/manager.mongo.js"
      );
      const { cartsManager } = await import("./mongo/managers/carts.mongo.js");
      dao = { productsManager, usersManager, cartsManager };
    }
    break;
}

const { productsManager, cartsManager, usersManager } = dao;
export { productsManager, cartsManager, usersManager };
export default dao;
