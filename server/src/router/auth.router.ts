import express from 'express'

import { fetchMe, login } from '../controllers/auth.controller'

export const authRouter = (router: express.Router) => {
	router.post('/auth/login', login)
	router.get('/user/fetchMe', fetchMe)
}
