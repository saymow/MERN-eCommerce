import { Request, Response, NextFunction } from "express";
import { isDevelopment } from "../constants";
import AppError from "../errors/AppError";

const notFound = (req: Request) => {
  throw new AppError(`Not found - ${req.originalUrl}`, 404);
};

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  _: NextFunction
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).send({
      message: error.message,
    });
  }

  console.error(error.message.red.bold);

  return res.status(500).send({
    message: "Internal server error.",
    stack: isDevelopment ? error.stack : null,
  });
};

export { notFound, errorHandler };
