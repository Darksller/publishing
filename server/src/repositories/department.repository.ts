import { prisma } from '../../prisma'
import { getFaculty } from './faculty.repository'

export const addNewDepartments = async () => {
	const fais = await getFaculty(
		'Факультет автоматизированных и информационных систем'
	)
	const gef = await getFaculty('Гуманитарно-экономический факультет')
	const mf = await getFaculty('Машиностроительный факультет')
	const mtf = await getFaculty('Механико-технологический факультет')
	const ef = await getFaculty('Энергетический факультет')
	return await prisma.department.createMany({
		data: [
			{ name: 'Экономика', facultyId: gef!.id },
			{ name: 'Маркетинг и отраслевая экономика', facultyId: gef!.id },
			{
				name: 'Социально-гуманитарных и правовых дисциплин',
				facultyId: gef!.id,
			},
			{ name: 'Технология машиностроения', facultyId: mf!.id },
			{ name: 'Робототехнические системы', facultyId: mf!.id },
			{
				name: 'Нефтегазоразработка и гидропневмоавтоматика',
				facultyId: mf!.id,
			},
			{
				name: 'Механика',
				facultyId: mf!.id,
			},
			{
				name: 'Высшая математика',
				facultyId: fais!.id,
			},
			{
				name: 'Информатика',
				facultyId: fais!.id,
			},
			{
				name: 'Информационные технологии',
				facultyId: fais!.id,
			},
			{
				name: 'Промышленная электроника',
				facultyId: fais!.id,
			},
			{
				name: 'Металлургия и технологии обработки материалов',
				facultyId: mtf!.id,
			},
			{
				name: 'Мобильные и технологические комплексы',
				facultyId: mtf!.id,
			},
			{
				name: 'Автоматизированный электропривод',
				facultyId: ef!.id,
			},
			{
				name: 'Белорусский и иностранные языки',
				facultyId: ef!.id,
			},
			{
				name: 'Промышленная теплоэнергетика и экология',
				facultyId: ef!.id,
			},
			{
				name: 'Физика и электротехника',
				facultyId: ef!.id,
			},
			{
				name: 'Электроснабжение',
				facultyId: ef!.id,
			},
		],
	})
}

export const getDepartmentsByFaculty = async (faculty: string) => {
	const fac = await prisma.faculty.findFirst({
		where: { name: faculty },
		include: { Department: true },
	})
	return fac?.Department
}

export const getDepartment = async (name: string) => {
	return await prisma.department.findFirst({ where: { name } })
}
