const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

const User = mongoose.model('User', require('../schemas/User'))

const validUser = require('../middleware/validUserAdmin.js').validUser

// Create a User
router.post('/', async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username || !req.body.password) {
        return res.status(400).send({
            success: false,
            data: {
                message: 'Please include a First Name, Last Name, Username, and Password in the request body'
            }
        })
    }
    try {
        const existingUser = await User.findOne({
            username: req.body.username
        })
        if (existingUser) {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'This username already exists'
                }
            })
        }
        // the user schema hashes the password before it's actually saved
        const user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            username: req.body.username,
            password: req.body.password
        })
        await user.save()
        req.session.userId = user._id
        return res.send({
            success: true,
            data: {
                user: user
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while creating new User'
            }
        })
    }
})

// Get an authenticated User's data
router.get('/', validUser, async (req, res) => {
    try {
        // the password is removed in the response by the user schema
        res.send({
            success: true,
            data: {
                user: req.user
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while getting User data'
            }
        })
    }
})

// Update an authenticated User's data
router.put('/', validUser, async (req, res) => {
    if (!req.body.firstName || !req.body.lastName || !req.body.username) {
        return res.status(400).send({
            success: false,
            data: {
                message: 'Invalid request. Please include all required fields'
            }
        })
    }
    try {
        let user = await User.findOne({ _id: req.user._id })
        if (!user) {
            res.status(404).send({
                success: false,
                data: {
                    message: 'Unable to find User with id: ' + req.user._id
                }
            })
            return
        }
        user.firstName = req.body.firstName
        user.lastName = req.body.lastName
        user.username = req.body.username
        if (req.body.password) {
            user.password = req.body.password
        }
        // the user schema hashes the password before it's actually saved
        user.save()
        res.status(200)
        res.send({
            success: true,
            data: {
                user: user
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while editing User'
            }
        })
    }
})

// Delete an authenticated User
router.delete('/', validUser, async (req, res) => {
    try {
        let user = await User.findOne({ _id: req.user._id })
        if (!user) {
            res.status(404)
            res.send({
                success: false,
                data: {
                    message: 'Unable to find User with id: ' + req.user._id
                }
            })
            return
        }
        await user.delete()
        res.status(204)
        res.send({
            success: true,
            data: {
                message: 'User deleted successfully'
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while deleting User'
            }
        })
    }
})

// Login
router.post('/login', async (req, res) => {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({
            success: false,
            data: {
                message: 'Invalid login request received. Please include both a username and password in the request'
            }
        })
    }
    try {
        const user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'Username or Password is wrong'
                }
            })
        }
        if (!await user.comparePassword(req.body.password)) {
            return res.status(403).send({
                success: false,
                data: {
                    message: 'Username or Password is wrong'
                }
            })
        }
        req.session.userId = user._id
        return res.send({
            success: true,
            data: {
                user: user
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while logging in'
            }
        })
    }
})

// Logout
router.delete('/logout', validUser, async (req, res) => {
    try {
        req.session = null
        res.status(204).send({
            success: true,
            data: {
                message: 'Logged out successfully'
            }
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send({
            success: false,
            data: {
                message: 'Something went wrong while logging out'
            }
        })
    }
})

module.exports = router