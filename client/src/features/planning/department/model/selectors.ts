import { RootState } from '@/app/store'

export const selectFaculties = (state: RootState, faculty: string) =>
	state.publication.faculties.filter(item => item.name === faculty)
