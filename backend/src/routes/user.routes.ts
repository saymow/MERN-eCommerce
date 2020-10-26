import { Router } from "express";

import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userController = new UserController();
const routes = Router();

routes.post("/", userController.create);
routes.post("/login", userController.login);
routes.get("/:id", userController.show);

routes.get("/", authMiddleware, userController.me);
routes.put("/", authMiddleware, userController.update);

export default routes;
