import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { RestController } from './RestController';

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
        res.status(204)
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all comments'
            }
        })
    }
    public deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
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