import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    requried: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
});

export const User = mongoose.model("User", userSchema, "user_details");
