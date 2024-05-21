import express from 'express'
import { getAllFaculties } from '../services/faculty.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const faculties = await getAllFaculties()
		return res.status(200).json(faculties).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
