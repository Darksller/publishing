import { RootState } from '@/app/store'
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: '/',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).viewer.accessToken
		if (token) {
			headers.set('authentication', `Bearer ${token}`)
		}
		return headers
	},
})

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })

export const api = createApi({
	reducerPath: 'splitApi',
	baseQuery: baseQueryWithRetry,
	tagTypes: ['viewer'],
	endpoints: () => ({}),
})
