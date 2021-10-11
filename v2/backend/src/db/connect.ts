// import { MongoClient } from 'mongodb'
// import { DB_CONN_STRING } from '../config/constants'
const MongoClient = require('mongodb').MongoClient
// const DB_CONN_STRING = require('../config/constants').DB_CONN_STRING

// const url = DB_CONN_STRING ?? ''
const url = ``
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