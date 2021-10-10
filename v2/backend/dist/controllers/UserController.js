"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const RestController_1 = require("./RestController");
class UserController extends RestController_1.RestController {
    create(req, res) {
        if (!req.body.user) {
            res.status(400);
            res.json({
                success: true,
                data: {
                    message: 'Invalid request'
                }
            });
            return;
        }
        // TODO: If user already exists, return invalid
        // TODO: generate token
        res.status(201);
        // TODO: include generated token in response
        // TODO: include User object in response
        res.json({
            success: true,
            data: {
                message: 'Successfully created user'
            }
        });
    }
    read(req, res) {
        res.status(200);
        res.json({
            success: true,
            data: {
                message: 'Successfully queried all users'
            }
        });
    }
    update(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request type'
            }
        });
    }
    delete(req, res) {
        res.status(204);
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all users'
            }
        });
    }
    deleteOne(req, res) {
        if (!req.params.userId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid user id'
                }
            });
            return;
        }
        res.status(204);
        res.json({
            success: true,
            data: {
                message: `Successfully deleted user with id ${req.params.userId}`
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map