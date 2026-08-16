import pino from 'pino'
import { config } from '../config/env.js'
const logger = pino({
    level: config.NODE_ENV === 'production' ? 'info' : 'debug',
    transport: config.NODE_ENV === 'production' ? {
        target: 'pino-pretty',
        options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
            ignore: 'pid,hostname'
        }
    } : {
        target: 'pino-pretty',
    }
})

export default logger