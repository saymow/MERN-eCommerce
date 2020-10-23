import { Router } from "express";

import UserController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";

const userController = new UserController();
const routes = Router();

routes.post("/login", userController.login);
routes.post("/", userController.create);
routes.get("/", authMiddleware, userController.show);

export default routes;
