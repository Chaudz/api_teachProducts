import { Schema, Types, model } from "mongoose";
import { IsEmail } from "class-validator";

export interface IUser {
  first_name: string;
  last_name: string;
  gender: number;
  birthday: Date;
  phone: number;
  email: string;
  address: string;
  password: string;
  token: string;
  role_id: Types.ObjectId;
}

const userSchema = new Schema<IUser>({
  first_name: { type: String },
  last_name: { type: String },
  gender: { type: Number },
  birthday: { type: Date },
  phone: { type: Number },
  email: {
    type: String,
    required: true,
    validate: [IsEmail(), "Invalid email"],
  },
  address: { type: String },
  password: { type: String, required: true, minlength: 5, match: /^\S+$/ },
  token: { type: String },
  role_id: { type: Schema.Types.ObjectId, default: "64710a5ee4db6ca76727638a" }, // customer
});

const User = model<IUser>("users", userSchema);

export default User;
