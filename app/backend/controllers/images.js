const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const Image = mongoose.model('Image', require('../schemas/Image'))
const Article = mongoose.model('Article', require('../schemas/Article'))

// create an image
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
        const image = new Image({
            url: req.body.url,
            index: req.body.index,
            description: req.body.description,
            width: req.body.width,
            articleId: req.params.articleId
        })
        let article = await Article.findOne({ _id: req.params.articleId })
        article.images.push(image)
        await article.save()
        await image.save()
        res.status(201)
        res.send({
            success: true,
            data: {
                image: image
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

// get image by image id
router.get('/:imageId', async (req, res) => {
    if (!req.params.imageId || req.params.imageId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Image ID provided'
            }
        })
        return
    }
    try {
        let image = await Image.findOne({ _id: req.params.imageId })
        if (!image) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Image with id: ' + req.params.imageId
                }
            })
            return
        }
        res.status(200)
        res.send({
            success: true,
            data: {
                image: image
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

// edit an image
router.put('/:imageId', async (req, res) => {
    if (!req.params.imageId || req.params.imageId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Image ID provided'
            }
        })
        return
    }
    try {
        let image = await Image.findOne({ _id: req.params.imageId })
        if (!image) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Image with id: ' + req.params.imageId
                }
            })
            return
        }
        image.url = req.body.url
        image.index = req.body.index
        image.description = req.body.description
        image.width = req.body.width
        image.articleId = req.body.articleId
        let article = await Article.findOne({ _id: req.body.articleId })
        let imageIndex = article.images.findIndex((i) => { return i._id.toString() === req.params.imageId })
        if (imageIndex < 0) {
            article.images.push(image)
        } else {
            article.images[imageIndex] = image
        }
        await image.save()
        await article.save()
        res.status(200)
        res.send({
            success: true,
            data: {
                image: image
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

// delete an image
router.delete('/:imageId', async (req, res) => {
    if (!req.params.imageId || req.params.imageId.length !== 24) {
        res.status(400)
        res.send({
            success: false,
            data: {
                message: 'Invalid Image ID provided'
            }
        })
        return
    }
    try {
        let image = await Image.findOne({ _id: req.params.imageId })
        if (!image) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find Image with id: ' + req.params.imageId
                }
            })
            return
        }
        let article = await Article.findOne({ _id: image.articleId })
        if (article) {
            let imageIndex = article.images.findIndex((i) => { return i._id.toString() === req.params.imageId })
            if (imageIndex >= 0) {
                article.images.splice(imageIndex, 1)
                await article.save()
            }
        }
        await image.delete()
        res.status(204)
        res.send({
            success: true,
            data: {
                message: 'Image deleted successfully'
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