import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getByFacultyName } from '../controllers/department.controller'

export const departmentRouter = (router: express.Router) => {
	router.get('/dep/:faculty', isEdOrAdmin, getByFacultyName)
}
