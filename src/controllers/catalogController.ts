import { Request, Response } from "express";
import { getCatalogByDateAndStudentType } from "../services/catalogService";

export const getCatalog = async (req: Request, res: Response) => {
    try {
        const { date, student_type } = req.query;

        if (!date || !student_type) {
            return res.status(400).json({ error: "Both date and student_type are required" });
        }

        const catalog = await getCatalogByDateAndStudentType(date as string, student_type as string);
        res.json(catalog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};