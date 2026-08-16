export default class AppError extends Error {
    constructor(message, statusCode) {
        super(message)
        this.statusCode = statusCode
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
        this.isOperational = true
        Error.captureStackTrace(this, this.constructor)
    }
}

export class Validation extends AppError {
    constructor(message = 'Validation failed', errors = null) {
        super(message, 400)
        this.errors = errors
    }
}

export class AuthenticationError extends AppError {
    constructor(message = 'Invalid email or password.') {
        super(message, 401);
    }
}

export class AuthorizationError extends AppError {
    constructor(message = 'You do not have permission to perform this action.') {
        super(message, 403);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Resource already exists.') {
        super(message, 409);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found.') {
        super(message, 404);
    }
}

export class TooManyRequestsError extends AppError {
    constructor(message = 'Too many requests. Please try again later.') {
        super(message, 429);
    }
}
