import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { validateTokenMiddleware } from "./middleware/authMiddleware";
import authRouter from "./routes/authRouter";
import menuRouter from "./routes/catalogRouter";
import checkoutRouter from "./routes/checkoutRouter";
import mercadopagoRouter from "./routes/mercadopagoRouter";
import orderRouter from "./routes/orderRouter";
import studentRouter from "./routes/studentRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Apply auth middleware to all routes except those handled in the middleware itself
app.use(validateTokenMiddleware as express.RequestHandler);

// Mount all routes
app.use("/api/auth", authRouter);
app.use("/api", studentRouter);
app.use("/api", menuRouter);
app.use("/api", checkoutRouter);
app.use("/api", orderRouter);
app.use("/webhook", mercadopagoRouter);

app.listen(PORT, () => {
  console.log(`Server running at port: ${PORT}`);
});
