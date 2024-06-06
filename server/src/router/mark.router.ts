import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/mark.controller'

export const markRouter = (router: express.Router) => {
	router.get('/mark/getall', isAuth, getAll)
}
