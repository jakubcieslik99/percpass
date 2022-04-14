import express from 'express'
import cookieParser from 'cookie-parser'
import helmet from 'helmet'
import cors from 'cors'
import createError from 'http-errors'
import { config, log } from './config/utilityFunctions'
import databaseConnect from './config/databaseConnect'
import isError from './middlewares/errorMiddleware'
import userRoute from './routes/userRoute'
import passwordRoute from './routes/passwordRoute'

const app = express()
databaseConnect(app)

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(helmet())
app.use(
  cors({
    origin: config.WEBAPP_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
)

//routes
app.use('/users', userRoute)
app.use('/passwords', passwordRoute)
//404 error
app.all('*', (_req, _res, next) => next(createError(404, 'Podany zasób nie istnieje.')))
//errors handling middleware
app.use(isError)

app.on('ready', () => {
  app.listen(config.PORT, () => log.info(`Server started on port ${config.PORT}`))
})
