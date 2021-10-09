"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRouter = exports.commentRouter = exports.userRouter = exports.tokenRouter = void 0;
const TokenRouter_1 = require("./TokenRouter");
Object.defineProperty(exports, "tokenRouter", { enumerable: true, get: function () { return TokenRouter_1.router; } });
const UserRouter_1 = require("./UserRouter");
Object.defineProperty(exports, "userRouter", { enumerable: true, get: function () { return UserRouter_1.router; } });
const CommentRouter_1 = require("./CommentRouter");
Object.defineProperty(exports, "commentRouter", { enumerable: true, get: function () { return CommentRouter_1.router; } });
const ArticleRouter_1 = require("./ArticleRouter");
Object.defineProperty(exports, "articleRouter", { enumerable: true, get: function () { return ArticleRouter_1.router; } });
//# sourceMappingURL=index.js.map