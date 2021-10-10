import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { RestController } from './RestController'

export class UserController extends RestController {
    public create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        if (!req.body.user) {
            res.status(400)
            res.json({
                success: true,
                data: {
                    message: 'Invalid request'
                }
            })
            return
        }
        // TODO: If user already exists, return invalid
        // TODO: generate token
        res.status(201)
        // TODO: include generated token in response
        // TODO: include User object in response
        res.json({
            success: true,
            data: {
                message: 'Successfully created user'
            }
        })
    }
    public read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(200)
        res.json({
            success: true,
            data: {
                message: 'Successfully queried all users'
            }
        })
    }
    public update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request type'
            }
        })
    }
    public delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(204)
        res.json({
            success: true,
            data: {
                message: 'Successfully deleted all users'
            }
        })
    }
    public deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        if (!req.params.userId) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid user id'
                }
            })
            return
        }
        res.status(204)
        res.json({
            success: true,
            data: {
                message: `Successfully deleted user with id ${req.params.userId}`
            }
        })
    }
}