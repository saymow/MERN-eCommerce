import mongoose from "mongoose";

import createDB from "../../database";

import Order from "../../models/OrderModel";
import Product from "../../models/ProductModel";
import User from "../../models/UserModel";

async function setupEnvironment() {
  await createDB();

  await Promise.all([
    Order.deleteMany({}),
    Product.deleteMany({}),
    User.deleteMany({}),
  ]);
}

async function afterTest() {
  await mongoose.disconnect();
}

export { setupEnvironment, afterTest };
