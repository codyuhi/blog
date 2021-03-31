const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const articleRouter = require('./controllers/articles')
const commentRouter = require('./controllers/comments')
const imageRouter = require('./controllers/images')
const paragraphRouter = require('./controllers/paragraphs')

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

app.use('/api/articles', articleRouter)
app.use('/api/comments', commentRouter)
app.use('/api/images', imageRouter)
app.use('/api/paragraphs', paragraphRouter)

if (require.main === module) {
    const port = process.env.PORT || 3002
    app.listen(port, () => {
        console.log(`Blog API Server listening on port ${port}`)
    })
} else {
    console.log('Unable to start Blog API Server')
}