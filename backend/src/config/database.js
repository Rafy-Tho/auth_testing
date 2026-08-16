import pg from 'pg'
import { config } from './env.js'

const pool = new pg.Pool({
    connectionString: config.DATABASE_URL,
    max: 20,
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
})

pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err.message)
    process.exit(-1)
})

export { pool }