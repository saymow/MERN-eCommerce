import mongoose, { Document, Model } from "mongoose";
import bcrypt from "bcrypt";
import AppError from "../errors/AppError";
import { generateToken } from "../utils/authorization";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(password: string): Promise<boolean>;
  getAuthenticatedUser(): void;
}

interface UserModel extends Model<IUser> {
  findByCredentials(email: string, password: string): Promise<IUser>;
}

userSchema.statics.findByCredentials = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user || !(await bcrypt.compare(password, user.password)))
    throw new AppError("Unauthorized", 401);

  return user;
};

userSchema.methods.matchPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.toJSON = function () {
  const user = this;

  const userObject = user.toObject();

  const serializedUser = {
    ...userObject,
    password: undefined,
  };

  return serializedUser;
};

userSchema.methods.getAuthenticatedUser = function () {
  return {
    ...this.toObject(),
    password: undefined,
    token: generateToken(this._id),
  };
};

userSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) next();

  user.password = await bcrypt.hash(user.password, 10);
});

const User = mongoose.model<IUser, UserModel>("User", userSchema);

export default User;
