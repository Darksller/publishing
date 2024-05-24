import { api } from '@/shared/api'
import { Mark } from '../types'

export const markApi = api.injectEndpoints({
	endpoints: build => ({
		getAllMarks: build.query<Mark[], void>({
			query: () => `/mark/getAll`,
		}),
	}),
})

export const { useGetAllMarksQuery } = markApi
