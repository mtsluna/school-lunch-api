import express from "express";
import { getCatalog } from "../controllers/catalogController";

const router = express.Router();

// @ts-ignore
router.get("/catalogs", getCatalog);

export default router;