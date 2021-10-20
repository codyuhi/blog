import { Request, Response, NextFunction } from 'express'
import { Token, User } from '../schemas'

export const CheckAdmin = async (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.token) {
        res.status(403)
        res.json({
            success: false,
            data: {
                message: 'Not logged in'
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
    if (new Date() < token.expiresAt) {
        res.status(403)
        res.json({
            success: false,
            data: {
                message: 'Your session has expired. Login again to continue'
            }
        })
        return
    }
    const user = await User.findOne({ _id: token.userId })
    if (!user) {
        res.status(403)
        res.json({
            success: false,
            data: {
                message: 'Invalid token'
            }
        })
        return
    }
    if (user.role !== 'admin') {
        res.status(403)
        res.json({
            success: false,
            data: {
                message: 'Insufficient permission to perform this action'
            }
        })
    }
    next()
}

CheckAdmin