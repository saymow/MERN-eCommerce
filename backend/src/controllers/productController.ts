import { Request, Response } from "express";

import Product from "../models/ProductModel";
import AppError from "../errors/AppError";

class ProductsController {
  async index(req: Request, res: Response) {
    let { keyword, pageNumber = 1, pageSize = 4 } = req.query as {
      keyword?: string;
      pageNumber?: string;
      pageSize?: string;
    };

    pageNumber = pageNumber ? pageNumber : 1;

    const filters = keyword
      ? {
          name: {
            $regex: keyword,
            $options: "i",
          },
        }
      : {};

    console.log("params: ", pageNumber, pageSize);

    const count = await Product.countDocuments({ ...filters });
    const products = await Product.find({
      ...filters,
    })
      .limit(Number(pageSize))
      .skip(Number(pageSize) * (Number(pageNumber) - 1));

    console.log(pageNumber);

    return res.send({
      products,
      page: pageNumber,
      pages: Math.ceil(count / Number(pageSize)),
    });
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

  async createProductReview(req: Request, res: Response) {
    const productId = req.params.id;
    const userId = req.user._id;

    const { rating, comment } = req.body;

    const product = await Product.findById(productId);

    if (!product) throw new AppError("Product not found", 404);

    const alreadyReviewed = await (product as any).reviews.find(
      (r) => r.user.toString() === userId.toString()
    );

    if (alreadyReviewed) throw new AppError("Product already reviewed");

    const review = {
      user: userId,
      name: req.user.name,
      rating: Number(rating),
      comment,
    };

    (product as any).reviews.push(review);
    (product as any).numReviews = (product as any).reviews.length;
    (product as any).rating =
      (product as any).reviews.reduce((acc, item) => item.rating + acc, 0) /
      (product as any).reviews.length;

    await product.save();

    return res.status(201).send({ message: "Review added" });
  }

  async getTopProducts(req: Request, res: Response) {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);

    return res.send(products);
  }
}

export default ProductsController;
