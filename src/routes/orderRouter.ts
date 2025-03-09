import express from "express";
import {getOrders} from "../controllers/orderController";

const router = express.Router();

// @ts-ignore
router.get("/orders", getOrders);

export default router;