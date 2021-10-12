"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleController = void 0;
const RestController_1 = require("./RestController");
const database_service_1 = require("../db/database.service");
const mongodb_1 = require("mongodb");
class ArticleController extends RestController_1.RestController {
    create(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.article) {
                    res.status(400);
                    res.json({
                        success: false,
                        data: {
                            message: 'Invalid request'
                        }
                    });
                    return;
                }
                const articleId = new mongodb_1.ObjectId();
                const article = {
                    title: req.body.article.title,
                    description: req.body.article.description,
                    heroImgUrl: req.body.article.heroImgUrl,
                    created: Date.now(),
                    comments: [],
                    tags: (_a = req.body.article.tags) !== null && _a !== void 0 ? _a : [],
                    _id: articleId
                };
                yield ((_b = database_service_1.collection.articles) === null || _b === void 0 ? void 0 : _b.insertOne(article));
                res.status(201);
                res.json({
                    success: true,
                    data: {
                        article: articleId,
                        message: `Successfully created Article with id ${articleId}`
                    }
                });
            }
            catch (err) {
                console.error('Unable to create new article', err);
                res.status(500);
                res.json({
                    success: false,
                    data: {
                        message: 'Something went wrong while creating article'
                    }
                });
            }
        });
    }
    read(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const articles = (yield ((_a = database_service_1.collection.articles) === null || _a === void 0 ? void 0 : _a.find({}).toArray()));
                res.status(200);
                res.json({
                    success: true,
                    data: {
                        articles: articles,
                        message: 'Successfully retrieved all articles'
                    }
                });
            }
            catch (err) {
                res.status(500);
                res.json({
                    success: false,
                    data: {
                        message: 'Something went wrong while grabbing all articles'
                    }
                });
            }
        });
    }
    readOne(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.articleId) {
                    res.status(400);
                    res.json({
                        success: false,
                        data: {
                            message: 'Invalid article id'
                        }
                    });
                    return;
                }
                const article = (yield ((_a = database_service_1.collection.articles) === null || _a === void 0 ? void 0 : _a.findOne({
                    _id: new mongodb_1.ObjectId(req.params.articleId)
                })));
                if (!article) {
                    res.status(404);
                    res.json({
                        success: false,
                        data: {
                            message: `Unable to find article with id ${req.params.articleId}`
                        }
                    });
                    return;
                }
                res.status(200);
                res.json({
                    success: true,
                    data: {
                        article: article,
                        message: `Successfully retrieved article with id ${req.params.articleId}`
                    }
                });
            }
            catch (err) {
                console.error(`Something went wrong while getting article with id: ${req.params.articleId}`, err);
                res.status(500);
                res.json({
                    success: false,
                    data: {
                        message: `Something went wrong while getting article with id: ${req.params.articleId}`
                    }
                });
            }
        });
    }
    update(req, res) {
        res.status(400);
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        });
    }
    updateOne(req, res) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.params.articleId) {
                    res.status(400);
                    res.json({
                        success: false,
                        data: {
                            message: 'Invalid article id'
                        }
                    });
                    return;
                }
                if (!req.body.article) {
                    res.status(400);
                    res.json({
                        success: false,
                        data: {
                            message: 'Missing article object in request body'
                        }
                    });
                }
                const articleId = new mongodb_1.ObjectId(req.params.articleId);
                const updatedArticle = {
                    title: req.body.article.title,
                    description: req.body.article.description,
                    heroImgUrl: req.body.article.heroImgUrl,
                    created: Date.now(),
                    comments: req.body.article.comments,
                    tags: (_a = req.body.article.tags) !== null && _a !== void 0 ? _a : [],
                    _id: articleId
                };
                const query = { _id: articleId };
                const result = yield ((_b = database_service_1.collection.articles) === null || _b === void 0 ? void 0 : _b.updateOne(query, { $set: updatedArticle }));
                if (!result) {
                    res.status(404);
                    res.json({
                        success: false,
                        data: {
                            message: `Unable to find article with id ${req.params.articleId}`
                        }
                    });
                }
                res.status(200);
                res.json({
                    success: true,
                    data: {
                        article: updatedArticle,
                        message: `Successfully updated article with id ${req.params.articleId}`
                    }
                });
            }
            catch (err) {
                console.error(`Something went wrong while updating article with id ${req.params.articleId}`, err);
                res.status(500);
                res.json({
                    success: false,
                    data: {
                        message: `Something went wrong while updating article with id ${req.params.articleId}`
                    }
                });
            }
        });
    }
    delete(req, res) {
        res.status(204);
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all articles'
            }
        });
    }
    deleteOne(req, res) {
        if (!req.params.articleId) {
            res.status(400);
            res.json({
                success: false,
                data: {
                    message: 'Invalid article id'
                }
            });
            return;
        }
        res.status(204);
        res.json({
            success: true,
            data: {
                message: `Successfully deleted article with id ${req.params.articleId}`
            }
        });
    }
}
exports.ArticleController = ArticleController;
//# sourceMappingURL=ArticleController.js.map