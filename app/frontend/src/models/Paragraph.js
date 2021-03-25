const mongoose = require('mongoose')

let Paragraph = new mongoose.Schema({
    index: Number
})

module.exports = mongoose.model('Paragraph', Paragraph)