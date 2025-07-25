import { Router } from "express";
import Registration from "../controllers/authController";
import Login from "../controllers/authController";

const router = Router();

router.post("auth/register", Registration);
router.post("auth/login", Login);

export default router;
