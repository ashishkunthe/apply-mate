import mongoose from "mongoose";

const jobApplicationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  platform: { type: String, enum: ["LinkedIn", "Indeed"], required: true },
  jobTitle: { type: String },
  company: { type: String },
  jobLink: { type: String },
  resumeUsed: { type: mongoose.Schema.Types.ObjectId, ref: "Resume" },
  appliedAt: { type: Date, default: Date.now },
  status: {
    type: String,
    enum: ["Applied", "Rejected", "Interview"],
    default: "Applied",
  },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);
export default JobApplication;
