"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const RestController_1 = require("./RestController");
class ArticleController extends RestController_1.RestController {
    create(req, res) {
        res.json({ message: 'POST /api/article request received' });
    }
    read(req, res) {
        res.json({ message: 'GET /api/article request received' });
    }
    update(req, res) {
        res.json({ message: 'PUT /api/article request received' });
    }
    delete(req, res) {
        res.json({ message: 'DELETE /api/article request received' });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map