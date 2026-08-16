import { randomBytes } from 'crypto'
import { config } from '../config/env.js'

const generateToken = (req, res, next) => {
    if (!req.session.csrfToken) {
        req.session.csrfToken = randomBytes(32).toString('hex')
    }
    next()
}

const csrfMiddleware = (req, res, next) => {
    generateToken(req, res, () => {
        if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
            res.cookie('csrfToken', req.session.csrfToken, {
                httpOnly: false,
                secure: config.NODE_ENV === 'production',
                sameSite: 'lax'
            })
            return next()
        }

        const token = req.headers['x-csrf-token'] || req.body?._csrf;
        if (!token || token !== req.session.csrfToken) {
            return res.status.json({ success: false, message: 'Invalid or missing CSRF token' })
        }
        next()
    })
}

export default csrfMiddleware