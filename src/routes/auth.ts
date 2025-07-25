import { Router } from "express";
import {
  Login,
  Registration,
  UserDetails,
} from "../controllers/authController";
import { authMiddleware } from "../middleware/authMidlleware";

const router = Router();

router.post("/auth/register", Registration);
router.post("/auth/login", Login);
router.get("/user/details", authMiddleware as any, UserDetails as any);

export default router;
