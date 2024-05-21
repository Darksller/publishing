import { api } from '@/shared/api'
import { PubSubType } from '../types'

export const pubSubTypeApi = api.injectEndpoints({
	endpoints: build => ({
		getAllPubSubType: build.query<PubSubType[], void>({
			query: () => `/pubSubType/getAll`,
		}),
	}),
})

export const { useGetAllPubSubTypeQuery } = pubSubTypeApi
