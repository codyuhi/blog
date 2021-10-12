import { ObjectId } from 'bson'
import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import argon2 from 'argon2'
import { User } from '../schemas'
import { collection } from '../db/database.service'
import { RestController } from './RestController'

export class UserController extends RestController {
    public async create(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        if (!req.body.user) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid request'
                }
            })
            return
        }
        if (!req.body.user.firstName || !req.body.user.lastName || !req.body.user.email || !req.body.user.password) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Invalid request. Please include all fields in the request body'
                }
            })
            return
        }
        const readResult = (await collection.users?.find({ $or: [{ username: req.body.user.username }, { email: req.body.user.email }] }))
        if (!readResult) {
            res.status(400)
            res.json({
                success: false,
                data: {
                    message: 'Username or email address already in use'
                }
            })
            return
        }

        const hash = await argon2.hash(req.body.user.password)
        const user = {
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            username: req.body.user.username,
            password: hash
        } as User
        await collection.users?.insertOne(user)
        res.status(201)
        // TODO: include generated token in response
        res.json({
            success: true,
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    username: user.username
                },
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