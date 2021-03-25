const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

import { Article } from './models/Article'

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

// connect to the database
mongoose.connect('mongodb://localhost:27017/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})