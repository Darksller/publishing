import express from 'express'
import { getAllAuthors } from '../repositories/author.repository'
import { getRandomColor } from '../utils/color'
import { getAllSpecialities } from '../repositories/speciality.repository'
import { getAllPlans } from '../repositories/plan.repository'
import {
	getLineByFacultyService,
	getLineService,
} from '../services/stats.service'

export const getLine = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getLineService()
		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getLineByFaculty = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { faculty } = req.params
		const data = await getLineByFacultyService(faculty)

		return res.status(200).json(data).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getPie = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllSpecialities()
		const labels = [...new Set(data.map(item => item.name))]
		const dataset = {
			label: 'Количество публикаций',
			data: data.map(item => item.Publication.length),
			backgroundColor: data.map(() => getRandomColor()),
			hoverOffset: 4,
		}

		return res
			.status(200)
			.json({ labels, datasets: [dataset] })
			.end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}

export const getBarFac = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { faculty } = req.params

		const data = await getAllAuthors()
		const filteredData = data.filter(item =>
			item.Publication.some(
				pub =>
					pub.Department.faculty.name.toLowerCase() === faculty.toLowerCase()
			)
		)

		const labels = [...new Set(filteredData.map(item => item.name))]
		const dataset = {
			label: 'Количество публикаций',
			data: filteredData.map(item => item.Publication.length),
			backgroundColor: filteredData.map(() => getRandomColor()),
			hoverOffset: 4,
		}

		return res
			.status(200)
			.json({ labels, datasets: [dataset] })
			.end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
export const getBarDep = async (
	req: express.Request,
	res: express.Response
) => {
	try {
		const { department } = req.params

		const data = await getAllAuthors()
		const filteredData = data.filter(item =>
			item.Publication.some(
				pub => pub.Department.name.toLowerCase() === department.toLowerCase()
			)
		)

		const labels = [...new Set(filteredData.map(item => item.name))]
		const dataset = {
			label: 'Количество публикаций',
			data: filteredData.map(item => item.Publication.length),
			backgroundColor: filteredData.map(() => getRandomColor()),
			hoverOffset: 4,
		}

		return res
			.status(200)
			.json({ labels, datasets: [dataset] })
			.end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
