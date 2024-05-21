import { api } from '@/shared/api'
import { Author } from '../types'

export const authorApi = api.injectEndpoints({
	endpoints: build => ({
		getAuthorsByDepartment: build.query<Author[], string>({
			query: department => `/author/${department}`,
		}),
	}),
})

export const { useGetAuthorsByDepartmentQuery } = authorApi
