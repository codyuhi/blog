"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const RestController_1 = require("./RestController");
class TokenController extends RestController_1.RestController {
    create(req, res) {
        res.json({ message: 'POST /api/token request received' });
    }
    read(req, res) {
        res.json({ message: 'GET /api/token request received' });
    }
    update(req, res) {
        res.json({ message: 'PUT /api/token request received' });
    }
    delete(req, res) {
        res.json({ message: 'DELETE /api/token request received' });
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map