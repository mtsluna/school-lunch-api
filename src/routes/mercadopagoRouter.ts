import express from "express";
import {webhook} from "../controllers/mercadopagoController";

const router = express.Router();

// @ts-ignore
router.post("/mercadopago", webhook);

export default router;