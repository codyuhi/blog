import { ObjectId } from 'mongodb'
import { Schema } from 'mongoose'

export const Comment = new Schema({
    _id: ObjectId,
    content: String,
    articleId: String,
    created: {
        type: Date,
        default: Date.now
    },
    userId: String
})

Comment