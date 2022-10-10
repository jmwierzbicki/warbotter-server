import { Model, model, Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  avatar?: string;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  avatar: String,
});

export const User: Model<IUser> = model<IUser>('User', userSchema);
