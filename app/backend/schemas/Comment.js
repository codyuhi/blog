const mongoose = require('mongoose')
const User = require('../schemas/User').User

let Comment = new mongoose.Schema({
    name: String,
    email: String,
    content: String,
    articleId: String,
    created: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    }
})

module.exports = Comment