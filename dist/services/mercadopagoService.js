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
exports.receivePaymentHook = void 0;
const mercadopagoConnector_1 = require("../clients/mercadopagoConnector");
const sheetsConnector_1 = require("../clients/sheetsConnector");
const receivePaymentHook = (hookData) => __awaiter(void 0, void 0, void 0, function* () {
    if (hookData.topic !== "payment") {
        return;
    }
    const paymentData = hookData.data;
    const payment = yield (0, mercadopagoConnector_1.findPaymentById)(paymentData.id);
    if (payment.status !== 'approved') {
        return;
    }
    const { student, products } = payment.metadata;
    const newOrder = {
        student_name: student.student_name,
        student_surname: student.student_surname,
        student_document: student.student_document,
        student_type: student.student_type,
        father_name: student.father_name,
        father_surname: student.father_surname,
        father_document: student.father_document,
        father_email: student.father_email,
        subscription_enabled: student.subscription_enabled,
        amount: payment.transaction_amount,
        products: `[${products.map((product) => product.title).join(";")}]`,
    };
    yield (0, sheetsConnector_1.addRow)('orders', newOrder);
});
exports.receivePaymentHook = receivePaymentHook;
