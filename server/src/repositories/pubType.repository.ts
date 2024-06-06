import { prisma } from '../../prisma'

export const addNewPubTypes = async () => {
	return await prisma.pubType.createMany({
		data: [
			// { name: 'УМД' },
			{ name: 'ЭУМД' },
			{ name: 'ЭИ' },
		],
	})
}

export const getPubTypes = async () => {
	return await prisma.pubType.findMany()
}

export const getPubType = async (name: string) => {
	return await prisma.pubType.findFirst({ where: { name } })
}
