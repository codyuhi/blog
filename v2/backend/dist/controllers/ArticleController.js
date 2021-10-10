"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const RestController_1 = require("./RestController");
class ArticleController extends RestController_1.RestController {
    create(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        });
    }
    read(req, res) {
        res.status(200);
        res.json({
            success: true,
            data: {
                message: 'Successfully retrieved all articles'
            }
        });
    }
    readOne(req, res) {
        if (!req.params.articleId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid article id'
                }
            });
            return;
        }
        res.status(200);
        res.json({
            success: true,
            data: {
                message: `Successfully retrieved article with id ${req.params.articleId}`
            }
        });
    }
    update(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        });
    }
    updateOne(req, res) {
        if (!req.params.articleId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid article id'
                }
            });
            return;
        }
        res.status(200);
        res.json({
            success: true,
            data: {
                message: `Successfully updated article with id ${req.params.articleId}`
            }
        });
    }
    delete(req, res) {
        res.status(204);
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all articles'
            }
        });
    }
    deleteOne(req, res) {
        if (!req.params.articleId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid article id'
                }
            });
            return;
        }
        res.status(204);
        res.json({
            success: true,
            data: {
                message: `Successfully deleted article with id ${req.params.articleId}`
            }
        });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map