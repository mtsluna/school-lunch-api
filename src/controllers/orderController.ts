import {Request, Response} from "express";
import {getOrdersByFatherDocumentAndStudentDocumentAndDate} from "../services/orderService";

export const getOrders = async (req: Request, res: Response) => {
    try {
        const { father_document, date } = req.query;
        if (!father_document || !date) {
            return res.status(400).json({ error: "Fields are required" });
        }

        const students = await getOrdersByFatherDocumentAndStudentDocumentAndDate(father_document as string, date as string);
        res.json(students );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};