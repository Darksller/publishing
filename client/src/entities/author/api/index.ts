import { api } from '@/shared/api'
import { Author, OverDueAuthor } from '../types'

export const authorApi = api.injectEndpoints({
	endpoints: build => ({
		getAuthorsByDepartment: build.query<Author[], string>({
			query: department => `/author/${department}`,
		}),
		getOverdueAuthors: build.query<OverDueAuthor[], void>({
			query: () => '/author/overdue',
		}),
	}),
})

export const { useGetAuthorsByDepartmentQuery, useGetOverdueAuthorsQuery } =
	authorApi
