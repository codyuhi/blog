"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const RestController_1 = require("./RestController");
class CommentController extends RestController_1.RestController {
    create(req, res) {
        res.json({ message: 'POST /api/comment request received' });
    }
    read(req, res) {
        res.json({ message: 'GET /api/comment request received' });
    }
    update(req, res) {
        res.json({ message: 'PUT /api/comment request received' });
    }
    delete(req, res) {
        res.json({ message: 'DELETE /api/comment request received' });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map