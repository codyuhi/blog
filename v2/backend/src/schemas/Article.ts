import { Schema } from 'mongoose'

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
            type: String
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