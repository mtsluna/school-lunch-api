import express from "express";
import dotenv from "dotenv";
import studentRouter from "./routes/studentRouter";
import menuRouter from "./routes/catalogRouter";
import checkoutRouter from "./routes/checkoutRouter";
import mercadopagoRouter from "./routes/mercadopagoRouter";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/api", studentRouter);
app.use("/api", menuRouter);
app.use("/api", checkoutRouter);
app.use("/webhook", mercadopagoRouter);

app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});