import { getAuthorsByDepartment } from '../repositories/author.repository'
import { getAllPublications } from '../repositories/publication.repository'

export const getAuthorsWithOverduePublications = async () => {
	const publication = await getAllPublications()

	const filtered = publication.filter(
		item => new Date(item.plannedDueDate) < new Date() && !item.actualDueDate
	)
	const overdueAuthors = filtered.flatMap(publication => ({
		authors: publication.Authors.map(item => item.name),
		name: publication.name,
		id: publication.id,
	}))
	return overdueAuthors
}

export const getByDepartment = async (name: string) => {
	return await getAuthorsByDepartment(name)
}
