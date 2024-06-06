import { getAllPlans } from '../repositories/plan.repository'
import { getRandomColor } from '../utils/color'

export const getLineService = async () => {
	const plans = await getAllPlans()
	plans.sort((a, b) => a.year - b.year)
	const labels = [...new Set(plans.map(plan => plan.year))].map(
		year => `${year}/${year + 1}`
	)

	const datasets: { label: string; data: number[]; borderColor: string }[] = []

	datasets.push({
		label: 'Количество грифов',
		data: plans.map(item => {
			return item.Publications.filter(i => i.markId).length
		}),
		borderColor: getRandomColor(),
	})
	return { labels, datasets }
}

export const getLineByFacultyService = async (faculty: string) => {
	const plans = await getAllPlans()
	plans.sort((a, b) => a.year - b.year)
	const labels = [...new Set(plans.map(plan => plan.year))].map(
		year => `${year}/${year + 1}`
	)

	const datasets: { label: string; data: number[]; borderColor: string }[] = []

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
	return { labels, datasets }
}
