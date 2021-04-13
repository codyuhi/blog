const mongoose = require('mongoose')
const argon2 = require('argon2')

let User = new mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    password: String,
})

User.pre('save', async (next) => {
    if (!this.isModified('password')) {
        return next()
    }
    try {
        const hash = await argon2.hash(this.password)
        this.password = hash
        next()
    } catch (err) {
        console.error(err)
        next(err)
    }
})

User.methods.comparePassword = async (password) => {
    try {
        const isMatch = await argon2.verify(this.password, password)
        return isMatch
    } catch (err) {
        return false
    }
}

User.methods.toJSON = () => {
    const obj = this.toObject()
    delete obj.password
    return obj
}

module.exports = User