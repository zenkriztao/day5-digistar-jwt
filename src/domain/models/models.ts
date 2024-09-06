import mongoose, { Schema, Document } from "mongoose";
import { User } from "../../core/types";

const userSchema = new Schema<User & Document>({
  userId: { type: String, required: true, unique: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
});

export const UserModel = mongoose.model<User & Document>("User", userSchema);
