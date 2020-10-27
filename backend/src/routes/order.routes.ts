import { Router } from "express";

import OrderController from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const orderController = new OrderController();
const routes = Router();

routes.get("/me", authMiddleware, orderController.index);
routes.post("/", authMiddleware, orderController.create);
routes.put("/:id/pay", authMiddleware, orderController.updateOrderToPaid);
routes.get("/:id", authMiddleware, orderController.show);

export default routes;
