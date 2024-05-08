import express from 'express'

import { register } from '../controllers/auth.controller'

export const authRouter = (router: express.Router) => {
	router.post('/auth/register', register)
}
