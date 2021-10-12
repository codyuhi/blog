import * as mongodb from 'mongodb'
import { DB_CONN_STRING, DB_NAME } from '../config/constants'

export const collection: {
    articles?: mongodb.Collection,
    tokens?: mongodb.Collection,
    comments?: mongodb.Collection,
    users?: mongodb.Collection
} = {}

export async function connectToDatabase() {
    if (!DB_CONN_STRING || !DB_NAME) {
        console.error('Unable to connect to MongoDB')
        return null
    }
    const client: mongodb.MongoClient = new mongodb.MongoClient(DB_CONN_STRING)
    await client.connect()
    const db: mongodb.Db = client.db(DB_NAME)

    const articlesCollection: mongodb.Collection = db.collection('articles')
    const tokensCollection: mongodb.Collection = db.collection('tokens')
    const commentsCollection: mongodb.Collection = db.collection('comments')
    const usersCollection: mongodb.Collection = db.collection('users')

    collection.articles = articlesCollection
    collection.tokens = tokensCollection
    collection.comments = commentsCollection
    collection.users = usersCollection

    console.log(`Established connection to all MongoDB collections`)
}