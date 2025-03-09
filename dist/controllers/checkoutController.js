"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkout = void 0;
const checkoutService_1 = require("../services/checkoutService");
const checkout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkoutData = req.body;
        // Validate incoming data
        if (!checkoutData.student_document ||
            !checkoutData.father_document ||
            !checkoutData.father_email ||
            !checkoutData.products) {
            return res.status(400).json({ error: "Missing required fields" });
        }
        const result = yield (0, checkoutService_1.postCheckout)(checkoutData);
        res.status(200).json(result);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.checkout = checkout;
