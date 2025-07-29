import { Router } from "express";
import { authMiddleware } from "../middleware/authMidlleware";
import { JobApply } from "../controllers/jobApplyController";

const router = Router();

router.post("/apply/:resumeId", authMiddleware as any, JobApply as any);

export default router;
