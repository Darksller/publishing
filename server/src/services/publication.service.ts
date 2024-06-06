import { Publication } from '@prisma/client'
import { getByIdRepository } from '../repositories/publication.repository'

export const getByIdService = async (id: number) => {
	return await getByIdRepository(id)
}

export const publicationAsStrings = async (id: number) => {
	const publication = await getByIdService(id)
	if (!publication) return null
	return {
		id: publication.id,
		name: publication.name,
		pubType: publication.PubType.name,
		pubSubType: publication.PubSubType.name,
		speciality: publication.Speciality.name,
		educationForm: publication.EducationForm.name,
		authors: publication.Authors.map(author => author.name),
		plannedAmount: publication.plannedAmount,
		plannedDueDate: publication.plannedDueDate,
		department: publication.Department.name,
		dateAdded: publication.dateAdded,
		copies: publication.copies,
		actualAmount: publication.actualAmount,
		actualDueDate: publication.actualDueDate,
		signatureDate: publication.signatureDate,
		releaseDate: publication.releaseDate,
		transferDate: publication.transferDate,
		edit: {
			editor: publication.Edit?.Editor?.name,
			startDate: publication.Edit?.startDate,
			finishDate: publication.Edit?.finishDate,
		},
		notes: publication.Notes.map(note => note.description),
		mark: publication.Mark?.name,
	}
}
