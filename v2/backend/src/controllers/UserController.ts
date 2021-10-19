import { Request, Response } from 'express'
import { ParamsDictionary } from 'express-serve-static-core'
import { ParsedQs } from 'qs'
import argon2 from 'argon2'
import { User, Token } from '../schemas'
import { RestController } from './RestController'
import { ObjectId } from 'mongodb'
import { v4 as uuid } from 'uuid'

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
        // TODO: perform check for valid email address
            // TODO: If token is expired, return 403
        const readResult = (await User.find({ $or: [{ username: req.body.user.username }, { email: req.body.user.email }] }))
        if (!readResult || readResult.length > 0) {
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
        const user = new User({
            firstName: req.body.user.firstName,
            lastName: req.body.user.lastName,
            email: req.body.user.email,
            username: req.body.user.username,
            password: hash
        })
        const token = new Token({
            token: uuid(),
            userId: user._id
        })
        await user.save()
        await token.save()
        res.status(201)
        res.json({
            success: true,
            data: {
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    _id: user._id
                },
                token: token.token,
                message: 'Successfully created user'
            }
        })
        return
    }
    public async read(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            const users = await User.find()
            res.status(200)
            res.json({
                success: true,
                data: {
                    users: users,
                    message: 'Successfully queried all users'
                }
            })
            return
        } catch (err) {
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while grabbing all users'
                }
            })
            return
        }
    }
    public async readOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.userId || !ObjectId.isValid(req.params.userId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid user id'
                    }
                })
                return
            }
            const user = await User.findOne({
                _id: new ObjectId(req.params.userId)
            })
            if (!user) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find user with id ${req.params.userId}`
                    }
                })
                return
            }
            res.status(200)
            res.json({
                success: true,
                data: {
                    user: user,
                    message: `Successfully retrieved user with id ${req.params.userId}`
                }
            })
            return
        } catch (err) {
            console.error(`Something went wrong while retrieving user with id ${req.params.userId}`, err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while retrieving user with id ${req.params.userId}`
                }
            })
            return
        }
    }
    public update(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): void {
        res.status(400)
        res.json({
            success: false,
            data: {
                message: 'Invalid request type'
            }
        })
        return
    }
    public async updateOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            if (!req.params.userId || !ObjectId.isValid(req.params.userId)) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Invalid user id'
                    }
                })
                return
            }
            if (!req.body.user) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: 'Missing user object in request body'
                    }
                })
                return
            }
            // TODO: Validate that the user being updated matches the header token (or isAdmin)
            // TODO: If token is expired, return 403
            const userId = new ObjectId(req.params.userId)
            const hash = await argon2.hash(req.body.user.password)
            const updatedUser = new User({
                firstName: req.body.user.firstName,
                lastName: req.body.user.lastName,
                email: req.body.user.email,
                username: req.body.user.username,
                password: hash
            })
            const query = { _id: userId }
            const result = await User.updateOne(query, { $set: updatedUser })
            if (!result) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find user with id ${req.params.userId}`
                    }
                })
                return
            }
            res.status(200)
            res.json({
                success: true,
                data: {
                    user: updatedUser,
                    message: `Successfully updated user with id ${req.params.userId}`
                }
            })
        } catch (err) {
            console.error(`Something went wrong while updating user with id ${req.params.userId}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while updating `
                }
            })
        }
    }
    public async delete(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
            await User.deleteMany()
            res.status(204)
            res.json({
                success: true,
                data: {
                    message: 'Successfully deleted all users'
                }
            })
        } catch (err) {
            console.error('Something went wrong while deleting users', err)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: 'Something went wrong while deleting users'
                }
            })
        }
    }
    public async deleteOne(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>): Promise<void> {
        try {
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
            // TODO: Validate that the user being deleted matches the token (or isAdmin)
            // TODO: If token is expired, return 403
            const query = { _id: new ObjectId(req.params.userId) }
            const result = await User.deleteOne(query)
            if (result && result.deletedCount) {
                res.status(204)
                res.json({
                    success: true,
                    data: {
                        message: `Successfully deleted user with id ${req.params.userId}`
                    }
                })
                return
            } else if (!result) {
                res.status(400)
                res.json({
                    success: false,
                    data: {
                        message: `Something went wrong while deleting user with id ${req.params.userId}`
                    }
                })
                return
            } else if (!result.deletedCount) {
                res.status(404)
                res.json({
                    success: false,
                    data: {
                        message: `Unable to find user with id ${req.params.userId}`
                    }
                })
                return
            }
        } catch (err) {
            console.error(`Something went wrong while deleting user with id ${req.params.userId}: ${err}`)
            res.status(500)
            res.json({
                success: false,
                data: {
                    message: `Something went wrong while deleting user with it ${req.params.userId}`
                }
            })
        }
    }
}