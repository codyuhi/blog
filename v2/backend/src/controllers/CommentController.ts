import { ObjectId } from 'mongodb';
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RestController } from './RestController';
import { Article, Comment, Token } from '../schemas'

export class CommentController extends RestController {
    public create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        })
    }
    public async createOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
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
            if (!req.body.comment) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Missing comment object in request body'
                    }
                })
                return
            }
            const article = await Article.findOne({ _id: req.params.articleId })
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
            // TODO: If token is expired, return 403
            const token = await Token.findOne({ token: req.headers.token })
            const comment = new Comment({
                _id: new ObjectId(),
                content: req.body.comment.content,
                articleId: article._id,
                userId: token.userId
            })
            article.comments.push(comment)
            await article.save()
            await comment.save()
            res.status(201)
            res.json({
                success: true,
                data: {
                    comment: comment,
                    message: 'Successfully created comment'
                }
            })
        } catch (err) {
            console.error(`Something went wrong while saving comment to ${req.params.articleId}: ${err}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while saving comment to ${req.params.articleId}`
                }
            })
        }
    }
    // TODO: Nice-to-have: read will return all comments created by authenticated user
    public read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        })
    }
    public readOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        // TODO: Complete this method
        if (!req.params.commentId) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            })
            return
        }
        res.status(200)
        res.json({
            success: true,
            data: {
                message: `Successfully retrieved comment with id ${req.params.commentId}`
            }
        })
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
    public updateOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        // TODO: Complete this method
        if (!req.params.commentId) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            })
            return
        }
        res.status(200)
        res.json({
            success: true,
            data: {
                message: `Successfully updated comment with id ${req.params.commentId}`
            }
        })
    }
    public delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        // TODO: delete all comments owned by user
        res.status(204)
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all comments'
            }
        })
    }
    public deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        // TODO: Complete method
        if (!req.params.commentId) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid comment id'
                }
            })
            return
        }
        res.status(204)
        res.json({
            success: true,
            data: {
                message: `Successfully deleted comment with id ${req.params.commentId}`
            }
        })
    }
}