import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/pubType.c'

export const pubTypeRouter = (router: express.Router) => {
	router.get('/pubType/getall', isEdOrAdmin, getAll)
}
