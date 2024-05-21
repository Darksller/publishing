import express from 'express'
import {
	createPlan,
	getAllYearsService,
	getService,
} from '../services/plan.service'
import { PublicationDto } from '../dto/publication.dto'
import { addNewService } from '../services/publication.service'
import httpStatus from 'http-status'

export const getAllYears = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const data = await getAllYearsService()
		return res.status(200).json(data).end()
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
