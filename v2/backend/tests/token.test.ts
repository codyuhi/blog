import app from '../src/app'
import { after, describe } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('In the Token API,', () => {
    // TODO: Complete planning/test for all Token API endpoints
    const chaiConnection = chai.request(app).keepOpen()

    let testUser: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        _id: string
    }

    describe('The Create Token endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Get Token endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Update Token endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Delete Token endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    after(async () => {
        await chaiConnection.close()
    })
})