import { api } from '@/shared/api'
import { Faculty } from '../types/faculty.type'

export const facultyApi = api.injectEndpoints({
	endpoints: build => ({
		getFaculties: build.query<Faculty[], void>({
			query: () => '/faculty/getall',
		}),
	}),
})

export const { useGetFacultiesQuery } = facultyApi
