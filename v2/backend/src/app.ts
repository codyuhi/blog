import express, { Request, Response } from 'express'
import { connectToDatabase } from './db/database.service'
import { PORT } from './config/constants'
import {
    tokenRouter,
    userRouter,
    commentRouter,
    articleRouter
} from './routes'

const app = express()
app.use(express.json())

app.use(async (req: Request, res: Response, next) => {
    console.log(
        `${req.method.toUpperCase()} ${new Date().toLocaleString()}: ${req.path}`
    )
    next()
})

try {
    connectToDatabase()
    // TODO: make sure all endpoints' code is wrapped in try/catch
    app.use('/api/token', tokenRouter)
    app.use('/api/user', userRouter)
    app.use('/api/comment', commentRouter)
    app.use('/api/article', articleRouter)

    app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`)
    })
} catch (err) {
    console.error('Unable to connect to database or start server:', err)
    process.exit()
}

export default app