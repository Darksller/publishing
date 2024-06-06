import { prisma } from '../../prisma'

export const getAllYearsService = async () => {
	const plans = await prisma.plan.findMany()
	return plans.map(item => item.year)
}

export const getAllPlans = async () => {
	return await prisma.plan.findMany({
		include: {
			Publications: {
				include: {
					Authors: true,
					Department: { include: { faculty: true } },
					EducationForm: true,
					PubSubType: true,
					PubType: true,
					Speciality: true,
					Edit: { include: { Editor: true } },
					Notes: true,
					Mark: true,
				},
			},
		},
	})
}

export const createPlan = async (year: number) => {
	return await prisma.plan.create({ data: { year } })
}

export const getService = async (year: number) => {
	return await prisma.plan.findFirst({
		where: { year },
		include: {
			Publications: {
				include: {
					Authors: true,
					Department: { include: { faculty: true } },
					EducationForm: true,
					PubSubType: true,
					PubType: true,
					Speciality: true,
					Edit: { include: { Editor: true } },
					Notes: true,
					Mark: true,
				},
			},
		},
	})
}
