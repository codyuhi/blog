import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import { User, Token } from '../schemas'
import argon2 from 'argon2'
import { v4 as uuid } from 'uuid'
import { RestController } from './RestController'

export class TokenController extends RestController {
    public async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
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
        const userReadResult = await User.findOne({ username: req.body.username }).select('+password').exec()
        const isMatch = await argon2.verify(userReadResult.password, req.body.password)
        if (!userReadResult || !isMatch) {
            res.status(403)
            res.json({
                success: false,
                data: {
                    message: 'Invalid username/password combination'
                }
            })
            return
        }
        await Token.deleteOne({ userId: userReadResult._id })
        const token = new Token({
            token: uuid(),
            userId: userReadResult._id
        })
        await token.save()
        res.status(201)
        // TODO: include generated token in response
        res.json({
            success: true,
            data: {
                token: token.token,
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