"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB_NAME = exports.DB_CONN_STRING = exports.PORT = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PORT = process.env.PORT || 4000;
exports.DB_CONN_STRING = (_a = process.env.DB_CONN_STRING) !== null && _a !== void 0 ? _a : null;
exports.DB_NAME = (_b = process.env.DB_NAME) !== null && _b !== void 0 ? _b : null;
//# sourceMappingURL=constants.js.map