import express from 'express'
import {
	addNewService,
	getAllSpecialities,
} from '../services/speciality.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllSpecialities()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
