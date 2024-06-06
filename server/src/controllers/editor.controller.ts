import express from 'express'
import { getAllRepository } from '../repositories/educationForm.repository'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllRepository()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
