const mongoose = require('mongoose')

let Image = new mongoose.Schema({
    url: String,
    description: String,
    width: Number
})

module.exports = mongoose.model('Image', Image)