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

    await order.save();

    res.status(201).send(order);
  }

  async updateOrderToPaid(req: Request, res: Response) {
    const { id } = req.params;
    const { id: userId } = req.user;
    const { id: orderId, status, update_time, payer } = req.body;

    const order = await Order.findOne({
      _id: id,
      user: {
        _id: userId,
      },
    });

    if (!order) throw new AppError("Order not found", 404);

    (order as any).isPaid = true;
    (order as any).paidAt = Date.now();
    (order as any).paymentStatus = {
      status,
      update_time,
      email_address: payer.email_address,
      _id: orderId,
    };

    await order.save();

    console.log(order);

    return res.send(order);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    // for some reason id matches the _id key on user object.
    const { id: userId } = req.user;

    const order = await Order.findOne({
      _id: id,
      user: { _id: userId },
    }).populate("user", "name email");

    if (!order) throw new AppError("Order not found", 404);

    return res.send(order);
  }

  async index(req: Request, res: Response) {
    const { id } = req.user;
    console.log(id);

    const orders = await Order.find({ user: { _id: id } });

    res.send(orders);
  }
}

export default OrderController;
