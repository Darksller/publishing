import { api } from '@/shared/api'
import { PubType } from '../types'

export const pubTypeApi = api.injectEndpoints({
	endpoints: build => ({
		getAllPubType: build.query<PubType[], void>({
			query: () => `/pubType/getAll`,
		}),
	}),
})

export const { useGetAllPubTypeQuery } = pubTypeApi
