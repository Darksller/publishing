import express from 'express'
import { getAllService } from '../services/role.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const roles = await getAllService()
		return res.status(200).json(roles).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
