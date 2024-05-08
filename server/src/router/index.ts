import express from 'express'
import { authRouter } from './auth.router'
import { roleRouter } from './role.router'

const router = express.Router()

export default (): express.Router => {
	authRouter(router)
	roleRouter(router)
	return router
}
