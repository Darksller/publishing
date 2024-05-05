import { ViewerPayload } from '../types/payload'
import { api } from '@/shared/api'

export const viewerApi = api.injectEndpoints({
	endpoints: build => ({
		register: build.mutation({
			query: body => ({
				url: '/auth/register',
				method: 'POST',
				body,
			}),
		}),

		login: build.mutation({
			query: body => ({
				url: '/auth/login',
				method: 'POST',
				body,
			}),
		}),

		refresh: build.mutation({
			query: body => ({
				url: '/auth/refresh',
				method: 'POST',
				body,
			}),
		}),

		fetchMe: build.query<ViewerPayload, void>({
			query: () => '/users/fetchMe/',
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useLazyFetchMeQuery } =
	viewerApi
