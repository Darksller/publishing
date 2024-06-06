import { prisma } from '../../prisma'

export const addNewService = async () => {
	return await prisma.educationForm.createMany({
		data: [
			{ name: 'Дневная' },
			{ name: 'Дневная и заочная' },
			{ name: 'Заочная' },
		],
	})
}

export const getAllService = async () => {
	return await prisma.educationForm.findMany()
}

export const getEducationForm = async (name: string) => {
	return await prisma.educationForm.findFirst({ where: { name } })
}
