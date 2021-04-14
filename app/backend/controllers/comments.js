const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Comment = mongoose.model('Comment', require('../schemas/Comment'))
const Article = mongoose.model('Article', require('../schemas/Article'))

const validUser = require('../middleware/validUserAdmin').validUser

// create a comment
router.post('/:articleId', validUser, async (req, res) => {
    if (!req.params.articleId || req.params.articleId.length !== 24) {
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
        const comment = new Comment({
            name: req.body.name,
            email: req.body.email,
            content: req.body.content,
            articleId: req.params.articleId,
            user: req.user
        })
        let article = await Article.findOne({ _id: req.params.articleId })
        article.comments.push(comment)
        await article.save()
        await comment.save()
        res.status(201)
        res.send({
            success: true,
            data: {
                comment: comment
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

// get comment by comment id
router.get('/:commentId', async (req, res) => {
    if (!req.params.commentId || req.params.commentId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Comment ID provided'
            }
        })
        return
    }
    try {
        let comment = await Comment.findOne({ _id: req.params.commentId })
        if (!comment) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Comment with id: ' + req.params.commentId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                comment: comment
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

// edit a comment
router.put('/:commentId', validUser, async (req, res) => {
    if (!req.params.commentId || req.params.commentId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Comment ID provided'
            }
        })
        return
    }
    try {
        let comment = await Comment.findOne({ _id: req.params.commentId })
        if (!comment) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Comment with id: ' + req.params.commentId
                }
            })
            return
        }
        if (!comment.user.equals(req.user._id) && req.user.role !== 'admin') {
            res.status(403)
            res.send({
                success: false,
                data: {
                    message: 'You do not have permission to edit this comment'
                }
            })
            return
        }
        comment.name = req.body.name
        comment.email = req.body.email
        comment.content = req.body.content
        comment.articleId = req.body.articleId
        comment.user = req.user
        let article = await Article.findOne({ _id: req.body.articleId })
        let commentIndex = article.comments.findIndex((c) => { return c._id.toString() === req.params.commentId })
        if (commentIndex < 0) {
            article.comments.push(comment)
        } else {
            article.comments[commentIndex] = comment
        }
        comment.save()
        article.save()
        res.status(200)
        res.send({
            success: true,
            data: {
                comment: comment
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

// delete a comment
router.delete('/:commentId', validUser, async (req, res) => {
    if (!req.params.commentId || req.params.commentId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Comment ID provided'
            }
        })
        return
    }
    try {
        let comment = await Comment.findOne({ _id: req.params.commentId })
        if (!comment) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Comment with id: ' + req.params.commentId
                }
            })
            return
        }
        if (!comment.user.equals(req.user._id) && req.user.role !== 'admin') {
            res.status(403)
            res.send({
                success: false,
                data: {
                    message: 'You do not have permission to delete this comment'
                }
            })
            return
        }
        let article = await Article.findOne({ _id: comment.articleId })
        if (article) {
            let commentIndex = article.comments.findIndex((c) => { return c._id.toString() === req.params.commentId })
            if (commentIndex >= 0) {
                article.comments.splice(commentIndex, 1)
                await article.save()
            }
        }
        await comment.delete()
        res.status(204)
        res.send({
            success: true,
            data: {
                message: 'Comment deleted successfully'
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