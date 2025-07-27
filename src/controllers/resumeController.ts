import { Request, Response } from "express";
import Resume from "../models/Resume";

interface ExtendedRequest extends Request {
  userId: string;
}

export async function uploadResume(req: ExtendedRequest, res: Response) {
  const userId = req.userId;
  const fileUrl = req.file?.path;
  const { tag } = req.body;

  try {
    const resume = await Resume.create({
      userId: userId,
      fileName: fileUrl,
      tag: tag,
    });

    if (!resume) {
      res.status(415).json({
        message:
          "Cannot accept the file may be invalid type or not able to upload file",
      });
    }

    res.json({
      message: "resume uploaded sucessfully",
      resume: resume,
    });
  } catch (error) {
    console.log("Something went wrong", error);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
}
