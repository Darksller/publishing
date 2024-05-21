import express from 'express'
import { getAllRoles } from '../services/role.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const roles = await getAllRoles()
		return res.status(200).json(roles).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
