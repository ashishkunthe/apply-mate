import { Router } from "express";
import { authMiddleware } from "../middleware/authMidlleware";
import {
  JobApplicationStatus,
  JobApply,
} from "../controllers/jobApplyController";

const router = Router();

router.post("/apply/:resumeId", authMiddleware as any, JobApply as any);
router.get(
  "/application-status",
  authMiddleware as any,
  JobApplicationStatus as any
);

export default router;
