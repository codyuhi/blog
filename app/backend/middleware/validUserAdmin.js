const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model('User', require('../schemas/User'))

const checkAdmin = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(403).send({
            success: false,
            data: {
                message: 'Not logged in'
            }
        })
    }
    try {
        const user = await User.findOne({
            _id: req.session.userId
        })
        if (!user) {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'Invalid auth token'
                }
            })
        }
        if (!user.role || user.role !== 'admin') {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'You do not have permission to perform this operation'
                }
            })
        }
        req.user = user
    } catch (err) {
        console.error(err)
        return res.status(403).send({
            success: false,
            data: {
                message: 'Something went wrong while verifying your authentication'
            }
        })
    }
    next()
}

const validUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(403).send({
            success: false,
            data: {
                message: 'Not logged in'
            }
        })
    }
    try {
        const user = await User.findOne({
            _id: req.session.userId
        })
        if (!user) {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'Invalid auth token'
                }
            })
        }
        req.user = user
    } catch (err) {
        console.error(err)
        return res.status(403).send({
            success: false,
            data: {
                message: 'Something went wrong while verifying your authentication'
            }
        })
    }
    next()
}

module.exports = {
    checkAdmin: checkAdmin,
    validUser: validUser
}