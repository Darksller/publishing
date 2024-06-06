import { searchPublications } from '../repositories/publication.repository'

export const searchService = async (text: string) => {
	return await searchPublications(text)
}
