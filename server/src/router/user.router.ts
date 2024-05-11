import express from 'express'
import { deleteEnd, getAll, update } from '../controllers/user.controller'
import { register } from '../controllers/user.controller'
import { isAdmin, isAuth } from '../middlewares'

export const userRouter = (router: express.Router) => {
	router.get('/user/getall', isAdmin, getAll)
	router.post('/user/register', isAdmin, register)
	router.patch('/user/update', isAdmin, update)
	router.delete('/user/delete', isAdmin, deleteEnd)
}
