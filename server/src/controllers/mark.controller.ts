import express from 'express'
import { addNewService, getAllService } from '../services/mark.service'
import { getAllPlans } from '../services/plan.service'
import { getAllPublications } from '../services/publication.service'
import { getAllSpecialities } from '../services/speciality.service'
import { getRandomColor } from '../utils/color'
import { getAllAuthors } from '../services/author.service'

export const getAll = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllService()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
