import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import { getAll, getBar, getLine, getPie } from '../controllers/mark.c'

export const markRouter = (router: express.Router) => {
	router.get('/mark/getall', isAuth, getAll)
	router.get('/mark/line', isAuth, getLine)
	router.get('/mark/pie', isAuth, getPie)
	router.get('/mark/bar', isAuth, getBar)
}
