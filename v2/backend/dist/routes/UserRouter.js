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
exports.router.post('/', (req, res) => {
    controllers_1.userController.create(req, res);
});
// GET requests
exports.router.get('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.userController.read(req, res);
});
// PUT requests
exports.router.put('/', middleware_1.validUser, (req, res) => {
    controllers_1.userController.update(req, res);
});
// DELETE requests
exports.router.delete('/', middleware_1.checkAdmin, (req, res) => {
    controllers_1.userController.delete(req, res);
});
exports.router.delete('/:userId', middleware_1.validUser, (req, res) => {
    controllers_1.userController.deleteOne(req, res);
});
exports.router;
//# sourceMappingURL=UserRouter.js.map