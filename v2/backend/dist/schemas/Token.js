"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const mongoose_1 = require("mongoose");
exports.Token = new mongoose_1.Schema({
    token: String,
    userId: String,
    expiresAt: {
        type: Date,
        default: Date.now() + 2 * (60 * 60 * 1000)
    }
});
//# sourceMappingURL=Token.js.map