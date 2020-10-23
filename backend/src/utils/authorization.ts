import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../constants";

export const generateToken = (id: ObjectId) => {
  return jwt.sign({ id }, TOKEN_SECRET, {
    expiresIn: "3d",
  });
};
