import express from 'express'
import { isAuth } from '../middlewares'
import { search } from '../controllers/search.c'

export const searchRouter = (router: express.Router) => {
	router.get('/search/:searchText', isAuth, search)
}
