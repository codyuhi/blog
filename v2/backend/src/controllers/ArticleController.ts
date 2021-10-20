import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { RestController } from "./RestController";
import { Article, Comment } from '../schemas'
import { ObjectId } from 'mongodb'

export class ArticleController extends RestController {
    public async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.body.article) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid request'
                    }
                })
                return
            }
            const articleId = new ObjectId()
            const article = new Article({
                title: req.body.article.title ?? null,
                description: req.body.article.description ?? null,
                heroImgUrl: req.body.article.heroImgUrl ?? null,
                created: Date.now(),
                comments: [],
                tags: req.body.article.tags ?? [],
                _id: articleId
            })
            await article.save()
            res.status(201)
            res.json({
                success: true,
                data: {
                    article: article,
                    message: `Successfully created Article with id ${articleId}`
                }
            })
        } catch (err) {
            console.error('Unable to create new article', err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while creating article'
                }
            })
        }
    }
    public async read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const articles = await Article.find()
            res.status(200)
            res.json({
                success: true,
                data: {
                    articles: articles,
                    message: 'Successfully retrieved all articles'
                }
            })
        } catch (err) {
            console.error('Something went wrong while grabbing all articles:', err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while grabbing all articles'
                }
            })
        }
    }
    public async readOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.articleId || !ObjectId.isValid(req.params.articleId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid article id'
                    }
                })
                return
            }
            const article = (await Article.findOne({
                _id: new ObjectId(req.params.articleId)
            }))

            if (!article) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find article with id ${req.params.articleId}`
                    }
                })
                return
            }
            res.status(200)
            res.json({
                success: true,
                data: {
                    article: article,
                    message: `Successfully retrieved article with id ${req.params.articleId}`
                }
            })
        } catch (err) {
            console.error(`Something went wrong while getting article with id: ${req.params.articleId}`, err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while getting article with id: ${req.params.articleId}`
                }
            })
        }
    }
    public update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        })
    }
    public async updateOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.articleId || !ObjectId.isValid(req.params.articleId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid article id'
                    }
                })
                return
            }
            if (!req.body.article) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Missing article object in request body'
                    }
                })
                return
            }
            const articleId = new ObjectId(req.params.articleId)
            const updatedArticle = new Article({
                title: req.body.article.title,
                description: req.body.article.description,
                heroImgUrl: req.body.article.heroImgUrl,
                created: Date.now(),
                comments: req.body.article.comments as Comment[],
                tags: req.body.article.tags ?? [],
                _id: articleId
            })
            const query = { _id: articleId }
            const result = await Article.updateOne(query, { $set: updatedArticle })
            if (!result) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find article with id ${req.params.articleId}`
                    }
                })
                return
            }
            res.status(200)
            res.json({
                success: true,
                data: {
                    article: updatedArticle,
                    message: `Successfully updated article with id ${req.params.articleId}`
                }
            })
        } catch (err) {
            console.error(`Something went wrong while updating article with id ${req.params.articleId}`, err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while updating article with id ${req.params.articleId}`
                }
            })
        }
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            await Article.deleteMany()
            await Comment.deleteMany()
            res.status(204)
            res.json({
                success: true,
                data: {
                    message: 'Successfully deleted all articles'
                }
            })
        } catch (err) {
            console.error('Something went wrong while deleting articles', err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while deleting articles'
                }
            })
        }
    }
    public async deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.articleId || !ObjectId.isValid(req.params.articleId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid article id'
                    }
                })
                return
            }
            const query = { _id: new ObjectId(req.params.articleId) }
            const result = await Article.deleteOne(query)
            if (result && result.deletedCount) {
                await Comment.deleteMany({ articleId: new ObjectId(req.params.articleId) })
                res.status(204)
                res.json({
                    success: true,
                    data: {
                        message: `Successfully deleted article with id ${req.params.articleId}`
                    }
                })
                return
            } else if (!result) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: `Something went wrong while deleting article with id ${req.params.articleId}`
                    }
                })
                return
            } else if (!result.deletedCount) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find article with id ${req.params.articleId}`
                    }
                })
                return
            }
        } catch (err) {
            console.error(`Something went wrong while deleting article with id ${req.params.articleId}`, err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while deleting article with id ${req.params.articleId}`
                }
            })
        }
    }
}