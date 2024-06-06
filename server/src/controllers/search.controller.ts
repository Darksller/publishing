import express from 'express'
import { searchPublications } from '../services/publication.service'

export const search = async (req: express.Request, res: express.Response) => {
	try {
		const { searchText } = req.params

		const data = await searchPublications(searchText)
		if (!data) return res.status(200).json([]).end()
		const publicationsAsStrings = data.map(publication => {
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
		})
		return res.status(200).json(publicationsAsStrings).end()
	} catch (error) {
		console.log(error)
		return res.sendStatus(400)
	}
}
