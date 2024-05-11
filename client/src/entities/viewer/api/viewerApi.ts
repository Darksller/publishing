import { TokenPayload, ViewerPayload } from '../types/payload'
import { api } from '@/shared/api'

export const viewerApi = api.injectEndpoints({
	endpoints: build => ({
		login: build.mutation({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),

		fetchMe: build.query<{ viewer: ViewerPayload } & TokenPayload, void>({
			query: () => '/user/fetchMe/',
		}),
	}),
})

export const { useLoginMutation, useLazyFetchMeQuery } = viewerApi
