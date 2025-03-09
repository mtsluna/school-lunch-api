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
exports.getCatalog = void 0;
const catalogService_1 = require("../services/catalogService");
const getCatalog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { date, student_type } = req.query;
        if (!date || !student_type) {
            return res.status(400).json({ error: "Both date and student_type are required" });
        }
        const catalog = yield (0, catalogService_1.getCatalogByDateAndStudentType)(date, student_type);
        res.json(catalog);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.getCatalog = getCatalog;
