import { RootState } from '@/app/store'
import { fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react'

const baseQuery = fetchBaseQuery({
	baseUrl: 'http:',
	prepareHeaders: (headers, { getState }) => {
		const token = (getState() as RootState).viewer.accessToken
		if (token) {
			headers.set('authentication', `Bearer ${token}`)
		}
		return headers
	},
	credentials: 'include',
})

export const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 })
