import { Schema } from 'mongoose'
import { ObjectId } from 'mongodb'

export const Article = new Schema({
    title: String,
    description: String,
    heroImgUrl: String,
    created: {
        type: Date,
        default: Date.now
    },
    comments: [
        {
            type: ObjectId,
            ref: 'Comment'
        }
    ],
    tags: [
        {
            type: String
        }
    ],
},
    {
        collection: 'articles'
    }
)

Article