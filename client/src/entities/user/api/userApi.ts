import { api } from '@/shared/api'
import { User } from '../types/user.type'

export const roleApi = api.injectEndpoints({
	endpoints: build => ({
		getUsers: build.query<User[], void>({
			query: () => '/user/getall',
			providesTags: result =>
				result
					? [...result.map(({ id }) => ({ type: 'user' as const, id })), 'user']
					: ['user'],
		}),

		register: build.mutation({
			query: body => ({
				url: '/user/register',
				method: 'POST',
				body,
			}),
			invalidatesTags: ['user'],
		}),
		updateUser: build.mutation({
			query: body => ({
				url: '/user/update',
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['user'],
		}),
		deleteUser: build.mutation({
			query: body => ({
				url: '/user/delete',
				method: 'DELETE',
				body,
			}),
			invalidatesTags: ['user'],
		}),
	}),
})

export const {
	useGetUsersQuery,
	useRegisterMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = roleApi
