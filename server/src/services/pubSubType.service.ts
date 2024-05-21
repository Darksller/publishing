import { prisma } from '../../prisma'

export const addNewSubPubTypes = async () => {
	return await prisma.pubSubType.createMany({
		data: [
			{ name: 'Учебное пособие' },
			{ name: 'Практикум по выполнению лабораторных работ' },
			{ name: 'Учебно-методическое пособие' },
		],
	})
}

export const getPubSubTypes = async () => {
	return await prisma.pubSubType.findMany()
}

export const getPubSubType = async (name: string) => {
	return await prisma.pubSubType.findFirst({ where: { name } })
}
