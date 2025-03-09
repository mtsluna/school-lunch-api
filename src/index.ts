import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import studentRouter from "./routes/studentRouter";
import menuRouter from "./routes/catalogRouter";
import checkoutRouter from "./routes/checkoutRouter";
import mercadopagoRouter from "./routes/mercadopagoRouter";
import orderRouter from "./routes/orderRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", studentRouter);
app.use("/api", menuRouter);
app.use("/api", checkoutRouter);
app.use("/api", orderRouter);
app.use("/webhook", mercadopagoRouter);

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});