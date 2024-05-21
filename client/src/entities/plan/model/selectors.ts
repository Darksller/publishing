import { RootState } from '@/app/store'

export const selectPublications = (state: RootState) =>
	state.publication.publications

export const selectYear = (state: RootState) => state.publication.year
