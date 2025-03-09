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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addRow = exports.getSheetData = void 0;
const google_spreadsheet_1 = require("google-spreadsheet");
const dotenv_1 = __importDefault(require("dotenv"));
const google_auth_library_1 = require("google-auth-library");
dotenv_1.default.config();
const { GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env;
if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google Sheets credentials in environment variables");
}
const getDoc = () => __awaiter(void 0, void 0, void 0, function* () {
    const auth = new google_auth_library_1.JWT({
        email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
        key: GOOGLE_PRIVATE_KEY,
        scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });
    const doc = new google_spreadsheet_1.GoogleSpreadsheet(GOOGLE_SHEET_ID, auth);
    yield doc.loadInfo();
    return doc;
});
const getSheetData = (sheetName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield getDoc();
        const sheet = doc.sheetsByTitle[sheetName];
        const rows = yield sheet.getRows();
        return rows.map(row => row.toObject());
    }
    catch (error) {
        console.error("Error fetching Google Sheet data:", error);
        throw new Error("Failed to fetch data from Google Sheets");
    }
});
exports.getSheetData = getSheetData;
const addRow = (sheetName, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doc = yield getDoc();
        const sheet = doc.sheetsByTitle[sheetName];
        yield sheet.addRow(data);
    }
    catch (error) {
        console.error("Error saving Google Sheet data:", error);
        throw new Error("Failed to saving data into Google Sheets");
    }
});
exports.addRow = addRow;
