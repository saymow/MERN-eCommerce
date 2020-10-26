import { Request, Response } from "express";
import AppError from "../errors/AppError";
import Order from "../models/OrderModel";

class OrderController {
  async create(req: Request, res: Response) {
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const user = req.user;

    if (!orderItems || orderItems.length === 0)
      throw new AppError("No order items");

    const serializedOrderItems = orderItems.map((item) => ({
      ...item,
      product: item._id,
    }));

    const order = new Order({
      user: user._id,
      orderItems: serializedOrderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();

    res.status(201).send(createdOrder);
  }
}

export default OrderController;
