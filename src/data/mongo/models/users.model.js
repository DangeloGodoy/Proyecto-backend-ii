import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    age: { type: Number},
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
