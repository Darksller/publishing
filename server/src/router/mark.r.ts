import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/mark.c'

export const markRouter = (router: express.Router) => {
	router.get('/mark/getall', isEdOrAdmin, getAll)
}
