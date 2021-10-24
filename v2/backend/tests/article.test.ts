import app from '../src/app'
import { after, describe } from 'mocha'
import chai, { expect } from 'chai'
import chaiHttp from 'chai-http'

chai.should()
chai.use(chaiHttp)

describe('In the Article API,', () => {
    const chaiConnection = chai.request(app).keepOpen()
    let testArticle: {
        title: string,
        description: string,
        heroImgUrl: string,
        comments: {
            _id: string,
            content: string
        }[]
        tags: string[],

    }
    let testUser: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        _id: string
    }
    let testAdmin: {
        firstName: string,
        lastName: string,
        email: string,
        username: string,
        _id: string
    }
    let testUserToken: string
    let testAdminToken: string

    describe('The Create Article endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })

        // TODO: Does not create Article if missing article object in request body

        // TODO: Creates Article successfully
    })

    describe('The Get Article endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })

        // TODO: Can retrieve all Articles

        // TODO: Does not retrieve anything if articleId is invalid

        // TODO: Does not retrieve anything if articleId cannot be found

        // TODO: Can retrieve a single Article by id
    })

    describe('The Update Article endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })

        // TODO: Returns HTTP error when trying to update all Articles at once

        // TODO: Does not do anything when articleId is invalid

        // TODO: Does not do anything if article object is missing from request body

        // TODO: Does not do anything if articleId could not be found

        // TODO: Can update article successfully
    })

    describe('The Delete Article endpoint', () => {
        // TODO: Complete this endpoint testing
        it('Works', () => {
            expect(true).to.be.true
        })

        // TODO: Does not delete anything if the articleId is invalid

        // TODO: Does not do anything if article cannot be found

        // TODO: Can successfully delete an article by id

        // TODO: Can successfully delete all articles
    })

    after(async () => {
        await chaiConnection.close()
    })
})