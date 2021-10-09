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
    controllers_1.articleController.create(req, res);
});
exports.router.get('/', (req, res) => {
    controllers_1.articleController.read(req, res);
});
exports.router.put('/', (req, res) => {
    controllers_1.articleController.update(req, res);
});
exports.router.delete('/', (req, res) => {
    controllers_1.articleController.delete(req, res);
});
exports.router;
//# sourceMappingURL=ArticleRouter.js.map