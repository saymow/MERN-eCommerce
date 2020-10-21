import mongoose from "mongoose";
import "colors";

import users from "./data/user";
import products from "./data/products";

import User from "./models/UserModel";
import Product from "./models/ProductModel";
import Order from "./models/OrderModel";

import connectDB from "./database";

connectDB();

let flag = process.argv[2];

if (flag === "-d") destroyData();
else importData();

async function importData() {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }));

    await Product.insertMany(sampleProducts);

    console.log("Data imported".green);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red);
    process.exit(1);
  }
}

async function destroyData() {
  try {
    await Order.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    console.log("Data destroyed".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`Error: ${err.message}`.red.inverse);
    process.exit(1);
  }
}
