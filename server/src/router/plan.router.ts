import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { create, get, getAllYears } from '../controllers/plan.c'

export const planRouter = (router: express.Router) => {
	router.get('/plan/getallYears', isEdOrAdmin, getAllYears)
	router.get('/plan/get/:year', isEdOrAdmin, get)
	router.post('/plan/create', isEdOrAdmin, create)
}
