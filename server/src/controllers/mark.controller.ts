import express from 'express'
import { addNewService, getAllService } from '../repositories/mark.repository'
import { getAllPlans } from '../repositories/plan.repository'
import { getAllPublications } from '../repositories/publication.repository'
import { getAllSpecialities } from '../repositories/speciality.repository'
import { getRandomColor } from '../utils/color'
import { getAllAuthors } from '../repositories/author.repository'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllService()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
