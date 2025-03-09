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
exports.getCatalogByDateAndStudentType = void 0;
const sheetsConnector_1 = require("../clients/sheetsConnector");
const getCatalogByDateAndStudentType = (date, studentType) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, sheetsConnector_1.getSheetData)('menus');
    const filteredData = data.filter((item) => (item.day === date || item.day === "all") &&
        (item.student_type === studentType || item.student_type === "all"));
    const categories = [...new Set(filteredData.map(item => item.category))];
    return categories.map((category) => ({
        name: category,
        products: filteredData.filter((item) => item.category === category)
    }));
});
exports.getCatalogByDateAndStudentType = getCatalogByDateAndStudentType;
