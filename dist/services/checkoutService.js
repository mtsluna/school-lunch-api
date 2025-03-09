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
exports.postCheckout = void 0;
const studentService_1 = require("./studentService");
const mercadopagoConnector_1 = require("../clients/mercadopagoConnector");
const postCheckout = (checkoutData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const amount = checkoutData.products.reduce((total, { price }) => {
            return total + (+price);
        }, 0);
        const [student] = yield (0, studentService_1.getStudentsByFatherEmailAndFatherDocumentAndStudentDocument)(checkoutData.father_email, checkoutData.father_document, checkoutData.student_document);
        if (!student) {
            throw new Error(`Error searching student: ${checkoutData.father_email} ${checkoutData.father_document} ${checkoutData.student_document}`);
        }
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
            amount: amount,
            products: `[${checkoutData.products.map((product) => product.title).join(";")}]`,
        };
        //await addRow('orders', newOrder);
        const preference = yield (0, mercadopagoConnector_1.createPreference)(student, checkoutData.products);
        return { preference };
    }
    catch (error) {
        console.error("Error posting checkout:", error);
        throw new Error("Failed to post checkout to Google Sheets");
    }
});
exports.postCheckout = postCheckout;
