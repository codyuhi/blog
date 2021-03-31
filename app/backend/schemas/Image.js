const mongoose = require('mongoose')

let Image = new mongoose.Schema({
    url: String,
    title: String,
    index: Number,
    description: String,
    width: Number,
    articleId: String,
    created: {
        type: Date,
        default: Date.now
    }
})

module.exports = Image