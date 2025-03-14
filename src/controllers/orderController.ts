import { Request, Response } from "express";
import { getOrdersByFatherEmailAndDate } from "../services/orderService";

export const getOrders = async (req: Request, res: Response) => {
  try {
    const { date } = req.query;
    if (!date) {
      return res.status(400).json({ error: "Date is required" });
    }

    const email = req.user?.email;

    const students = await getOrdersByFatherEmailAndDate(
      email as string,
      date as string
    );
    res.json(students);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
