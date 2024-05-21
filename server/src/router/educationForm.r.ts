import express from 'express'
import { isEdOrAdmin } from '../middlewares'
import { getAll } from '../controllers/educationForm.c'

export const educationFormRouter = (router: express.Router) => {
	router.get('/educationForm/getall', isEdOrAdmin, getAll)
}
