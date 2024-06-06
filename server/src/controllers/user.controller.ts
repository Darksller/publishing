import express from 'express'
import {
	deleteUser,
	getAllUsers,
	updateUser,
} from '../repositories/user.repository'
import { generateSalt } from '../utils'
import jwt from 'jsonwebtoken'
import { createUser, getUserByEmail } from '../repositories/user.repository'
import { UserDTO } from '../repositories/dto/user.dto'
import { createToken, updateToken } from '../repositories/token.repository'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const users = await getAllUsers()
		return res.status(200).json(users).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const register = async (req: express.Request, res: express.Response) => {
	try {
		const user = req.body as UserDTO

		if (
			!user.name ||
			!user.email ||
			!user.password ||
			!user.role ||
			!user.phoneNumber
		)
			return res.status(400).json('Invalid data')

		const existingUser = await getUserByEmail(user.email)
		if (existingUser)
			return res.status(400).json('User with this email already exists')

		const refreshToken = jwt.sign(
			{ random: await generateSalt() },
			process.env.REFRESH_SECRET!,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION!,
			}
		)
		const newUser = await createUser(user)

		await createToken(refreshToken, newUser.id)
		return res.status(200).json(newUser).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const update = async (req: express.Request, res: express.Response) => {
	try {
		const user = req.body as UserDTO

		if (
			!user.name ||
			!user.email ||
			!user.password ||
			!user.role ||
			!user.phoneNumber
		)
			return res.status(400).json('Invalid data')

		const updatedUser = await updateUser(user)
		const refreshToken = jwt.sign(
			{
				random: generateSalt(),
				email: updatedUser.email,
				role: updatedUser.role.name,
				name: updatedUser.name,
				id: updatedUser.id,
			},
			process.env.REFRESH_SECRET!,
			{
				expiresIn: +process.env.REFRESH_TOKEN_EXPIRATION!,
			}
		)

		await updateToken(refreshToken, updatedUser.Token?.userId!)

		return res.status(200).json(updatedUser).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const deleteEnd = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const user = req.body as UserDTO

		if (
			!user.name ||
			!user.email ||
			!user.password ||
			!user.role ||
			!user.phoneNumber
		)
			return res.status(400).json('Invalid data')

		const existingUser = await getUserByEmail(user.email)
		if (!existingUser)
			return res.status(400).json('Пользователя с таким Email нет')

		await deleteUser(user)
		return res.status(200).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
