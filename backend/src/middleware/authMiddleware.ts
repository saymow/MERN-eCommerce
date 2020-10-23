import { Request, Response, NextFunction } from "express";
import jwt, { VerifyErrors } from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";

import AppError from "../errors/AppError";
import User from "../models/UserModel";

export default async function AuthMiddleware(
  req: Request,
  _: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) throw new AppError("Unauthorized", 401);

  let parts = authorization.split(" ");
  if (parts.length !== 2) throw new AppError("Unauthorized", 401);

  let [prefix, token] = parts;
  if (prefix !== "Bearer") throw new AppError("Unauthorized", 401);

  jwt.verify(
    token,
    TOKEN_SECRET,
    async (error: VerifyErrors | null, payload) => {
      if (error) _.status(401).send({ message: "Unauthorized" });

      console.log(payload);

      const user = await User.findById((payload as { id: string }).id);

      if (!user) throw new AppError("Unauthorized", 401);

      req.user = user;

      next();
    }
  );
}
