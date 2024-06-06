import express from 'express'
import { isAuth, isEdOrAdmin } from '../middlewares'
import {
	getLine,
	getLineByFaculty,
	getPie,
	getBarFac,
	getBarDep,
} from '../controllers/stats.controller'
export const statsRouter = (router: express.Router) => {
	router.get('/stats/line', isAuth, getLine)
	router.get('/stats/line/:faculty', isAuth, getLineByFaculty)
	router.get('/stats/bar/fac/:faculty', isAuth, getBarFac)
	router.get('/stats/bar/dep/:department', isAuth, getBarDep)
	router.get('/stats/pie', isAuth, getPie)
}
