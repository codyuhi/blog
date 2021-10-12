import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { RestController } from "./RestController";
import { collection } from '../db/database.service'
import { Article } from '../schemas'
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
            const article = {
                title: req.body.article.title,
                description: req.body.article.description,
                heroImgUrl: req.body.article.heroImgUrl,
                created: Date.now(),
                comments: [],
                tags: req.body.article.tags ?? [],
                _id: articleId
            } as Article
            await collection.articles?.insertOne(article)
            res.status(201)
            res.json({
                success: true,
                data: {
                    article: articleId,
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
            const articles = (await collection.articles?.find({}).toArray()) as Article[]
            res.status(200)
            res.json({
                success: true,
                data: {
                    articles: articles,
                    message: 'Successfully retrieved all articles'
                }
            })
        } catch (err) {
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
            if (!req.params.articleId) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid article id'
                    }
                })
                return
            }
            const article = (await collection.articles?.findOne({
                _id: new ObjectId(req.params.articleId)
            })) as Article

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
            if (!req.params.articleId) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid article id'
                    }
                })
                return
            }
            if(!req.body.article) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Missing article object in request body'
                    }
                })
            }
            const articleId = new ObjectId(req.params.articleId)
            const updatedArticle = {
                title: req.body.article.title,
                description: req.body.article.description,
                heroImgUrl: req.body.article.heroImgUrl,
                created: Date.now(),
                comments: req.body.article.comments as Comment[],
                tags: req.body.article.tags ?? [],
                _id: articleId
            } as Article
            const query = { _id: articleId }
            const result = await collection.articles?.updateOne(query, { $set: updatedArticle })
            if (!result) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find article with id ${req.params.articleId}`
                    }
                })
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
    public delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(204)
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all articles'
            }
        })
    }
    public deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        if (!req.params.articleId) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid article id'
                }
            })
            return
        }
        res.status(204)
        res.json({
            success: true,
            data: {
                message: `Successfully deleted article with id ${req.params.articleId}`
            }
        })
    }
}