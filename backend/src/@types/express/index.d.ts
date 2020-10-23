import { IUser } from "../models/UserModel";

declare global {
  declare namespace Express {
    export interface Request {
      user: IUser;
    }
  }
}
