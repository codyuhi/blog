"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const TokenController_1 = require("../controllers/TokenController");
exports.router = express_1.default.Router({
    strict: true
});
exports.router.post('/', (req, res) => {
    TokenController_1.TokenController.create(req, res);
});
exports.router;
//# sourceMappingURL=TokenRouter.js.map