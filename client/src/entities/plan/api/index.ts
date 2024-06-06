import { api } from '@/shared/api'
import { FacultiesPayload, Publication } from '@/entities/publication'

export const planApi = api.injectEndpoints({
	endpoints: build => ({
		getAllYears: build.query<number[], void>({
			query: () => '/plan/getallYears',
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
		getById: build.query<Publication, string>({
			query: id => `/plan/getById/${id}`,
		}),
		updatePublication: build.mutation({
			query: body => ({
				url: '/plan/update',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['publication'],
		}),
		deletePub: build.mutation({
			query: body => ({
				url: `/pub/${body}`,
				method: 'DELETE',
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
	useLazyGetByIdQuery,
	useDeletePubMutation,
} = planApi
