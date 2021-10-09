import express, { Request, Response } from 'express'
import { commentController } from '../controllers'

export const router = express.Router({
    strict: true
})

router.post('/', (req: Request, res: Response) => {
    commentController.create(req, res)
})

router.get('/', (req: Request, res: Response) => {
    commentController.read(req, res)
})

router.put('/', (req: Request, res: Response) => {
    commentController.update(req, res)
})

router.delete('/', (req: Request, res: Response) => {
    commentController.delete(req, res)
})

router