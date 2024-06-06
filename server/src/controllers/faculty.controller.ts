import express from 'express'
import { getAllService } from '../services/faculty.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const faculties = await getAllService()
		return res.status(200).json(faculties).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
