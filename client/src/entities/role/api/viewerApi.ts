import { api } from '@/shared/api'
import { Role } from '../types/role.type'

export const roleApi = api.injectEndpoints({
	endpoints: build => ({
		getRoles: build.query<Role[], void>({
			query: () => '/role/getall',
		}),
	}),
})

export const { useGetRolesQuery } = roleApi
