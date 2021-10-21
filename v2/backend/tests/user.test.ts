import app from '../src/app'
import { after, describe } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'
import { exit } from 'process'

chai.should()
chai.use(chaiHttp)

describe('In the User API,', () => {
    const chaiConnection = chai.request(app).keepOpen()

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
                    expect(res.body.data.message).to.equal('Successfully created user')
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
        // TODO: Complete test cases for this
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    after(async () => {
        await chaiConnection.close()
    })
})