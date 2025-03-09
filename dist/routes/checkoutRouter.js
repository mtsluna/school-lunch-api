"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkoutController_1 = require("../controllers/checkoutController");
const router = express_1.default.Router();
// @ts-ignore
router.post("/checkout", checkoutController_1.checkout);
exports.default = router;
