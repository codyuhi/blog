const mongoose = require('mongoose')

let Paragraph = new mongoose.Schema({
    index: Number,
    content: String,
    articleId: String
})

module.exports = Paragraph