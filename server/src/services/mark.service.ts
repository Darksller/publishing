import { prisma } from '../../prisma'

export const addNewService = async () => {
	return await prisma.mark.createMany({
		data: [{ name: 'УФО' }],
	})
}

export const getAllService = async () => {
	return await prisma.mark.findMany()
}

export const getMark = async (name: string) => {
	return await prisma.mark.findFirst({ where: { name } })
}
