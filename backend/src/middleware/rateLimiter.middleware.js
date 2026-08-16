import rateLimit from 'express-rate-limit'

const globalLimiter = rateLimit({
    windowMs: 15 * 60 * 1_000,
    max: 200,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        message: 'Too many requests, please try again later'
    }
})

export default globalLimiter