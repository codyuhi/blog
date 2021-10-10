import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { RestController } from "./RestController";

export class ArticleController extends RestController {
    public create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request'
            }
        })
    }
    public read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(200)
        res.json({
            success: true,
            data: {
                message: 'Successfully retrieved all articles'
            }
        })
    }
    public readOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
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
        res.status(200)
        res.json({
            success: true,
            data: {
                message: `Successfully retrieved article with id ${req.params.articleId}`
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
        res.status(200)
        res.json({
            success: true,
            data: {
                message: `Successfully updated article with id ${req.params.articleId}`
            }
        })
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