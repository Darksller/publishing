import express from 'express'
import { generateSalt } from '../utils'
import jwt from 'jsonwebtoken'
import { createUser, getUserByEmail } from '../services/user.service'
import { UserDTO } from '../dto/user.dto'

export const login = async (req: express.Request, res: express.Response) => {
	try {
		const { email, password } = req.body

		if (!email || !password)
			return res.status(400).json('Invalid email or password')

		const user = await getUserByEmail(email).select(
			'+authentication.salt + authentication.password + authentication.refreshToken'
		)

		if (!user) return res.status(400).json('Invalid email or password')

		const expectedHash = generatePasswordHash(
			user.authentication.salt,
			password
		)

		if (user.authentication.password !== expectedHash)
			return res.status(403).json('Invalid email or password')

		const refreshToken = jwt.sign(
			{ random: generateSalt() },
			process.env.REFRESH_SECRET,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION,
			}
		)
		user.authentication.refreshToken = refreshToken
		await user.save()

		const accessToken = jwt.sign(
			{
				email: user.email,
				role: user.role,
				username: user.username,
			},
			process.env.SECRET,
			{
				expiresIn: +process.env.TOKEN_EXPIRATION,
			}
		)

		res.cookie(process.env.AUTH_COOKIE, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res
			.status(200)
			.json({
				user: {
					email: user.email,
					role: user.role,
					username: user.username,
				},
				accessToken,
				refreshToken: refreshToken,
			})
			.end()
	} catch (error) {
		console.log(error)
		return res.status(400).json('Something went wrong...')
	}
}

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const user = req.body as UserDTO

		if (!user.name || !user.email || !user.password || user.role)
			return res.status(400).json('Invalid data')

		const existingUser = await getUserByEmail(user.email)
		if (existingUser)
			return res.status(400).json('User with this email already exists')

		const accessToken = jwt.sign(
			{ email: user.email, role: user.role, name: user.name },
			process.env.ACCESS_SECRET!,
			{
				expiresIn: +process.env.ACCESS_TOKEN_EXPIRATION!,
			}
		)
		const refreshToken = jwt.sign(
			{ random: await generateSalt() },
			process.env.REFRESH_SECRET!,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION!,
			}
		)

		await createUser(user)

		res.cookie(process.env.AUTH_COOKIE!, accessToken, {
			httpOnly: false,
			secure: true,
		})

		return res
			.status(200)
			.json({
				accessToken,
				refreshToken,
			})
			.end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
