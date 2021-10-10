"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const RestController_1 = require("./RestController");
class TokenController extends RestController_1.RestController {
    create(req, res) {
        if (!req.body.username || !req.body.password) {
            res.status(403);
            res.json({
                success: false,
                data: {
                    message: 'Invalid username/password combination'
                }
            });
            return;
        }
        // TODO: Implement username/password lookup in DB
        // TODO: If the username/password combo is correct, generate token
        res.status(201);
        // TODO: include generated token in response
        res.json({
            success: true,
            data: {
                message: 'Successfully logged in'
            }
        });
    }
    read(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request type'
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
        if (req.headers.token) {
            // TODO: Implement token delete operation in DB
        }
        res.status(204);
        res.json({
            success: true,
            data: {
                message: 'Successfully logged out'
            }
        });
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map