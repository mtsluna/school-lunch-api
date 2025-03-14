import { Request, Response } from "express";
import { postCheckout } from "../services/checkoutService";
import { findUserByEmail } from "../services/userService";

export const checkout = async (req: Request, res: Response) => {
  try {
    const checkoutData = req.body;

    const email = req.user?.email;

    const user = await findUserByEmail(email as string);

    // Validate incoming data
    if (
      !checkoutData.student_document ||
      !checkoutData.products ||
      !checkoutData.date
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const result = await postCheckout({
      ...checkoutData,
      father_email: user!.email,
    });
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
