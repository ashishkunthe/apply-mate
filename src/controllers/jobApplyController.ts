import { Request, Response } from "express";
import JobApplication from "../models/JobApllication";

interface ExtendedRequest extends Request {
  userId: string;
}

export async function JobApply(req: ExtendedRequest, res: Response) {
  const userId = req.userId;
  const { company, jobTitle, jobLink, platform } = req.body;
  const resumeId = req.params.resumeId;

  try {
    const job = await JobApplication.create({
      userId: userId,
      company,
      jobLink,
      jobTitle,
      platform,
      resumeUsed: resumeId,
    });

    res.status(200).json({
      message:
        "Job scheduled for apply will recieve the mail regarding application",
      jobDetails: job,
    });
  } catch (error) {
    console.log("something went wrong", error);
    res.status(500).json({
      message: "Not able to create the job-scheduling",
    });
  }
}
