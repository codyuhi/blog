const MongoClient = require('mongodb').MongoClient
const dotenv = require('dotenv')
dotenv.config()

const url = process.env.DB_CONN_STRING ?? null
const client = new MongoClient(url)
async function run() {
    try {
        await client.connect()
        console.log('Connected to server')
    } catch (err) {
        console.error(err)
    } finally {
        await client.close()
    }
}

run()