import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    preferences: {
      jobTitles: [{ type: String }],
      location: String,
      experience: String,
      keywords: [{ type: String }],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
