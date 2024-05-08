import express from 'express'
import { getAll } from '../controllers/role.controller'

export const roleRouter = (router: express.Router) => {
	router.get('/role/getall', getAll)
}
