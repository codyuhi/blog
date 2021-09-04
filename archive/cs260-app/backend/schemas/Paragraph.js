const mongoose = require('mongoose')

let Paragraph = new mongoose.Schema({
    index: Number,
    content: String,
    articleId: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Paragraph