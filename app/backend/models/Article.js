const mongoose = require('mongoose')

let Article = new mongoose.Schema({
    title: String,
    description: String,
    headerImgUrl: String,
})

module.exports = mongoose.model('Article', Article)