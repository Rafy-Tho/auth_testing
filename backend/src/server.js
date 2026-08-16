import app from "./app.js";
import { pool } from "./config/database.js";
import { config } from "./config/env.js";
import logger from "./logger/index.js";

const server = app.listen(config.PORT, async () => {
    try {
        await pool.query('SELECT NOW()');
        logger.info(`Database connected successfully at ${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`);
    } catch (error) {
        logger.error('Error connecting to database', error);
        process.exit(1);
    }
    logger.info(`Server is running on port ${config.PORT}`);
})

const shutdown = async (signal) => {
    logger.info(`${signal} signal received. Shutting down gracefully...`);
    server.close(async () => {
        await pool.end()
        logger.info('Database pool closed')
        process.exit(0)
    })
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

process.on('unhandledRejection', (error) => {
    logger.error('Unhandled rejection', error);
    shutdown('unhandledRejection')
})
process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', error);
    shutdown('uncaughtException')
})
export default server

