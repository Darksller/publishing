import { FacultiesPayload, Publication } from '@/entities/publication'
import { api } from '@/shared/api'

export const planApi = api.injectEndpoints({
	endpoints: build => ({
		getAllYears: build.query<number[], void>({
			query: () => `/plan/getallYears`,
		}),
		createPlan: build.mutation({
			query: body => ({
				url: '/plan/create',
				method: 'POST',
				body,
			}),
		}),
		getByYear: build.query<
			{ publications: Publication[]; faculties: FacultiesPayload[] },
			string
		>({
			query: year => `/plan/get/${year}`,
			providesTags: result =>
				result
					? [
							...result.publications.map(({ id }) => ({
								type: 'publication' as const,
								id,
							})),
							'publication',
						]
					: ['publication'],
		}),
		updatePublication: build.mutation({
			query: body => ({
				url: '/plan/update',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['publication'],
		}),
	}),
})

export const {
	useGetAllYearsQuery,
	useCreatePlanMutation,
	useLazyGetByYearQuery,
	useUpdatePublicationMutation,
} = planApi
