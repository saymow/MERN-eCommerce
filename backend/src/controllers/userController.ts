import { Request, Response } from "express";

import AppError from "../errors/AppError";
import User from "../models/UserModel";

class UserController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    // const user = await User.findOne({ email });

    // if (!user || !(await user.matchPassword(password)))
    //   throw new AppError("Unauthorized", 401);

    const user = await User.findByCredentials(email, password);

    const authenticatedUser = user.getAuthenticatedUser();

    return res.send(authenticatedUser);
  }

  async me(req: Request, res: Response) {
    const user = await User.findById(req.user._id);

    if (!user) throw new AppError("User not found", 404);

    res.send(user);
  }

  async create(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) throw new AppError("User already in use.");

    const user = await User.create({ name, email, password });

    if (!user) throw new AppError("Invalid user data");

    const authenticatedUser = user.getAuthenticatedUser();

    return res.status(201).send(authenticatedUser);
  }

  async update(req: Request, res: Response) {
    try {
      const updates = Object.keys(req.body);
      const validUpdates = ["name", "email", "password"];
      const isValidUpdate = updates.every((key) => validUpdates.includes(key));

      const { id } = req.user;

      if (!isValidUpdate) throw new AppError("Invalid updates");

      const user = await User.findById(id);

      if (!user) throw new AppError("User not found", 404);

      updates.map((key) => {
        user[key as "name"] = req.body[key];
      });

      await user.save();

      return res.send(user);
    } catch (err) {
      if (err instanceof AppError)
        throw new AppError(err.message, err.statusCode);

      // as email is the unique "unique key" i'm assuming it
      if (err.name === "MongoError" && err.code === 11000)
        throw new AppError("Email already in use", 422);

      throw Error();
    }

    // const updates = Object.keys(req.body);
    // const validUpdates = ["name", "email", "password"];
    // const isValidUpdate = updates.every((key) => validUpdates.includes(key));

    // if (!isValidUpdate) throw new AppError("Invalid updates");

    // const user = await User.findById(req.user._id);

    // if (!user) throw new AppError("User not found", 404);

    // updates.map((key) => {
    //   user[key as "name"] = req.body[key];
    // });

    // user.save((err) => {
    //   if (!err) return res.send(user);

    //   console.log(err.name, err.code);

    //   if (err.name === "MongoError" && err.code === 11000) {
    //     return res.status(400).send({ message: "Email already in use" });
    //   }

    //   return res.send(err);
    // });
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) throw new AppError("User not found", 404);

    res.send(user);
  }

  async updateAsAdmin(req: Request, res: Response) {
    try {
      const updates = Object.keys(req.body);
      const validUpdates = ["name", "email", "isAdmin"];
      const isValidUpdate = updates.every((key) => validUpdates.includes(key));

      const { id } = req.params;

      if (!isValidUpdate) throw new AppError("Invalid updates");

      const user = await User.findById(id);

      if (!user) throw new AppError("User not found", 404);

      updates.map((key) => {
        user[key as "name"] = req.body[key];
      });

      await user.save();

      return res.send(user);
    } catch (err) {
      if (err instanceof AppError)
        throw new AppError(err.message, err.statusCode);

      // as email is the unique "unique key" i'm assuming it
      if (err.name === "MongoError" && err.code === 11000)
        throw new AppError("Email already in use", 422);

      throw Error();
    }
  }

  async index(req: Request, res: Response) {
    const users = await User.find({});

    res.send(users);
  }

  async destroy(req: Request, res: Response) {
    const { id } = req.params;

    const user = await User.findById(id as string);

    if (!user) throw new AppError("User not found", 404);

    await user.remove();

    return res.send({ message: "User removed" });
  }
}

export default UserController;
