import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import { getByDep, getOverDueAuthors } from '../controllers/author.controller'

export const authorRouter = (router: express.Router) => {
	router.get('/author/overdue', isAuth, getOverDueAuthors)
	router.get('/author/:dep', isEdOrAdmin, getByDep)
}
