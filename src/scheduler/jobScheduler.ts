import JobApplication from "../models/JobApllication";
import { applyToJob } from "../services/applyToJob";

export const runWorker = async () => {
  const job = await JobApplication.findOne({ status: "Pending" }).populate(
    "resumeUsed"
  );

  // @ts-ignore
  if (!job || !job.resumeUsed?.fileName) return;

  try {
    console.log("starting applying to job");
    if (await isValidLink(job.jobLink as string)) {
      await applyToJob({
        ...job.toObject(), // @ts-ignore
        resumeUsedPath: job.resumeUsed.fileName,
      });
      job.status = "Applied";
      job.appliedAt = new Date();
      await job.save();
      console.log(`Applied to: ${job.jobTitle}`);
    } else {
      console.log(`Invalid job link skipped: ${job.jobLink}`);
    }
  } catch (e) {
    job.status = "Failed";
    await job.save();
  }
};

import axios from "axios";

async function isValidLink(url: string) {
  try {
    const response = await axios.head(url);
    return response.status >= 200 && response.status < 400;
  } catch (error) {
    return false;
  }
}
