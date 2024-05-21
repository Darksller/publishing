import express from 'express'
import jwt from 'jsonwebtoken'
import type { User, Role } from '@prisma/client'

export const validateToken = (req: express.Request, cookieType: string) => {
	const token = req.cookies[cookieType]
	return token
}

export const getVerifiedUser = (token: string, secret: string) =>
	jwt.verify(token, secret)

export const generateAccessToken = (user: User & { role: Role }) =>
	jwt.sign(
		{
			email: user.email,
			role: user.role.name,
			name: user.name,
			id: user.id,
		},
		process.env.ACCESS_SECRET!,
		{
			expiresIn: +process.env.ACCESS_TOKEN_EXPIRATION!,
		}
	)

export const isUserValid = (
	req: express.Request,
	secret: string,
	cookieType: string
) => {
	try {
		const token = validateToken(req, cookieType)

		if (!token) {
			return false
		}
		const user = getVerifiedUser(token, secret)

		if (!user) {
			return false
		}
		return true
	} catch (error) {
		return false
	}
}
