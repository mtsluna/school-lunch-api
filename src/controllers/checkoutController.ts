import { Request, Response } from "express";
import { postCheckout } from "../services/checkoutService";

export const checkout = async (req: Request, res: Response) => {
    try {
        const checkoutData = req.body;

        // Validate incoming data
        if (
            !checkoutData.student_document ||
            !checkoutData.father_document ||
            !checkoutData.father_email ||
            !checkoutData.products ||
            !checkoutData.date
        ) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const result = await postCheckout(checkoutData);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};