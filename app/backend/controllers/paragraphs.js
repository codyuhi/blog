const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Paragraph = mongoose.model('Paragraph', require('../schemas/Paragraph'))
const Article = mongoose.model('Article', require('../schemas/Article'))

// create a paragraph
router.post('/:articleId', async (req, res) => {
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
        const paragraph = new Paragraph({
            index: req.body.index,
            content: req.body.content,
            articleId: req.params.articleId
        })
        let article = await Article.findOne({ _id: req.params.articleId })
        article.paragraphs.push(paragraph)
        await article.save()
        await paragraph.save()
        res.status(201)
        res.send({
            success: true,
            data: {
                paragraph: paragraph
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

// get paragraph by paragraph id
router.get('/:paragraphId', async (req, res) => {
    if (!req.params.paragraphId || req.params.paragraphId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Paragraph ID provided'
            }
        })
        return
    }
    try {
        let paragraph = await Paragraph.findOne({ _id: req.params.paragraphId })
        if (!paragraph) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Paragraph with id: ' + req.params.paragraphId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                paragraph: paragraph
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

// edit a paragraph
router.put('/:paragraphId', async (req, res) => {
    if (!req.params.paragraphId || req.params.paragraphId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Paragraph ID provided'
            }
        })
        return
    }
    try {
        let paragraph = await Paragraph.findOne({ _id: req.params.paragraphId })
        if (!paragraph) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Paragraph with id: ' + req.params.paragraphId
                }
            })
            return
        }
        paragraph.index = req.body.index
        paragraph.content = req.body.content
        paragraph.articleId = req.body.articleId
        let article = await Article.findOne({ _id: req.body.articleId })
        let paragraphIndex = article.paragraphs.findIndex((p) => { return p._id.toString() === req.params.paragraphId })
        if (paragraphIndex < 0) {
            article.paragraphs.push(paragraph)
        } else {
            article.paragraphs[paragraphIndex] = paragraph
        }
        await paragraph.save()
        await article.save()
        res.status(200)
        res.send({
            success: true,
            data: {
                paragraph: paragraph
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

// delete a paragraph
router.delete('/:paragraphId', async (req, res) => {
    if (!req.params.paragraphId || req.params.paragraphId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Paragraph ID provided'
            }
        })
        return
    }
    try {
        let paragraph = await Paragraph.findOne({ _id: req.params.paragraphId })
        if (!paragraph) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Paragraph with id: ' + req.params.paragraphId
                }
            })
            return
        }
        let article = await Article.findOne({ _id: paragraph.articleId })
        if (article) {
            let paragraphIndex = article.paragraphs.findIndex((p) => { return p._id.toString() === paragraph.articleId })
            if (paragraphIndex >= 0) {
                article.paragraphs.splice(paragraphIndex, 1)
                await article.save()
            }
        }
        await paragraph.delete()
        res.status(204)
        res.send({
            success: true,
            data: {
                message: 'Paragraph deleted successfully'
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