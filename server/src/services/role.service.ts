import { prisma } from '../../prisma'

export const getByNameRole = async (name: string) => {
	return await prisma.role.findFirst({ where: { name } })
}

export const getAllRoles = async () => {
	return await prisma.role.findMany()
}

export const addNewRoles = async () => {
	return await prisma.role.createMany({
		data: [
			{ name: 'Главный редактор' },
			{ name: 'Администратор' },
			{ name: 'Учебный отдел' },
			{ name: 'Пользователь' },
		],
	})
}
