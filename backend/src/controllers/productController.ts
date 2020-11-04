import { Request, Response } from "express";

import Product from "../models/ProductModel";
import AppError from "../errors/AppError";

class ProductsController {
  async index(req: Request, res: Response) {
    const products = await Product.find({});

    return res.send(products);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const product = await Product.findById(id);

    if (!product) throw new AppError("Product not found", 404);

    return res.send(product);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params as { id: string };

    await Product.deleteOne({ _id: id });

    res.send({ message: "Product deleted" });
  }

  async create(req: Request, res: Response) {
    const userId = req.user.id;

    const product = new Product({
      name: "Sample name",
      price: 0,
      user: userId,
      image: "/images/sample.jpg",
      brand: "Sample brand",
      category: "Sample category",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });

    await product.save();

    return res.status(201).send(product);
  }

  async update(req: Request, res: Response) {
    const productId = req.params.id;

    const updates = Object.keys(req.body);
    const validUpdates = [
      "name",
      "price",
      "image",
      "brand",
      "category",
      "countInStock",
      "numReviews",
      "description",
    ];
    const isValidUpdate = updates.every((update) =>
      validUpdates.includes(update)
    );

    if (!isValidUpdate) throw new AppError("Invalid updates");

    const product = await Product.findById(productId);

    if (!product) throw new AppError("Product not found", 404);

    updates.forEach((update) => {
      (product as any)[update] = req.body[update];
    });

    await product.save();

    return res.send(product);
  }
}

export default ProductsController;
