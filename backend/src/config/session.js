import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'
import { config } from './env.js'
import { pool } from './database.js'

const PgSession = connectPgSimple(session);

const sessionMiddleware = session({
    store: new PgSession({
        pool,
        tableName: 'user_sessions',
        createTableIfMissing: true,
        pruneSessionInterval: 900
    }),
    secret: config.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    name: 'sessionId',
    cookie: {
        httpOnly: true,
        secure: config.NODE_ENV === 'production',
        sameSite: config.NODE_ENV === 'production' ? 'none' : 'lax',
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
})

export default sessionMiddleware