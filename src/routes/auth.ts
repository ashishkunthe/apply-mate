import { Router } from "express";
import Registration from "../controllers/authController";

const router = Router();

router.post("auth/register", Registration);

export default router;
