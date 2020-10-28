import { Router } from "express";

import UserController from "../controllers/userController";
import authMiddleware, { admin } from "../middleware/authMiddleware";

const userController = new UserController();
const routes = Router();

routes.post("/", userController.create);
routes.post("/login", userController.login);
routes.put("/", authMiddleware, userController.update);
routes.get("/me", authMiddleware, userController.me);

routes.get("/:id", authMiddleware, admin, userController.show);
routes.get("/", authMiddleware, admin, userController.index);
routes.put("/:id", authMiddleware, admin, userController.updateAsAdmin);
routes.delete("/:id", authMiddleware, admin, userController.destroy);

export default routes;
