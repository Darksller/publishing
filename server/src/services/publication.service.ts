import { prisma } from '../../prisma'
import { PublicationDto, PublicationUpdateDto } from '../dto/publication.dto'
import { getDepartment } from './department.service'
import { getEditor, getEditorId } from './editor.service'
import { getEducationForm } from './educationForm.service'
import { getMark } from './mark.service'
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
			copies: publication.copies,
		},
	})
}

export const getAllService = async () => {
	return await prisma.publication.findMany()
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
		actualAmount: number
		plannedDueDate: string
		actualDueDate: string
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
