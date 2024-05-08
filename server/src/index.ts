import express from 'express'
import http from 'http'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compression from 'compression'
import cors from 'cors'
import 'dotenv/config'
import { credentials } from './middlewares'
import router from './router'

const app = express()

app.use(credentials)
app.use(
	cors({
		credentials: true,
		origin: true,
		optionsSuccessStatus: 200,
	})
)
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

const server = http.createServer(app)

app.use('/', router())

server.listen(process.env.PORT, () => {
	console.log(
		`listening on port http://${process.env.DOMAIN}:${process.env.PORT}`
	)
})
