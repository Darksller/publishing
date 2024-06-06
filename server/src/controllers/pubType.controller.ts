import express from 'express'
import { addNewPubTypes, getPubTypes } from '../services/pubType.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getPubTypes()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
