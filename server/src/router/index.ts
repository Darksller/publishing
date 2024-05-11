import express from 'express'
import { authRouter } from './auth.router'
import { roleRouter } from './role.router'
import { userRouter } from './user.router'

const router = express.Router()

export default (): express.Router => {
	authRouter(router)
	roleRouter(router)
	userRouter(router)
	return router
}
