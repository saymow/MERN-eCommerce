import { Router } from "express";

import productRoutes from "./products.routes";
import userRoutes from "./user.routes";
import orderRoutes from "./order.routes";

const routes = Router();

routes.use("/products", productRoutes);
routes.use("/users", userRoutes);
routes.use("/orders", orderRoutes);

export default routes;
