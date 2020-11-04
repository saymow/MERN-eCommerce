import { Router } from "express";

import ProductsController from "../controllers/productController";
import authMiddleware, { admin } from "../middleware/authMiddleware";

const productController = new ProductsController();
const routes = Router();

routes.get("/", productController.index);
routes.get("/:id", productController.show);
routes.delete("/:id", authMiddleware, admin, productController.destroy);
routes.post("/", authMiddleware, admin, productController.create);
routes.put("/:id", authMiddleware, admin, productController.update);

export default routes;
