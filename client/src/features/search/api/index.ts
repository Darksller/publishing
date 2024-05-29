import { Publication } from '@/entities/publication'
import { api } from '@/shared/api'

export const searchApi = api.injectEndpoints({
	endpoints: build => ({
		getSearch: build.query<Publication[], string>({
			query: text => `/search/${text}`,
		}),
	}),
})

export const { useLazyGetSearchQuery } = searchApi
