import express, { Request, Response } from 'express'
import { checkAdmin } from '../middleware'
import { articleController } from '../controllers'

export const router = express.Router({
    strict: true
})

// POST requests

router.post('/', checkAdmin, (req: Request, res: Response) => {
    articleController.create(req, res)
})

// GET requests

router.get('/', (req: Request, res: Response) => {
    articleController.read(req, res)
})

router.get('/:articleId', (req: Request, res: Response) => {
    articleController.readOne(req, res)
})

// PUT requests

router.put('/', checkAdmin, (req: Request, res: Response) => {
    articleController.update(req, res)
})

router.put('/:articleId', checkAdmin, (req: Request, res: Response) => {
    articleController.updateOne(req, res)
})

// DELETE requests

router.delete('/', checkAdmin, (req: Request, res: Response) => {
    articleController.delete(req, res)
})

router.delete('/:articleId', checkAdmin, (req: Request, res: Response) => {
    articleController.deleteOne(req, res)
})

router