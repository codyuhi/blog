import { Request, Response, NextFunction } from 'express'

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
    // TODO: search for user by token in DB. If not an admin, respond 403
    next()
}

CheckAdmin