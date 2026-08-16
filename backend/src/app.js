import express from 'express'
import helmet from 'helmet'
import { config } from './config/env.js'
import compression from 'compression'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import hpp from 'hpp'

const app = express()

app.set('trust proxy', 1)
app.use(helmet())
app.use(cors({
    origin: config.CLIENT_URL,
    credentials: true
}))
app.use(compression())
app.use(cookieParser())
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))
app.use(hpp())

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'OK' })
})

export default app
