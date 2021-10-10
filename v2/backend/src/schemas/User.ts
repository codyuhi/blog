import { Schema } from 'mongoose'
import argon2 from 'argon2'

export const User = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    username: String,
    password: String,
    role: {
        type: String,
        default: 'user'
    }
})

User.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const hash = await argon2.hash(this.password)
        this.password = hash
        next()
    } catch (err) {
        console.error(err)
    }
})

User