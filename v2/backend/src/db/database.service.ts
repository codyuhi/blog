import { connect } from 'mongoose'
import { DB_CONN_STRING, DB_NAME } from '../config/constants'

export async function connectToDatabase() {
    if (!DB_CONN_STRING || !DB_NAME) {
        console.error('Unable to connect to MongoDB')
        return null
    }

    await connect(DB_CONN_STRING)

    console.log(`Established connection to all MongoDB collections`)
}