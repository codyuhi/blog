"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const middleware_1 = require("../middleware");
const controllers_1 = require("../controllers");
exports.router = express_1.default.Router({
    strict: true
});
// POST requests
exports.router.post('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.articleController.create(req, res);
});
// GET requests
exports.router.get('/', (req, res) => {
    controllers_1.articleController.read(req, res);
});
exports.router.get('/:articleId', (req, res) => {
    controllers_1.articleController.readOne(req, res);
});
// PUT requests
exports.router.put('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.articleController.update(req, res);
});
exports.router.put('/:articleId', middleware_1.checkAdmin, (req, res) => {
    controllers_1.articleController.updateOne(req, res);
});
// DELETE requests
exports.router.delete('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.articleController.delete(req, res);
});
exports.router.delete('/:articleId', middleware_1.checkAdmin, (req, res) => {
    controllers_1.articleController.deleteOne(req, res);
});
exports.router;
//# sourceMappingURL=ArticleRouter.js.map