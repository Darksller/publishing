import express from 'express'
import { getAllService } from '../services/pubType.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllService()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
