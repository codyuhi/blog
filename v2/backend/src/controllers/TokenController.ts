import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { RestController } from './RestController'

export class TokenController extends RestController {
    public create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        if (!req.body.username || !req.body.password) {
            res.status(403)
            res.json({
                success: false,
                data: {
                    message: 'Invalid username/password combination'
                }
            })
            return
        }
        // TODO: Implement username/password lookup in DB
        // TODO: If the username/password combo is correct, generate token
        res.status(201)
        // TODO: include generated token in response
        res.json({
            success: true,
            data: {
                message: 'Successfully logged in'
            }
        })
    }
    public read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request type'
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
        if (req.headers.token) {
            // TODO: Implement token delete operation in DB
        }
        res.status(204)
        res.json({
            success: true,
            data: {
                message: 'Successfully logged out'
            }
        })
    }

}