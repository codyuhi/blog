const mongoose = require('mongoose')

let Image = new mongoose.Schema({
    url: String,
    index: Number,
    description: String,
    width: Number,
    articleId: String
})

module.exports = Image