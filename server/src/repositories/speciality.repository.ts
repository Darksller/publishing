import { prisma } from '../../prisma'

export const addNewService = async () => {
	return await prisma.speciality.createMany({
		data: [
			// { name: 'Информационные системы и технологии', code: '6-05-0611-01' },
			// { name: 'Экономика и управление', code: '6-05-0311-02' },
			// { name: 'Информатика и технологии программирования', code: '1-40 04 01' },
			// { name: 'Технические специальности' },
			{ name: 'Маркетинг', code: '1-26 02 03' },
		],
	})
}

export const getAllSpecialities = async () => {
	return await prisma.speciality.findMany({ include: { Publication: true } })
}

export const getSpeciality = async (name: string) => {
	return await prisma.speciality.findFirst({ where: { name } })
}
