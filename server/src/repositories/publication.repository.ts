import { prisma } from '../../prisma'
import { PublicationDto, PublicationUpdateDto } from './dto/publication.dto'
import { getDepartment } from './department.repository'
import { getEditor, getEditorId } from './editor.repository'
import { getEducationForm } from './educationForm.repository'
import { getMark } from './mark.repository'
import { getPubSubType } from './pubSubType.repository'
import { getPubType } from './pubType.repository'
import { getSpeciality } from './speciality.repository'

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
			copies: publication.copies,
		},
	})
}

export const getAllPublications = async () => {
	return await prisma.publication.findMany()
}

export const searchPublications = async (searchText: string) => {
	return await prisma.publication.findMany({
		where: {
			OR: [
				{ name: { contains: searchText, mode: 'insensitive' } },
				{ id: { equals: Number.isNaN(Number(searchText)) ? 0 : +searchText } },
				{
					Authors: {
						some: { name: { contains: searchText, mode: 'insensitive' } },
					},
				},
				{
					Speciality: {
						name: { contains: searchText, mode: 'insensitive' },
					},
				},
				{
					PubType: {
						name: { contains: searchText, mode: 'insensitive' },
					},
				},
				{
					EducationForm: {
						name: { contains: searchText, mode: 'insensitive' },
					},
				},
			],
		},
		include: {
			Authors: true,
			Department: { include: { faculty: true } },
			EducationForm: true,
			PubSubType: true,
			PubType: true,
			Speciality: true,
			Edit: { include: { Editor: true } },
			Notes: true,
			Mark: true,
		},
	})
}

export const updateService = async (data: PublicationUpdateDto) => {
	const {
		id,
		plannedAmount,
		actualAmount,
		plannedDueDate,
		actualDueDate,
		signatureDate,
		releaseDate,
		transferDate,
		mark,
		editor,
		startDate,
		finishDate,
		notes,
	} = data

	const updateData: {
		plannedAmount: number
		actualAmount: number | undefined
		plannedDueDate: string
		actualDueDate: string | null | undefined
		signatureDate: string | null | undefined
		releaseDate: string | null | undefined
		transferDate: string | null | undefined
		markId?: number
	} = {
		plannedAmount,
		actualAmount,
		plannedDueDate,
		actualDueDate,
		signatureDate,
		releaseDate,
		transferDate,
	}

	if (mark) {
		const m = await getMark(mark)
		updateData.markId = m?.id
	}

	if (editor || startDate || finishDate) {
		const existingEdit = await prisma.edit.findUnique({
			where: {
				publicationId: id,
			},
		})
		const e = await getEditor(editor)
		if (existingEdit) {
			await prisma.edit.update({
				where: { publicationId: id },
				data: {
					editorId: e?.id,
					startDate: startDate ?? undefined,
					finishDate: finishDate ?? undefined,
				},
			})
		} else {
			await prisma.edit.create({
				data: {
					publicationId: id,
					editorId: e!.id,
					startDate: startDate ?? undefined,
					finishDate: finishDate ?? undefined,
				},
			})
		}
	}

	await prisma.note.deleteMany({
		where: {
			publicationId: id,
		},
	})

	if (notes && notes.length > 0) {
		const noteData = notes.map(description => ({
			description,
			publicationId: id,
		}))
		await prisma.note.createMany({
			data: noteData,
		})
	}

	return await prisma.publication.update({
		where: { id },
		data: updateData,
	})
}

export const getByIdService = async (id: number) => {
	return await prisma.publication.findFirst({
		where: { id },
		include: {
			Authors: true,
			Department: { include: { faculty: true } },
			EducationForm: true,
			PubSubType: true,
			PubType: true,
			Speciality: true,
			Edit: { include: { Editor: true } },
			Notes: true,
			Mark: true,
		},
	})
}

export const deleteById = async (id: number) => {
	await prisma.publication.delete({ where: { id } })
}
