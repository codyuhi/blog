import express, { Request, Response } from 'express'
import { MongoClient } from 'mongodb'
import { PORT, DB_CONN_STRING } from './config/constants'
import {
    tokenRouter,
    userRouter,
    commentRouter,
    articleRouter
} from './routes'

const client = new MongoClient(DB_CONN_STRING!)
async function testDbConnection() {
    try {
        await client.connect()
        console.log('Successfully able to connect to MongoDB')
    } catch (err) {
        console.error(`Unable to connect to MongoDB: ${err}`)
    } finally {
        await client.close()
    }
}
testDbConnection()

const app = express()
app.use(express.json())

app.use(async (req: Request, res: Response, next) => {
    console.log(
        `${req.method.toUpperCase()} ${new Date().toLocaleString()}: ${req.path}`
    )
    next()
})

app.use('/api/token', tokenRouter)
app.use('/api/user', userRouter)
app.use('/api/comment', commentRouter)
app.use('/api/article', articleRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})