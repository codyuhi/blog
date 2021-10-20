import express, { Request, Response } from 'express'
import { checkAdmin, validUser } from '../middleware'
import { commentController } from '../controllers'

export const router = express.Router({
    strict: true
})

// POST requests

router.post('/', validUser, (req: Request, res: Response) => {
    commentController.create(req, res)
})

router.post('/:articleId', validUser, (req: Request, res: Response) => {
    commentController.createOne(req, res)
})

// GET requests

router.get('/', checkAdmin, (req: Request, res: Response) => {
    commentController.read(req, res)
})

router.get('/:commentId', (req: Request, res: Response) => {
    commentController.readOne(req, res)
})

// PUT requests

router.put('/', checkAdmin, (req: Request, res: Response) => {
    commentController.update(req, res)
})

router.put('/:commentId', validUser, (req: Request, res: Response) => {
    commentController.updateOne(req, res)
})

// DELETE requests

router.delete('/', checkAdmin, (req: Request, res: Response) => {
    commentController.delete(req, res)
})

router.delete('/:commentId', validUser, (req: Request, res: Response) => {
    commentController.deleteOne(req, res)
})

router