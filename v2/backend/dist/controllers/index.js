"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleController = exports.commentController = exports.userController = exports.tokenController = void 0;
const TokenController_1 = require("./TokenController");
const UserController_1 = require("./UserController");
const CommentController_1 = require("./CommentController");
const ArticleController_1 = require("./ArticleController");
const tokenController = new TokenController_1.TokenController();
exports.tokenController = tokenController;
const userController = new UserController_1.UserController();
exports.userController = userController;
const commentController = new CommentController_1.CommentController();
exports.commentController = commentController;
const articleController = new ArticleController_1.ArticleController();
exports.articleController = articleController;
//# sourceMappingURL=index.js.map