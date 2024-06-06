import { api } from '@/shared/api'
import { Line, Pie } from './types'

export const graphApi = api.injectEndpoints({
	endpoints: build => ({
		getLine: build.query<Line, string>({
			query: faculty => `/stats/line/${faculty}`,
		}),
		getBarFaculty: build.query<Pie, string>({
			query: faculty => `/stats/bar/fac/${faculty}`,
		}),
		getBarDepartment: build.query<Pie, string>({
			query: department => `/stats/bar/dep/${department}`,
		}),
		getPie: build.query<Pie, void>({
			query: () => `/stats/pie/`,
		}),
	}),
})

export const {
	useLazyGetLineQuery,
	useGetPieQuery,
	useLazyGetBarFacultyQuery,
	useLazyGetBarDepartmentQuery,
} = graphApi
