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

  async show(req: Request, res: Response) {
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
}

export default UserController;
