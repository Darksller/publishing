import express from 'express'
import { compare, generateSalt } from '../utils'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { getUserByEmail } from '../services/user.service'
import { updateToken } from '../services/token.service'
import status from 'http-status'
import {
	generateAccessToken,
	getVerifiedUser,
	isUserValid,
	validateToken,
} from '../utils/auth.util'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password) return res.status(400).json('Неверные данные')

		const user = await getUserByEmail(email)
		if (!user) return res.status(400).json('Неверные данные')
		const isAllowed = await compare(password, user.password)
		if (!isAllowed) return res.status(403).json('Неверные данные')

		const refreshToken = jwt.sign(
			{
				random: generateSalt(),
				email: user.email,
				role: user.role.name,
				name: user.name,
				id: user.id,
			},
			process.env.REFRESH_SECRET!,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION!,
			}
		)

		await updateToken(refreshToken, user.Token?.userId!)

		const accessToken = jwt.sign(
			{ email: user.email, role: user.role.name, name: user.name, id: user.id },
			process.env.ACCESS_SECRET!,
			{
				expiresIn: +process.env.ACCESS_TOKEN_EXPIRATION!,
			}
		)

		res.cookie(process.env.AUTH_COOKIE!, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res
			.status(200)
			.json({
				viewer: {
					id: user.id,
					email: user.email,
					role: user.role,
				},
				accessToken,
				refreshToken,
			})
			.end()
	} catch (error) {
		console.log(error)
		return res.status(400).json('Что-то пошло не так...')
	}
}

export const fetchMe = async (req: express.Request, res: express.Response) => {
	try {
		if (
			!isUserValid(req, process.env.ACCESS_SECRET!, process.env.AUTH_COOKIE!) &&
			!isUserValid(req, process.env.REFRESH_SECRET!, process.env.REF_COOKIE!)
		)
			return res.status(status.UNAUTHORIZED).json('You must be authenticated')
		else {
			const refreshToken = validateToken(req, process.env.REF_COOKIE!)
			const user = getVerifiedUser(refreshToken, process.env.REFRESH_SECRET!)
			const dbUser = await getUserByEmail((user as JwtPayload).email)
			if (!dbUser) return res.status(status.UNAUTHORIZED).json('UNAUTHORIZED')
			const accessToken = generateAccessToken(dbUser)

			return res.status(status.OK).json({
				viewer: {
					id: dbUser.id,
					email: dbUser.email,
					role: dbUser.role,
				},
				accessToken,
				refreshToken,
			})
		}
	} catch (error) {
		console.log(error)
		res.status(status.INTERNAL_SERVER_ERROR).json('Что-то пошло не так..')
	}
}
