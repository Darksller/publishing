import { prisma } from '../../prisma'
import { getDepartment } from './department.repository'
import { getAllPublications } from './publication.repository'

export const addNewService = async () => {
	// const dep = await getDepartment('Высшая математика')
	// const dep1 = await getDepartment('Информатика')
	// const dep2 = await getDepartment('Информационные технологии')
	const dep = await getDepartment('Механика')
	const dep1 = await getDepartment(
		'Металлургия и технологии обработки материалов'
	)
	// const dep = await getDepartment('Автоматизированный электропривод')
	// const dep = await getDepartment('Маркетинг и отраслевая экономика')
	return await prisma.author.createMany({
		data: [
			// { name: 'Брель В.В.', departmentId: dep!.id },
			// { name: 'Веппер Л.В.', departmentId: dep!.id },
			{ name: 'Лапко О.А.', departmentId: dep!.id },
			{ name: 'Рюмцев А.А.', departmentId: dep!.id },
			{ name: 'Герасимова О.В.', departmentId: dep1!.id },
			{ name: 'Швецов А.Н.', departmentId: dep1!.id },
			// { name: 'Бабич А.А.', departmentId: dep!.id },
			// { name: 'Авакян Е.З.', departmentId: dep!.id },
			// { name: 'Задорожнюк М.В.', departmentId: dep!.id },
			// { name: 'Бородин Н.Н.', departmentId: dep!.id },
			// { name: 'Евтухова С.М.', departmentId: dep!.id },
			// { name: 'Самовендюк Н.В.', departmentId: dep1!.id },
			// { name: 'Чабуркина С.А.', departmentId: dep1!.id },
			// { name: 'Романькова Т.Л.', departmentId: dep1!.id },
			// { name: 'Комраков В.В.', departmentId: dep2!.id },
			// { name: 'Гуменников Е.Д.', departmentId: dep2!.id },
			// { name: 'Савельев В.А.', departmentId: dep2!.id },
			// { name: 'Дорощенко И.В.', departmentId: dep2!.id },
		],
	})
}

export const getAllAuthors = async () => {
	return await prisma.author.findMany({
		include: {
			Publication: {
				include: { Department: { include: { faculty: true } }, Authors: true },
			},
		},
	})
}

export const getAuthorsByDepartment = async (faculty: string) => {
	const dep = await prisma.department.findFirst({
		where: { name: faculty },
		include: { Author: true },
	})
	return dep?.Author
}
