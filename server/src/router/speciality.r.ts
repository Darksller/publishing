import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/speciality.c'

export const specialityRouter = (router: express.Router) => {
	router.get('/speciality/getall', isEdOrAdmin, getAll)
}
