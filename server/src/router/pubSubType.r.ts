import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/pubSubType.c'

export const pubSubTypeRouter = (router: express.Router) => {
	router.get('/pubSubType/getall', isEdOrAdmin, getAll)
}
