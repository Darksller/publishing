import express from 'express'

import { login, refresh, register } from '../controllers/auth.controller'

export const authentication = (router: express.Router) => {
	router.post('/auth/register', register)
	router.post('/auth/login', login)
	router.post('/auth/refresh', refresh)
}
