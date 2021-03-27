const mongoose = require('mongoose')

let Comment = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    articleId: String
})

module.exports = Comment