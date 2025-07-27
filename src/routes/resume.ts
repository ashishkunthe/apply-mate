import { Router } from "express";
import upload from "../middleware/multerMiddleware";
import { uploadResume } from "../controllers/resumeController";
import { authMiddleware } from "../middleware/authMidlleware";

const router = Router();

router.post(
  "/resume-upload",
  authMiddleware as any,
  upload.single("resume"),
  uploadResume as any
);

export default router;
