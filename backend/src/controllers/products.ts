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

    const product = await Product.findById(id).catch(() => {
      throw new AppError("Product not found", 404);
    });

    return res.send(product);
  }
}

export default ProductsController;
