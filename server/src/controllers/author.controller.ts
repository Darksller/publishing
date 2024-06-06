import express from 'express'
import {
	addNewService,
	getAuthorsByDepartment,
	getAuthorsWithOverduePublications,
} from '../repositories/author.repository'

export const getByDep = async (req: express.Request, res: express.Response) => {
	try {
		const { dep } = req.params
		//await addNewService()
		const authors = await getAuthorsByDepartment(dep)

		return res.status(200).json(authors).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getOverDueAuthors = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const authors = await getAuthorsWithOverduePublications()

		return res.status(200).json(authors).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
