import express from 'express'
import {
	addNewService,
	getAuthorsByDepartment,
} from '../services/author.service'

export const getByDep = async (req: express.Request, res: express.Response) => {
	try {
		const { dep } = req.params

		const authors = await getAuthorsByDepartment(dep)

		return res.status(200).json(authors).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
