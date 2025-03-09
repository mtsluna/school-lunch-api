import express from "express";
import { getStudents } from "../controllers/studentController";

const router = express.Router();

// @ts-ignore
router.get("/students", getStudents);

export default router;