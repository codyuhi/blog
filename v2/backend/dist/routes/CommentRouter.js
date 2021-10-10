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
exports.router.post('/', middleware_1.validUser, (req, res) => {
    controllers_1.commentController.create(req, res);
});
// GET requests
exports.router.get('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.commentController.read(req, res);
});
exports.router.get('/:commentId', (req, res) => {
    controllers_1.commentController.readOne(req, res);
});
// PUT requests
exports.router.put('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.commentController.update(req, res);
});
exports.router.put('/:commentId', middleware_1.validUser, (req, res) => {
    controllers_1.commentController.updateOne(req, res);
});
// DELETE requests
exports.router.delete('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.commentController.delete(req, res);
});
exports.router.delete('/:commentId', middleware_1.validUser, (req, res) => {
    controllers_1.commentController.deleteOne(req, res);
});
exports.router;
//# sourceMappingURL=CommentRouter.js.map