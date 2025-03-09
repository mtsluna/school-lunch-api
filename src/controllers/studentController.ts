import { Request, Response } from "express";
import { getStudentsByFatherEmail } from "../services/studentService";

export const getStudents = async (req: Request, res: Response) => {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Father email is required" });
        }

        const students = await getStudentsByFatherEmail(email as string);
        res.json(students );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};