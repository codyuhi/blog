"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Article = void 0;
const mongoose_1 = require("mongoose");
const Comment_1 = require("./Comment");
exports.Article = new mongoose_1.Schema({
    title: String,
    description: String,
    heroImgUrl: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
            type: Comment_1.Comment
        }],
    tags: [{
            type: String
        }]
});
exports.Article;
//# sourceMappingURL=Article.js.map