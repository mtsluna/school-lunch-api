import { Router } from "express";
import { login } from "../controllers/authController";

// Create a router instance
const router = Router();

// Login route
router.post("/login", login as any);

export default router;
