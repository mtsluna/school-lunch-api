"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const catalogController_1 = require("../controllers/catalogController");
const router = express_1.default.Router();
// @ts-ignore
router.get("/catalogs", catalogController_1.getCatalog);
exports.default = router;
