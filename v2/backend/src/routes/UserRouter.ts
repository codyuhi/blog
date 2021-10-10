import express, { Request, Response } from 'express'
import { checkAdmin, validUser } from '../middleware'
import { userController } from '../controllers'

export const router = express.Router({
    strict: true
})

// POST requests

router.post('/', (req: Request, res: Response) => {
    userController.create(req, res)
})

// GET requests

router.get('/', checkAdmin, (req: Request, res: Response) => {
    userController.read(req, res)
})

// PUT requests

router.put('/', validUser, (req: Request, res: Response) => {
    userController.update(req, res)
})

// DELETE requests

router.delete('/', checkAdmin, (req: Request, res: Response) => {
    userController.delete(req, res)
})

router.delete('/:userId', validUser, (req: Request, res: Response) => {
    userController.deleteOne(req, res)
})

router