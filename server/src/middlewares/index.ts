import express from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Roles } from '../utils/roles'
import { getVerifiedUser, isUserValid, validateToken } from '../utils/auth.util'
import status from 'http-status'

export const credentials = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	res.header('Access-Control-Allow-Origin', 'true')
	next()
}

export const isAuth = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		if (!isUserValid(req, process.env.ACCESS_SECRET!, process.env.AUTH_COOKIE!))
			return res.status(status.UNAUTHORIZED).json('UNAUTHORIZED')
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const isAdmin = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	try {
		if (!isUserValid(req, process.env.ACCESS_SECRET!, process.env.AUTH_COOKIE!))
			return res.status(status.UNAUTHORIZED).json('You must be authenticated')
		const token = validateToken(req, process.env.AUTH_COOKIE!)
		const user = getVerifiedUser(token, process.env.ACCESS_SECRET!)
		if ((user as JwtPayload).role !== Roles.ADMIN) {
			return res.status(403).json('not permitted')
		}
		next()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
