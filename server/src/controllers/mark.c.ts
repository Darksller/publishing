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

export const getLine = async (req: express.Request, res: express.Response) => {
	try {
		const plans = await getAllPlans()
		plans.sort((a, b) => a.year - b.year)
		const labels = [...new Set(plans.map(plan => plan.year))].map(
			year => `${year}/${year + 1}`
		)

		const a = plans.map(plan => {
			let markIdCount = 0

			plan.Publications.forEach(publication => {
				if (publication.markId) markIdCount++
			})

			return markIdCount
		})

		const dataset = {
			label: 'Количество грифов',
			data: a,
			borderColor: 'rgb(75,192,192)',
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

export const getBar = async (req: express.Request, res: express.Response) => {
	try {
		const data = await getAllAuthors()
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
