import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    firstName: { type: String }, 
    lastName: { type: String },
    age: { type: Number },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    cart: { type: Schema.Types.ObjectId, ref: "carts" },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
