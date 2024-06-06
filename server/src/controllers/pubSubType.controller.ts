import express from 'express'
import {
	addNewSubPubTypes,
	getPubSubTypes,
} from '../repositories/pubSubType.repository'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getPubSubTypes()

		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
