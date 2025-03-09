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
exports.getStudentsByFatherEmailAndFatherDocumentAndStudentDocument = exports.getStudentsByFatherEmail = void 0;
const sheetsConnector_1 = require("../clients/sheetsConnector");
const getStudentsByFatherEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, sheetsConnector_1.getSheetData)('students');
    return data.filter((student) => student.father_email === email);
});
exports.getStudentsByFatherEmail = getStudentsByFatherEmail;
const getStudentsByFatherEmailAndFatherDocumentAndStudentDocument = (fatherEmail, fatherDocument, studentDocument) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, sheetsConnector_1.getSheetData)('students');
    return data.filter((student) => student.father_email === fatherEmail && student.father_document === fatherDocument && studentDocument === studentDocument);
});
exports.getStudentsByFatherEmailAndFatherDocumentAndStudentDocument = getStudentsByFatherEmailAndFatherDocumentAndStudentDocument;
