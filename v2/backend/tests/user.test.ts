import app from '../src/app'
import { after, describe } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { exit } from 'process'
import { User } from '../src/schemas'

chai.should()
chai.use(chaiHttp)

describe('In the User API,', () => {
    const chaiConnection = chai.request(app).keepOpen()
    let testUser: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        _id: string
    }
    let testToken: string

    describe('The Create User endpoint', () => {

        it('Creates a happy-path User', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath@email.com',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(201)
                    expect(res.body.success).to.be.true
                    expect(res.body.data.user.firstName).to.equal('happy')
                    expect(res.body.data.user.lastName).to.equal('path')
                    expect(res.body.data.user.email).to.equal('happypath@email.com')
                    expect(res.body.data.user.username).to.equal('happypath')
                    expect(res.body.data.user.password).to.equal(undefined)
                    expect(res.body.data.user._id).to.be.string
                    expect(res.body.data.message).to.equal('Successfully created user')
                    testUser = res.body.data.user
                    testToken = res.body.data.token
                })
        })

        it('Does not create a User when the request body is empty', async () => {
            return await chaiConnection
                .post('/api/user/')
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request')
                })
        })

        it('Does not create a User when the request body does not have a firstName property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        lastName: 'path',
                        email: 'happypath2@email.com',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request. Please include all fields in the request body')
                })
        })

        it('Does not create a User when the request body does not have a lastName property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        email: 'happypath2@email.com',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request. Please include all fields in the request body')
                })
        })

        it('Does not create a User when the request body does not have an email property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'firstName',
                        lastName: 'path',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request. Please include all fields in the request body')
                })
        })

        it('Does not create a User when the request body does not have a username property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath2@email.com',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request. Please include all fields in the request body')
                })
        })

        it('Does not create a User when the request body does not have a password property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath2@email.com',
                        username: 'happypath',
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid request. Please include all fields in the request body')
                })
        })

        it('Does not create a User when the request body does not have a valid email property', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Invalid email address.  Please provide a valid email address')
                })
        })

        it('Does not create a duplicate username User', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath2@email.com',
                        username: 'happypath',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Username or email address already in use')
                })
        })

        it('Does not create a duplicate email User', async () => {
            return await chaiConnection
                .post('/api/user/')
                .send({
                    user: {
                        firstName: 'happy',
                        lastName: 'path',
                        email: 'happypath@email.com',
                        username: 'happypath2',
                        password: 'happypath'
                    }
                })
                .then((res) => {
                    expect(res).to.have.status(400)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Username or email address already in use')
                })
        })
    })

    describe('The Get User endpoint', () => {
        // TODO: Complete test cases for this
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Update User endpoint', () => {
        // TODO: Complete test cases for this
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Delete User endpoint', () => {
        let secondTestUser: {
            firstName: string,
            lastName: string,
            email: string,
            username: string,
            _id: string
        }
        let secondTestToken: string
        before(async () => {
            await chaiConnection
                .post('/api/user')
                .send({
                    user: {
                        firstName: 'happy2',
                        lastName: 'path2',
                        email: 'happypath2@email.com',
                        username: 'happypath2',
                        password: 'happypath2'
                    }
                })
                .then((res) => {
                    secondTestUser = res.body.data.user
                    secondTestToken = res.body.data.token
                })
        })

        it('Does not Delete anything if the token is missing', async () => {
            return await chaiConnection
                .delete(`/api/user/${testUser._id}`)
                .then((res) => {
                    expect(res).to.have.status(403)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('Not logged in')
                })
        })

        it('Does not Delete anything if the provided token is for another User', async () => {
            return await chaiConnection
                .delete(`/api/user/${testUser._id}`)
                .set('token', secondTestToken)
                .then((res) => {
                    expect(res).to.have.status(403)
                    expect(res.body.success).to.be.false
                    expect(res.body.data.message).to.equal('You do not have permission to perform this action')
                })
        })

        it('Deletes a User by ID', async () => {
            await chaiConnection
                .delete(`/api/user/${testUser._id}`)
                .set('token', testToken)
                .then((res) => {
                    expect(res).to.have.status(204)
                    expect(res.body.success).to.be.true
                    expect(res.body.data.message).to.equal(`Successfully deleted user with id ${testUser._id}`)
                })
        })
    })

    after(async () => {
        await chaiConnection.close()
    })
})