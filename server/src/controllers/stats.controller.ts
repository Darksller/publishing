import express from 'express'
import { getAllAuthors } from '../repositories/author.repository'
import { getRandomColor } from '../utils/color'
import { getAllSpecialities } from '../repositories/speciality.repository'
import { getAllPlans } from '../repositories/plan.repository'

export const getLine = async (req: express.Request, res: express.Response) => {
	try {
		const plans = await getAllPlans()
		plans.sort((a, b) => a.year - b.year)
		const labels = [...new Set(plans.map(plan => plan.year))].map(
			year => `${year}/${year + 1}`
		)

		const datasets: { label: string; data: number[]; borderColor: string }[] =
			[]

		datasets.push({
			label: 'Количество грифов',
			data: plans.map(item => {
				return item.Publications.filter(i => i.markId).length
			}),
			borderColor: getRandomColor(),
		})

		return res.status(200).json({ labels, datasets }).end()
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
		const plans = await getAllPlans()
		plans.sort((a, b) => a.year - b.year)
		const labels = [...new Set(plans.map(plan => plan.year))].map(
			year => `${year}/${year + 1}`
		)

		const datasets: { label: string; data: number[]; borderColor: string }[] =
			[]

		const departments = [
			...new Set(
				plans
					.flatMap(plan => plan.Publications.map(pub => pub.Department))
					.filter(dept => dept.faculty.name === faculty)
					.map(dept => dept.name)
			),
		]

		departments.forEach(department => {
			datasets.push({
				label: department,
				data: labels.map(label => {
					const year = parseInt(label.split('/')[0])
					const pubsForDeptAndYear = plans.flatMap(plan =>
						plan.Publications.filter(
							pub => pub.Department.name === department && plan.year === year
						)
					)
					return pubsForDeptAndYear.filter(pub => pub.markId).length
				}),
				borderColor: getRandomColor(),
			})
		})

		return res.status(200).json({ labels, datasets }).end()
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
