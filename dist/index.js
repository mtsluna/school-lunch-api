"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const studentRouter_1 = __importDefault(require("./routes/studentRouter"));
const catalogRouter_1 = __importDefault(require("./routes/catalogRouter"));
const checkoutRouter_1 = __importDefault(require("./routes/checkoutRouter"));
const mercadopagoRouter_1 = __importDefault(require("./routes/mercadopagoRouter"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use("/api", studentRouter_1.default);
app.use("/api", catalogRouter_1.default);
app.use("/api", checkoutRouter_1.default);
app.use("/webhook", mercadopagoRouter_1.default);
app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
});
