import { Schema, model } from "mongoose";

const collection = "users";
const schema = new Schema(
  {
    name: { type: String },
    date: { type: Date, default: Date.now },
    city: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    role: { type: String, default: "USER", enum: ["USER", "ADMIN"] },
    avatar: {
      type: String,
      default: "https://www.svgrepo.com/show/350417/user-circle.svg",
    },
  },
  { timestamps: true }
);

const User = model(collection, schema);
export default User;
