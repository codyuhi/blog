import express, { Request, Response } from 'express'
import { TokenController } from '../controllers/TokenController'

export const router = express.Router({
    strict: true
})

router.post('/', (req: Request, res: Response) => {
    TokenController.create(req, res)
})

router