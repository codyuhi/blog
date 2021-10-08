"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const RestController_1 = require("./RestController");
class TokenController extends RestController_1.RestController {
    create(req, res) {
        throw new Error('Method not implemented.');
    }
    read(req, res) {
        res.json({ message: 'GET /token request received' });
    }
    update(req, res) {
        throw new Error('Method not implemented.');
    }
    delete(req, res) {
        throw new Error('Method not implemented.');
    }
}
exports.TokenController = TokenController;
//# sourceMappingURL=TokenController.js.map