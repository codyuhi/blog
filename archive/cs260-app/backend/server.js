const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const articleRouter = require('./controllers/articles')
const commentRouter = require('./controllers/comments')
const imageRouter = require('./controllers/images')
const paragraphRouter = require('./controllers/paragraphs')
const userRouter = require('./controllers/users')
const cookieParser = require('cookie-parser')
const cookieSession = require('cookie-session')

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(async (req, res, next) => {
    console.log(req.method.toUpperCase() + ' ' + req.path)
    next()
})

// connect to the database
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(cookieParser())
app.use(cookieSession({
    name: 'session',
    keys: [
        'secretValue'
    ],
    cookie: {
        maxAge: 24 * 60 * 60 * 1000
    }
}))

app.use('/api/articles', articleRouter)
app.use('/api/comments', commentRouter)
app.use('/api/images', imageRouter)
app.use('/api/paragraphs', paragraphRouter)
app.use('/api/users', userRouter)

if (require.main === module) {
    const port = process.env.PORT || 3003
    app.listen(port, () => {
        console.log(`Blog API Server listening on port ${port}`)
    })
} else {
    console.log('Unable to start Blog API Server')
}