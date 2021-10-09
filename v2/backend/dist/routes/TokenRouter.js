"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
exports.router = express_1.default.Router({
    strict: true
});
exports.router.post('/', (req, res) => {
    controllers_1.tokenController.create(req, res);
});
exports.router.get('/', (req, res) => {
    controllers_1.tokenController.read(req, res);
});
exports.router.put('/', (req, res) => {
    controllers_1.tokenController.update(req, res);
});
exports.router.delete('/', (req, res) => {
    controllers_1.tokenController.delete(req, res);
});
exports.router;
//# sourceMappingURL=TokenRouter.js.map