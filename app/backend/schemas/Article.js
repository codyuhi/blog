const mongoose = require('mongoose')
const Comment = require('./Comment')
const Image = require('./Image')
const Paragraph = require('./Paragraph')

let Article = new mongoose.Schema({
    title: String,
    description: String,
    headerImgUrl: String,
    paragraphs: [{
        type: Paragraph
    }],
    images: [{
        type: Image
    }],
    comments: [{
        type: Comment
    }],
    created: {
        type: Date,
        default: Date.now,
    }
})

module.exports = Article