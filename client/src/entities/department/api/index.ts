import { api } from '@/shared/api'
import { Department } from '../types'

export const departmentApi = api.injectEndpoints({
	endpoints: build => ({
		getDepartmentByFaculty: build.query<Department[], string>({
			query: faculty => `/dep/${faculty}`,
		}),
	}),
})

export const { useGetDepartmentByFacultyQuery } = departmentApi
