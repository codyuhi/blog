import { Schema } from 'mongoose'
import { Comment } from './Comment'

export const Article = new Schema({
    title: String,
    description: String,
    heroImgUrl: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [{
        type: Comment
    }],
    tags: [{
        type: String
    }]
})

Article