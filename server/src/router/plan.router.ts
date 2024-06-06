import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import {
	create,
	deletePub,
	get,
	getAllYears,
	getByID,
	update,
} from '../controllers/plan.controller'

export const planRouter = (router: express.Router) => {
	router.get('/plan/getallYears', isAuth, getAllYears)
	router.get('/plan/get/:year', isAuth, get)
	router.delete('/pub/:id', isAuth, deletePub)
	router.get('/plan/getById/:id', isAuth, getByID)
	router.post('/plan/create', isEdOrAdmin, create)
	router.patch('/plan/update', isAuth, update)
}
