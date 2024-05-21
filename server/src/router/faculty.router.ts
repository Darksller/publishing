import express from 'express'
import { getAll } from '../controllers/faculty.controller'
import { isEdOrAdmin } from '../middlewares'

export const facultyRouter = (router: express.Router) => {
	router.get('/faculty/getall', isEdOrAdmin, getAll)
}
