import { TokenPayload, ViewerPayload } from '../types/payload'
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

		// Я отправляю два токена, на сервере проверяю аксес токен, если все ок - возвращаю токен и пользователя, если аксес токен сдох - проверяю рефреш токен и создаю аксес токен
		fetchMe: build.query<{ viewer: ViewerPayload } & TokenPayload, void>({
			query: () => '/users/fetchMe/',
		}),
	}),
})

export const { useLoginMutation, useRegisterMutation, useLazyFetchMeQuery } =
	viewerApi
