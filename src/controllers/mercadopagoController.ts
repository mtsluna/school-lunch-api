import {Request, Response} from "express";
import {receivePaymentHook} from "../services/mercadopagoService";

export const webhook = async (req: Request, res: Response) => {
    try {
        const webhookData = req.body;

        if (
            !webhookData
        ) {
            return res.status(400).json({ error: "Missing body" });
        }

        await receivePaymentHook(webhookData);
        res.status(200).json();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};