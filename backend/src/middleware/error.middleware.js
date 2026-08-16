
import { config } from "../config/env.js"
import logger from "../logger/index.js"
const errorHandler = (err, req, res, _next) => {
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message,
            errors: config.NODE_ENV === 'development' ? err.errors : undefined,
            stack: config.NODE_ENV === 'development' ? err.stack : undefined
        })
    }
    logger.error('Unhandled errord:', {
        message: err.message, stack: err.stack
    })
    return res.status(500).json({
        success: false,
        message: 'Internal Server Error',
        stack: config.NODE_ENV === 'development' ? err.stack : undefined,
        errors: config.NODE_ENV === 'development' ? err.errors : undefined,
    })
}

const notFoundHandler = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    })
}

export { errorHandler, notFoundHandler }