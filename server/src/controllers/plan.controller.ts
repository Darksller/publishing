import express from 'express'
import {
	createPlan,
	getAllYearsService,
	getService,
} from '../services/plan.service'
import { PublicationDto, PublicationUpdateDto } from '../dto/publication.dto'
import {
	addNewService,
	deleteById,
	getByIdService,
	updateService,
} from '../services/publication.service'
import httpStatus from 'http-status'

export const getAllYears = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = await getAllYearsService()
		return res.status(200).json(data.sort()).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const create = async (req: express.Request, res: express.Response) => {
	try {
		const { year, publications } = req.body as {
			year: number
			publications: PublicationDto[]
		}
		const plan = await createPlan(year)
		publications.forEach(async item => await addNewService(item, plan.id))
		return res.status(200).json(plan.year).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const get = async (req: express.Request, res: express.Response) => {
	try {
		const { year } = req.params

		const data = (await getService(Number(year)))!
		if (!data) return res.status(200).json(null).end()
		const publicationsAsStrings = data.Publications.map(publication => {
			return {
				id: publication.id,
				name: publication.name,
				pubType: publication.PubType.name,
				pubSubType: publication.PubSubType.name,
				speciality: publication.Speciality.name,
				educationForm: publication.EducationForm.name,
				authors: publication.Authors.map(author => author.name),
				plannedAmount: publication.plannedAmount,
				plannedDueDate: publication.plannedDueDate,
				department: publication.Department.name,
				dateAdded: publication.dateAdded,
				copies: publication.copies,
				actualAmount: publication.actualAmount,
				actualDueDate: publication.actualDueDate,
				signatureDate: publication.signatureDate,
				releaseDate: publication.releaseDate,
				transferDate: publication.transferDate,
				edit: {
					editor: publication.Edit?.Editor?.name,
					startDate: publication.Edit?.startDate,
					finishDate: publication.Edit?.finishDate,
				},
				notes: publication.Notes.map(note => note.description),
				mark: publication.Mark?.name,
			}
		})

		const faculties: { name: string; departments: string[] }[] = []
		data.Publications.forEach(publication => {
			const facultyName = publication.Department.faculty.name
			const departmentName = publication.Department.name
			const faculty = faculties.find(f => f.name === facultyName)
			if (faculty) {
				if (!faculty.departments.includes(departmentName)) {
					faculty.departments.push(departmentName)
				}
			} else {
				faculties.push({ name: facultyName, departments: [departmentName] })
			}
		})
		return res
			.status(200)
			.json({ faculties, publications: publicationsAsStrings })
			.end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR)
	}
}

export const update = async (req: express.Request, res: express.Response) => {
	try {
		const data = req.body as PublicationUpdateDto
		await updateService(data)
		return res.status(200).json('success').end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getByID = async (req: express.Request, res: express.Response) => {
	try {
		const { id } = req.params
		const publication = await getByIdService(Number(id))
		if (!publication) return res.status(200).json(null).end()
		const publicationsAsStrings = {
			id: publication.id,
			name: publication.name,
			pubType: publication.PubType.name,
			pubSubType: publication.PubSubType.name,
			speciality: publication.Speciality.name,
			educationForm: publication.EducationForm.name,
			authors: publication.Authors.map(author => author.name),
			plannedAmount: publication.plannedAmount,
			plannedDueDate: publication.plannedDueDate,
			department: publication.Department.name,
			dateAdded: publication.dateAdded,
			copies: publication.copies,
			actualAmount: publication.actualAmount,
			actualDueDate: publication.actualDueDate,
			signatureDate: publication.signatureDate,
			releaseDate: publication.releaseDate,
			transferDate: publication.transferDate,
			edit: {
				editor: publication.Edit?.Editor?.name,
				startDate: publication.Edit?.startDate,
				finishDate: publication.Edit?.finishDate,
			},
			notes: publication.Notes.map(note => note.description),
			mark: publication.Mark?.name,
		}
		return res.status(200).json(publicationsAsStrings).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const deletePub = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { id } = req.params
		await deleteById(Number(id))
		return res.sendStatus(200)
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
