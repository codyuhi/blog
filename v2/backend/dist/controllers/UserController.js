"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const RestController_1 = require("./RestController");
class UserController extends RestController_1.RestController {
    create(req, res) {
        res.json({ message: 'POST /api/user request received' });
    }
    read(req, res) {
        res.json({ message: 'GET /api/user request received' });
    }
    update(req, res) {
        res.json({ message: 'PUT /api/user request received' });
    }
    delete(req, res) {
        res.json({ message: 'DELETE /api/user request received' });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map