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
exports.getStudents = void 0;
const studentService_1 = require("../services/studentService");
const getStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        if (!email) {
            return res.status(400).json({ error: "Father email is required" });
        }
        const students = yield (0, studentService_1.getStudentsByFatherEmail)(email);
        res.json(students);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getStudents = getStudents;
