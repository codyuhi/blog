"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = void 0;
const mongoose_1 = require("mongoose");
const User_1 = require("./User");
exports.Comment = new mongoose_1.Schema({
    content: String,
    articleId: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: User_1.User
});
exports.Comment;
//# sourceMappingURL=Comment.js.map