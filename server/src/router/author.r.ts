import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getByDep } from '../controllers/author.c'

export const authorRouter = (router: express.Router) => {
	router.get('/author/:dep', isEdOrAdmin, getByDep)
}
