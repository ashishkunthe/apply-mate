import mongoose, { Schema } from "mongoose";

const resumeSchema = new Schema({
  userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  fileName: { type: String, required: true },
  tag: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
});

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;
