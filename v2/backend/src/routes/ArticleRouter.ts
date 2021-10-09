import express, { Request, Response } from 'express'
import { articleController } from '../controllers'

export const router = express.Router({
    strict: true
})

router.post('/', (req: Request, res: Response) => {
    articleController.create(req, res)
})

router.get('/', (req: Request, res: Response) => {
    articleController.read(req, res)
})

router.put('/', (req: Request, res: Response) => {
    articleController.update(req, res)
})

router.delete('/', (req: Request, res: Response) => {
    articleController.delete(req, res)
})

router