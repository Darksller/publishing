import { prisma } from '../../prisma'
import { PublicationDto } from '../dto/publication.dto'
import { getDepartment } from './department.service'
import { getEducationForm } from './educationForm.service'
import { getPubSubType } from './pubSubType.service'
import { getPubType } from './pubType.service'
import { getSpeciality } from './speciality.service'

export const addNewService = async (
	publication: PublicationDto,
	planId: number
) => {
	const authors = await prisma.author.findMany({
		where: {
			name: {
				in: publication.authors,
			},
		},
	})

	const department = await getDepartment(publication.department)
	const pubType = await getPubType(publication.pubType)
	const pubSubType = await getPubSubType(publication.pubSubType)
	const speciality = await getSpeciality(publication.speciality)
	const educationForm = await getEducationForm(publication.educationForm)
	return await prisma.publication.create({
		data: {
			name: publication.name,
			plannedAmount: publication.plannedAmount,
			plannedDueDate: publication.plannedDueDate,
			dateAdded: publication.dateAdded,
			departmentId: department!.id,
			pubTypeId: pubType!.id,
			pubSubTypeId: pubSubType!.id,
			specialityId: speciality!.id,
			educationFormId: educationForm!.id,
			planId: planId,
			Authors: {
				connect: authors.map(author => ({ id: author.id })),
			},
		},
	})
}

export const getAllService = async () => {
	return await prisma.publication.findMany()
}
