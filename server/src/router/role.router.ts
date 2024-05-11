import express from 'express'
import { getAll } from '../controllers/role.controller'
import { isAdmin } from '../middlewares'

export const roleRouter = (router: express.Router) => {
	router.get('/role/getall', isAdmin, getAll)
}
