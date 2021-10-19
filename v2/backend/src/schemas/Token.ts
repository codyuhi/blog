import { Schema } from 'mongoose'

export const Token = new Schema({
    token: String,
    userId: String,
    expiresAt: {
        type: Date,
        default: Date.now() + 2 * (60 * 60 * 1000)
    }
})

Token