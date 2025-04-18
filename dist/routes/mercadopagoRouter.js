"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mercadopagoController_1 = require("../controllers/mercadopagoController");
const router = express_1.default.Router();
// @ts-ignore
router.post("/mercadopago", mercadopagoController_1.webhook);
exports.default = router;
