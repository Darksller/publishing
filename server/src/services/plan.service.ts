import {
	createPlan,
	getAllYearsRepository,
} from '../repositories/plan.repository'

export const getAllYearsService = async () => {
	return await getAllYearsRepository()
}

export const createYearService = async (year: number) => {
	return await createPlan(year)
}
