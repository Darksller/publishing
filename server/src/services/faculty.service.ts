import { prisma } from '../../prisma'

export const getFaculty = async (faculty: string) => {
	return await prisma.faculty.findFirst({ where: { name: faculty } })
}

export const getAllFaculties = async () => {
	return await prisma.faculty.findMany()
}

export const addNewFaculties = async () => {
	return await prisma.faculty.createMany({
		data: [
			{ name: 'Гуманитарно-экономический факультет' },
			{ name: 'Машиностроительный факультет' },
			{ name: 'Механико-технологический факультет' },
			{ name: 'Факультет автоматизированных и информационных систем' },
			{ name: 'Энергетический факультет' },
		],
	})
}
