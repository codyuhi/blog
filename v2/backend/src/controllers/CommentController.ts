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
    public async read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.headers.token) {
                res.status(403)
                res.json({
                    success: false,
                    data: {
                        message: 'You must be logged in to perform this operation'
                    }
                })
                return
            }
            const token = await Token.findOne({ token: req.headers.token })
            if (!token) {
                res.status(403)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid token'
                    }
                })
                return
            }
            const comments = await Comment.find({ userId: token.userId })
            if (comments.length < 1) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: 'No comments found for this user'
                    }
                })
                return
            }
            res.status(200)
            res.json({
                success: true,
                data: {
                    comments: comments,
                    message: 'Successfully retrieved comments for user'
                }
            })
        } catch (err) {
            console.error('Something went wrong while retrieving all comments for user')
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while retrieving all comments for user'
                }
            })
        }
    }
    public async readOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.commentId || !ObjectId.isValid(req.params.commentId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid comment id'
                    }
                })
                return
            }
            const query = { _id: req.params.commentId }
            const comment = await Comment.findOne(query)
            if (!comment) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find comment with id ${req.params.commentId}`
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
        } catch (err) {
            console.error(`Something went wrong while getting comment with id ${req.params.commentId}: ${err}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while getting comment with id ${req.params.commentId}`
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
            if (!req.params.commentId || !ObjectId.isValid(req.params.commentId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid comment id'
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
            const token = await Token.findOne({ token: req.headers.token })
            const comment = await Comment.findOne({ _id: req.params.commentId })
            if (!token || token.userId !== comment.userId) {
                res.status(403)
                res.json({
                    success: false,
                    data: {
                        message: `You do not have permission to update comment with id ${req.params.commentId}`
                    }
                })
                return
            }
            await comment.updateOne(
                { _id: req.params.commentId }, {
                $set: {
                    content: req.body.comment.content,
                    updatedAt: new Date()
                }
            })
            res.status(200)
            res.json({
                success: true,
                data: {
                    message: `Successfully updated comment with id ${req.params.commentId}`
                }
            })
        } catch (err) {
            console.error(`Something went wrong while updating comment with id ${req.params.commentId}: ${err}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while updating comment with id ${req.params.commentId}`
                }
            })
        }
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const token = await Token.findOne({ token: req.headers.token })
            const result = await Comment.deleteMany({ userId: token.userId })
            if (result.deletedCount < 1) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: 'The authenticated user has not left any comments'
                    }
                })
                return
            }
            res.status(204)
            res.json({
                success: true,
                data: {
                    message: 'Successfully deleted all comments'
                }
            })
        } catch (err) {
            console.error('Something went wrong while deleting all comments for user', err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while deleting all comments for user'
                }
            })
        }
    }
    public async deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
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
            const token = await Token.findOne({ token: req.headers.token })
            const comment = await Comment.findOne({ _id: req.params.commentId })
            if (!token || token.userId !== comment.userId) {
                res.status(403)
                res.json({
                    success: false,
                    data: {
                        message: `You do not have permission to update comment with id ${req.params.commentId}`
                    }
                })
                return
            }
            await comment.deleteOne()
            res.status(204)
            res.json({
                success: true,
                data: {
                    message: `Successfully deleted comment with id ${req.params.commentId}`
                }
            })
        } catch (err) {
            console.error(`Something went wrong while deleting comment with id ${req.params.commentId}: ${err}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while deleting comment with id ${req.params.commentId}`
                }
            })
        }
    }
}