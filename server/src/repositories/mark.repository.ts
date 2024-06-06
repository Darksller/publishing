import { prisma } from '../../prisma'

export const addNewService = async () => {
	return await prisma.mark.createMany({
		data: [{ name: 'МинОбр' }],
	})
}

export const getAllRepository = async () => {
	return await prisma.mark.findMany({
		include: { Publication: { include: { Plan: true } } },
	})
}

export const getMark = async (name: string) => {
	return await prisma.mark.findFirst({ where: { name } })
}
