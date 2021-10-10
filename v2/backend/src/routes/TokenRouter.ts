import express, { Request, Response } from 'express'
import { checkAdmin, validUser } from '../middleware'
import { tokenController } from '../controllers'

export const router = express.Router({
    strict: true
})

// POST requests

router.post('/', (req: Request, res: Response) => {
    tokenController.create(req, res)
})

// GET requests

router.get('/', checkAdmin, (req: Request, res: Response) => {
    tokenController.read(req, res)
})

// PUT requests

router.put('/', checkAdmin, (req: Request, res: Response) => {
    tokenController.update(req, res)
})

// DELETE requests

router.delete('/', validUser, (req: Request, res: Response) => {
    tokenController.delete(req, res)
})

router