import { Request, Response } from "express";

import products from "../data/products";

class ProductsController {
  async index(req: Request, res: Response) {
    return res.send(products);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const product = products.find((_product) => _product._id === id);

    return res.send(product);
  }
}

export default ProductsController;
