import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import { create, get, getAllYears, update } from '../controllers/plan.c'

export const planRouter = (router: express.Router) => {
	router.get('/plan/getallYears', isAuth, getAllYears)
	router.get('/plan/get/:year', isAuth, get)
	router.post('/plan/create', isEdOrAdmin, create)
	router.patch('/plan/update', isEdOrAdmin, update)
}
