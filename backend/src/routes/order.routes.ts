import { Router } from "express";

import OrderController from "../controllers/orderController";
import authMiddleware, { admin } from "../middleware/authMiddleware";

const orderController = new OrderController();
const routes = Router();

routes.get("/", authMiddleware, orderController.indexAll);
routes.get("/me", authMiddleware, orderController.index);
routes.post("/", authMiddleware, orderController.create);
routes.put("/:id/pay", authMiddleware, orderController.updateOrderToPaid);
routes.put(
  "/:id/deliver",
  authMiddleware,
  admin,
  orderController.updateOrderToDelivered
);
routes.get("/:id", authMiddleware, orderController.show);

export default routes;
