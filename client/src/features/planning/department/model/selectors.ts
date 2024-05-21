import { RootState } from '@/app/store'
import { createSelector } from 'reselect'

const getFaculties = (state: RootState) => state.publication.faculties

export const getDepartmentsForFaculty = createSelector(
	[getFaculties, (_: RootState, faculty: string) => faculty],
	(faculties, faculty) =>
		faculties.find(item => item.name === faculty)?.departments || []
)

export const publicationsByDepartmentSelector = createSelector(
	(state: RootState) => state.publication.publications,
	(_: RootState, name: string) => name,
	(publications, name) => publications.filter(item => item.department === name)
)
