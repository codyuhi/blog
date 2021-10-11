import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 4000
export const DB_CONN_STRING = process.env.DB_CONN_STRING ?? null
export const DB_NAME = process.env.DB_NAME ?? null