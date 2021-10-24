import app from '../src/app'
import { after, describe } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('In the Comment API,', () => {
    // TODO: Plan out/complete testing for all endpoints
    const chaiConnection = chai.request(app).keepOpen()
    let testArticle: {
        title: string,
        description: string,
        heroImgUrl: string,
        comments: {
            _id: string,
            content: string
        }[]
        tags: string[]
    }
    let testUser: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        _id: string,
    }
    let testToken: string

    describe('The Create Comment endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Get Comment endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Update Comment endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    describe('The Delete Comment endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })
    })

    after(async () => {
        await chaiConnection.close()
    })
})