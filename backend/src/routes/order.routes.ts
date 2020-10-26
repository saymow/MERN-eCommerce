import { Router } from "express";

import OrderController from "../controllers/orderController";
import authMiddleware from "../middleware/authMiddleware";

const orderController = new OrderController();
const routes = Router();

routes.post("/", authMiddleware, orderController.create);

export default routes;
