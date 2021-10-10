"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const RestController_1 = require("./RestController");
class CommentController extends RestController_1.RestController {
    create(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        });
    }
    // TODO: Nice-to-have: read will return all comments created by authenticated user
    read(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        });
    }
    readOne(req, res) {
        if (!req.params.commentId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            });
            return;
        }
        res.status(200);
        res.json({
            success: true,
            data: {
                message: `Successfully retrieved comment with id ${req.params.commentId}`
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
        if (!req.params.commentId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            });
            return;
        }
        res.status(200);
        res.json({
            success: true,
            data: {
                message: `Successfully updated comment with id ${req.params.commentId}`
            }
        });
    }
    delete(req, res) {
        res.status(204);
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all comments'
            }
        });
    }
    deleteOne(req, res) {
        if (!req.params.commentId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            });
            return;
        }
        res.status(204);
        res.json({
            success: true,
            data: {
                message: `Successfully deleted comment with id ${req.params.commentId}`
            }
        });
    }
}
exports.CommentController = CommentController;
//# sourceMappingURL=CommentController.js.map