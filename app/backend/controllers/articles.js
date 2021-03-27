const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Article = mongoose.model('Article', require('../schemas/Article'))
const Comment = mongoose.model('Comment', require('../schemas/Comment'))
const Image = mongoose.model('Image', require('../schemas/Image'))
const Paragraph = mongoose.model('Paragraph', require('../schemas/Paragraph'))

// create an article
router.post('/', async (req, res) => {
    try {
        const articleId = mongoose.Types.ObjectId()
        let paragraphs = []
        req.body.paragraphs.forEach(async (paragraph) => {
            paragraph['articleId'] = articleId
            const p = new Paragraph({
                index: paragraph.index,
                content: paragraph.content,
                articleId: paragraph.articleId
            })
            paragraphs.push(p)
            await p.save()
        })
        let images = []
        req.body.images.forEach(async (image) => {
            image['articleId'] = articleId
            const i = new Image({
                url: image.url,
                index: image.index,
                description: image.description,
                width: image.width,
                articleId: image.articleId
            })
            images.push(i)
            await i.save()
        })
        let comments = []
        req.body.comments.forEach(async (comment) => {
            comment['articleId'] = articleId
            const c = new Comment({
                name: comment.name,
                email: comment.email,
                content: comment.content,
                articleId: comment.articleId
            })
            comments.push(c)
            await c.save()
        })
        console.log('images', images)
        const article = new Article({
            _id: articleId,
            title: req.body.title,
            description: req.body.description,
            headerImgUrl: req.body.headerImgUrl,
            paragraphs: paragraphs,
            images: images,
            comments: comments
        })
        await article.save()
        res.status(201)
        res.send({
            success: true,
            data: {
                article: article
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err
            }
        })
    }
})

// get all articles
router.get('/', async (req, res) => {
    try {
        let articles = await Article.find()
        res.send({
            success: true,
            data: {
                articles: articles
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err
            }
        })
    }
})

// get a single article
router.get('/:articleId', async (req, res) => {
    if (!req.params.articleId || req.params.articleId.length != 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Article ID provided'
            }
        })
        return
    }
    try {
        let article = await Article.findOne({ _id: req.params.articleId })
        if (!article) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Article with id:' + req.params.articleId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                article: article
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

// get all comments by article id
router.get('/:articleId/comments', async (req, res) => {
    try {
        let comments = await Comment.find({ articleId: req.params.articleId })
        if (!comments) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find comments for Article with id: ' + req.params.articleId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                comments: comments
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

// get all images by article id
router.get('/:articleId/images', async (req, res) => {
    try {
        let images = await Image.find({ articleId: req.params.articleId })
        if (!images) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Images for Article with id: ' + req.params.articleId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                images: images
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

// get all paragraphs by article id
router.get('/:articleId/paragraphs', async(req, res) => {
    try {
        let paragraphs = await Paragraph.find({articleId: req.params.articleId})
        if(!paragraphs) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Paragraphs for Article with id: ' + req.params.articleId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                paragraphs: paragraphs
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

// edit an article
router.put('/:articleId', async (req, res) => {
    if (!req.params.articleId || req.params.articleId.length != 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Article ID provided'
            }
        })
        return
    }
    try {
        let article = await Article.findOne({ _id: req.params.articleId })
        if (!article) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: err.message
                }
            })
            return
        }
        article.title = req.body.title
        article.description = req.body.description
        article.headerImgUrl = req.body.headerImgUrl
        article.paragraphs = req.body.paragraphs
        article.images = req.body.images
        article.comments = req.body.comments
        article.paragraphs.forEach(async (paragraph) => {
            let p = await Paragraph.findOne({ _id: paragraph._id })
            p = paragraph
            p.articleId = article._id
            p.save()
        })
        article.images.forEach(async (image) => {
            let i = await Image.findOne({ _id: image._id })
            i = image
            i.articleId = article._id
            i.save()
        })
        article.comments.forEach(async (comment) => {
            let c = await Comment.findOne({ _id: comment._id })
            c = comment
            c.articleId = article._id
            c.save()
        })
        await article.save()
        res.status(200)
        res.send({
            success: true,
            data: {
                article: article
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

// delete an article
router.delete('/:articleId', async (req, res) => {
    if (!req.params.articleId || req.params.articleId.length != 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Article ID provided'
            }
        })
        return
    }
    try {
        let article = await Article.findOne({ _id: req.params.articleId })
        if (!article) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Article with id: ' + req.params.articleId
                }
            })
            return
        }
        let paragraphs = await Paragraph.find({ articleId: req.params.articleId })
        paragraphs.forEach((paragraph) => {
            paragraph.delete()
        })
        let images = await Image.find({ articleId: req.params.articleId })
        images.forEach((image) => {
            image.delete()
        })
        let comments = await Comment.find({ articleId: req.params.articleId })
        comments.forEach((comment) => {
            comment.delete()
        })
        await article.delete()
        res.status(204)
        res.send({
            success: true,
            data: {
                message: 'Article deleted successfully'
            }
        })
    } catch (err) {
        console.error(err)
        res.status(500)
        res.send({
            success: false,
            data: {
                message: err.message
            }
        })
    }
})

module.exports = router