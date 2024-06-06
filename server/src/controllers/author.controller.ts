import express from 'express'
import {
	getAuthorsWithOverduePublications,
	getByDepartment,
} from '../services/author.service'

export const getByDep = async (req: express.Request, res: express.Response) => {
	try {
		const { dep } = req.params
		const authors = await getByDepartment(dep)

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
